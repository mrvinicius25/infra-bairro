// "Minhas ocorrências": renders the report cards and handles the status tabs.
const reportList = document.querySelector('#report-list');
const tabs = document.querySelectorAll('[role="tab"]');
const reports = listReports();

function reportCard(report) {
  const category = CATEGORIES[report.category];
  return `
    <li class="report-card">
      <span class="category-tile" style="--color: ${category.color}">${iconSvg(category.icon)}</span>
      <div class="report-card__body">
        <h3 class="report-card__title">${escapeHtml(report.title)}</h3>
        <p class="report-card__address">${escapeHtml(report.address)}</p>
        <div class="report-card__meta">
          <span class="chip chip--${report.status}">${STATUSES[report.status]}</span>
          <time>${escapeHtml(report.date)}</time>
        </div>
      </div>
    </li>`;
}

// filter === 'all' shows everything; otherwise it is a status key ('in-progress', 'solved').
function renderReports(filter) {
  const visible = filter === 'all' ? reports : reports.filter((report) => report.status === filter);
  reportList.innerHTML = visible.length
    ? visible.map(reportCard).join('')
    : '<li class="empty-state">Nenhuma ocorrência por aqui ainda.</li>';
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((other) => other.setAttribute('aria-selected', String(other === tab)));
    renderReports(tab.dataset.filter);
  });
});

renderReports('all');
