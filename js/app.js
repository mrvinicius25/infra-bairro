// Shared behavior loaded on every page (after icons.js and data.js).

const FLASH_KEY = 'infrabairro:flash';

// Anything that ends up inside innerHTML must be escaped, otherwise text typed by a user
// (like "<img onerror=...>") would run as code (XSS).
function escapeHtml(text) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text).replace(/[&<>"']/g, (char) => entities[char]);
}

const toastElement = document.createElement('div');
toastElement.className = 'toast';
toastElement.setAttribute('role', 'status'); // announced by screen readers when the text changes
document.body.append(toastElement);

let toastTimer;
function showToast(message) {
  toastElement.textContent = message;
  toastElement.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastElement.classList.remove('is-visible'), 2500);
}

// A "flash" message survives one page navigation, e.g. "report saved" shown on the next page.
function setFlash(message) {
  try {
    sessionStorage.setItem(FLASH_KEY, message);
  } catch {
    // Not critical: the message just won't be shown.
  }
}

function consumeFlash() {
  try {
    const message = sessionStorage.getItem(FLASH_KEY);
    sessionStorage.removeItem(FLASH_KEY);
    return message;
  } catch {
    return null;
  }
}

renderIcons();

const flashMessage = consumeFlash();
if (flashMessage) showToast(flashMessage);

// Event delegation: one listener handles every "not built yet" control in the page.
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-coming-soon]')) {
    event.preventDefault();
    showToast('Em breve!');
  }
});
