// Home screen: colored pins per report status + category/search filters.
const pinsBox = document.querySelector('#pins');
const chipsBox = document.querySelector('#category-chips');
const searchInput = document.querySelector('#search');

const reports = listReports();
const activeCategories = new Set(); // empty set = no category filter (show all)
let searchText = '';

chipsBox.innerHTML = Object.entries(CATEGORIES)
  .map(
    ([key, category]) => `
      <button type="button" class="filter-chip" style="--color: ${category.color}" data-category="${key}" aria-pressed="false">
        ${iconSvg(category.icon)}${category.label}
      </button>`,
  )
  .join('');

pinsBox.innerHTML = reports
  .map(
    (report) => `
      <button type="button" class="pin"
        style="--x: ${report.mapPos.x}%; --y: ${report.mapPos.y}%; --color: var(--status-${report.status})"
        aria-label="${escapeHtml(report.title)} - ${STATUSES[report.status]}"></button>`,
  )
  .join('');

// Pins are rendered in the same order as `reports`, so index i matches between the two lists.
const pins = [...pinsBox.children];

function applyFilters() {
  const query = searchText.trim().toLowerCase();
  reports.forEach((report, i) => {
    const matchesCategory = activeCategories.size === 0 || activeCategories.has(report.category);
    const matchesQuery = !query || `${report.title} ${report.address}`.toLowerCase().includes(query);
    pins[i].hidden = !(matchesCategory && matchesQuery);
  });
}

chipsBox.addEventListener('click', (event) => {
  const chip = event.target.closest('.filter-chip');
  if (!chip) return;

  const key = chip.dataset.category;
  if (activeCategories.has(key)) activeCategories.delete(key);
  else activeCategories.add(key);

  chip.setAttribute('aria-pressed', String(activeCategories.has(key)));
  applyFilters();
});

searchInput.addEventListener('input', () => {
  searchText = searchInput.value;
  applyFilters();
});

pinsBox.addEventListener('click', (event) => {
  const pin = event.target.closest('.pin');
  if (!pin) return;
  const report = reports[pins.indexOf(pin)];
  showToast(`${report.title} · ${STATUSES[report.status]}`);
});
