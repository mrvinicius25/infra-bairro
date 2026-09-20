// Step 2 of the wizard: photo, description and saving the report.
// Step 1 passes its choices through the URL (?category=...&address=...) because its form
// uses method="get", so no JavaScript or storage was needed on that page.
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const MIN_DESCRIPTION_LENGTH = 10;

const params = new URLSearchParams(location.search);
const categoryKey = params.get('category');
const address = params.get('address') || DEFAULT_ADDRESS;

// Opening this page directly (no category) makes no sense, so go back to step 1.
if (CATEGORIES[categoryKey]) {
  initDetailsForm(categoryKey, CATEGORIES[categoryKey]);
} else {
  location.replace('new-report-location.html');
}

function initDetailsForm(key, category) {
  const form = document.querySelector('#details-form');
  const description = document.querySelector('#description');
  const counter = document.querySelector('#counter');

  document.querySelector('#summary').innerHTML = `
    <span class="category-tile" style="--color: ${category.color}">${iconSvg(category.icon)}</span>
    <div><strong>${category.label}</strong><small>${escapeHtml(address)}</small></div>`;

  // --- Description counter ---
  const updateCounter = () => {
    counter.textContent = `${description.value.length}/${description.maxLength}`;
  };
  description.addEventListener('input', updateCounter);
  updateCounter();

  // --- Photo (preview only; it is not stored, since localStorage is far too small for images) ---
  const photoInput = document.querySelector('#photo-input');
  const uploadBox = document.querySelector('#upload-box');
  const preview = document.querySelector('#photo-preview');
  const previewImage = document.querySelector('#photo-image');
  let previewUrl = null;

  const clearPhoto = () => {
    photoInput.value = '';
    if (previewUrl) URL.revokeObjectURL(previewUrl); // frees the in-memory copy of the file
    previewUrl = null;
    previewImage.removeAttribute('src');
    preview.hidden = true;
    uploadBox.hidden = false;
  };

  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (!file) return;
    if (file.size > MAX_PHOTO_BYTES) {
      clearPhoto();
      showToast('A foto deve ter no máximo 5 MB.');
      return;
    }
    previewUrl = URL.createObjectURL(file);
    previewImage.src = previewUrl;
    preview.hidden = false;
    uploadBox.hidden = true;
  });

  document.querySelector('#photo-remove').addEventListener('click', clearPhoto);

  // --- Save ---
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = description.value.trim();
    if (text.length < MIN_DESCRIPTION_LENGTH) {
      showToast(`Descreva o problema com pelo menos ${MIN_DESCRIPTION_LENGTH} caracteres.`);
      return;
    }

    addReport({
      id: Date.now(),
      category: key,
      title: text.length > 40 ? `${text.slice(0, 40).trimEnd()}…` : text,
      address,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''),
      status: 'registered',
      // No real geolocation yet, so the pin lands somewhere random on the illustrated map.
      mapPos: { x: 20 + Math.random() * 60, y: 15 + Math.random() * 32 },
    });

    setFlash('Ocorrência registrada com sucesso!');
    location.href = 'reports.html';
  });
}
