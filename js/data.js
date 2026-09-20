// Domain data + persistence. There is no backend yet: seed reports are hardcoded and
// reports created in the app are kept in the browser's localStorage.

const CATEGORIES = {
  lighting: { label: 'Iluminação', icon: 'lightbulb', color: '#f59e0b' },
  paving: { label: 'Pavimentação', icon: 'road', color: '#2563eb' },
  drainage: { label: 'Drenagem', icon: 'droplet', color: '#0ea5e9' },
  signage: { label: 'Sinalização', icon: 'alert', color: '#ef4444' },
  accessibility: { label: 'Acessibilidade', icon: 'accessibility', color: '#16a34a' },
  waste: { label: 'Resíduos', icon: 'trash', color: '#f97316' },
};

const STATUSES = {
  registered: 'Registrado',
  'in-progress': 'Em andamento',
  solved: 'Solucionado',
};

const DEFAULT_ADDRESS = 'Rua das Acácias, 123 - Compensa - Manaus/AM';

// mapPos is where the pin sits on the illustrated map, in % of its width/height.
const REPORTS_SEED = [
  { id: 1, category: 'lighting', title: 'Poste apagado', address: 'Rua das Acácias, 123 - Compensa', date: '12 set', status: 'in-progress', mapPos: { x: 30, y: 30 } },
  { id: 2, category: 'paving', title: 'Buraco na via', address: 'Av. Djalma Batista, 800 - Chapada', date: '10 set', status: 'registered', mapPos: { x: 62, y: 22 } },
  { id: 3, category: 'drainage', title: 'Bueiro entupido', address: 'Rua Pará, 45 - Adrianópolis', date: '05 set', status: 'solved', mapPos: { x: 45, y: 44 } },
  { id: 4, category: 'signage', title: 'Placa de pare danificada', address: 'Rua 10 de Julho, 210 - Centro', date: '02 set', status: 'in-progress', mapPos: { x: 20, y: 46 } },
  { id: 5, category: 'accessibility', title: 'Rampa sem acesso', address: 'Av. Constantino Nery, 1500 - Flores', date: '28 ago', status: 'solved', mapPos: { x: 72, y: 40 } },
  { id: 6, category: 'waste', title: 'Lixo acumulado na calçada', address: 'Rua Mário Ypiranga, 320 - Adrianópolis', date: '25 ago', status: 'registered', mapPos: { x: 50, y: 16 } },
];

const STORAGE_KEY = 'infrabairro:reports';

// Storage can throw (private mode, disabled cookies) or hold corrupted JSON, so never trust it blindly.
function readSavedReports() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

// Newest first: reports created in the app come before the seed ones.
function listReports() {
  return [...readSavedReports(), ...REPORTS_SEED];
}

function addReport(report) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([report, ...readSavedReports()]));
  } catch {
    // Storage full or unavailable: the report is simply not persisted.
  }
}
