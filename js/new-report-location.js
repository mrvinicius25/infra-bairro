// Step 1 of the wizard: builds the category options from the shared CATEGORIES data.
// Each option is a real <input type="radio"> hidden with .sr-only and a styled sibling box.
// That way selection, keyboard navigation (arrow keys) and the "required" check all come
// from the browser for free, instead of being re-implemented with click handlers.
const categoryGrid = document.querySelector('#category-grid');

categoryGrid.innerHTML = Object.entries(CATEGORIES)
  .map(
    ([key, category], index) => `
      <label class="category-option">
        <input class="sr-only" type="radio" name="category" value="${key}" ${index === 0 ? 'required' : ''} />
        <span class="category-option__box">
          <span class="category-tile" style="--color: ${category.color}">${iconSvg(category.icon)}</span>
          ${category.label}
        </span>
      </label>`,
  )
  .join('');
