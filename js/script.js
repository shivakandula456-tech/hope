/* ============================================================
   MAITRA SOLAR SOLUTIONS — script.js
   Same-page navigation engine: experience panels, detail modals,
   gallery + lightbox, interactive workflows. No libraries.
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   1. DATA
------------------------------------------------------------ */

/* Lifecycle data flow */
const FLOW_LIFECYCLE = [
  'Site Survey', 'Engineering', 'Execution', 'Testing',
  'Commissioning', 'Monitoring', 'Maintenance', 'Performance'
];

/* O&M data flow */
const FLOW_OM = [
  'Inspection', 'Measurement', 'Diagnosis', 'Maintenance', 'Report', 'Follow-up'
];

/* Due Diligence data flow */
const FLOW_DD = [
  'Site Data', 'Technical Review', 'Risk Identification', 'Assessment', 'Recommendations', 'Client Report'
];

/* Top-level service categories — each opens the corresponding experience panel. */
const SERVICES = [
  {
    id: 'om', num: '01', name: 'O&M', icon: 'wrench',
    desc: 'Operations and maintenance across the plant lifecycle — from module cleaning and electrical checks to monitoring, breakdown response and thermography.',
    detail: 'A documented operations and maintenance programme covering the thirteen client-defined O&M service scopes.',
    openPanel: 'om', actionLabel: 'Open O&M'
  },
  {
    id: 'epc', num: '02', name: 'EPC / EPC Keepability', icon: 'bolt',
    desc: 'Structured project execution from mobilization through testing, commissioning and handover.',
    detail: 'Maitra executes complete solar plant projects through a disciplined engineering sequence — from mobilization and surveying through civil, structural, DC, AC & HT, earthing, communication, testing, commissioning and handover.',
    openPanel: 'epc', actionLabel: 'Open EPC Engineering Timeline'
  },
  {
    id: 'dd', num: '03', name: 'Due Diligence', icon: 'scan',
    desc: 'Technical, operational, structural and performance assessment of solar plants.',
    detail: 'Comprehensive assessment of the solar plant condition to identify technical risks, operational gaps and improvement opportunities.',
    openPanel: 'dd', actionLabel: 'Open Due Diligence'
  }
];

/* EPC / EPC Keepability project execution sequence */
const EPC_STAGES = [
  { title: 'Mobilization', desc: 'Deployment of manpower, tools, equipment and resources at site.' },
  { title: 'Survey & Setting Out', desc: 'Marking locations and establishing accurate project coordinates and levels.' },
  { title: 'Civil & Structure', desc: 'Execution of foundations, structures and associated civil works.' },
  { title: 'Module Installation', desc: 'Mounting and securing PV modules as per approved layout.' },
  { title: 'DC Works', desc: 'Installation, dressing, termination and testing of DC cables and connections.' },
  { title: 'AC & HT Works', desc: 'Installation and termination of AC cables, panels, transformers and HT equipment.' },
  { title: 'Earthing & Communication', desc: 'Installation of earthing, lightning protection and communication systems.' },
  { title: 'Testing & Commissioning', desc: 'Inspection, testing and commissioning of all plant systems.' },
  { title: 'Punch Point Rectification', desc: 'Identification and closure of pending defects and installation issues.' },
  { title: 'Handover', desc: 'Final documentation, inspection and formal handover of the completed plant.' }
];

/* O&M dashboard items */
const OM_ITEMS = [
  { name: 'Module Cleaning', text: 'All module cleaning using brush. Team will check all modules for hotspot, broken or delamination, cable cracks, burn mark and sharp edges. Before and after cleaning pictures should be taken. Team will clean inverter and monitor all strings.' },
  { name: 'Inverter Maintenance', text: 'Clean inverter fan and filters using blower. Check tightness of all AC and DC connections. Megger testing of AC and DC cables. Check inverter, fuses, SPD and surge arrestor.' },
  { name: 'LT Panel', text: 'Check fuse, SPD, surge arrestor, breaker condition, corrosion, overheating, water ingress, pest infection, connection tightness and cable insulation.' },
  { name: 'Meter Panel', text: 'Check connection tightness, CT deformation, CT cable condition to energy meter and display operational status.' },
  { name: 'Lightning Arrestor', text: 'Check lightning arrestor condition, earth strip damage, corrosion, earth pit condition and vegetation growth. Earth pit testing.' },
  { name: 'Inverter Measurement', text: 'Measure inverter string current and voltage. Megger testing of AC and DC cables.' },
  { name: 'Earth Pit Testing', text: 'Earth pit testing once per year.' },
  { name: 'Mechanical PM', text: 'Check tightness of all modules before and after monsoon.' },
  { name: 'Plant Monitoring', text: 'Control team monitors plant three times a day.' },
  { name: 'Breakdown Maintenance', text: 'Team attends breakdown issues within 4 hours once notified, subject to location and circumstances.' },
  { name: 'Communication Issue', text: 'Communication team attends issues twice per month.' },
  { name: 'Revamp Works', text: 'Revamp works outside the defined scope are provided at minimum applicable charges.' },
  { name: 'Thermography of Plant', text: 'Maitra provides plant thermography as required by the client with a report. Separate quotation applies.' }
];

/* Representative field imagery for O&M categories. These are real supplied assets. */
const OM_IMAGES = {
  'Module Cleaning': 'assets/optimized/site/om-module-cleaning/module-cleaning-5.webp',
  'Inverter Maintenance': 'assets/optimized/site/electrical-maintenance/inverter-maintenance-1.webp',
  'LT Panel': 'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-06-pm-2.webp',
  'Meter Panel': 'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-06-pm-2.webp',
  'Lightning Arrestor': 'assets/optimized/client-supplied/epc-construction/installation-3.webp',
  'Inverter Measurement': 'assets/optimized/client-supplied/inverter-maintenance/o-m-inverter-temperature.webp',
  'Earth Pit Testing': 'assets/optimized/client-supplied/epc-construction/installation-3.webp',
  'Mechanical PM': 'assets/optimized/site/om-module-cleaning/module-cleaning-6.webp',
  'Plant Monitoring': 'assets/optimized/client-supplied/monitoring-reporting/3-reporting.webp',
  'Breakdown Maintenance': 'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-16-35-pm.webp',
  'Communication Issue': 'assets/optimized/site/electrical-communication/communication-panel-1.webp',
  'Revamp Works': 'assets/optimized/client-supplied/revamp/whatsapp-image-2026-03-19-at-6-35-18-pm-1.webp',
  'Thermography of Plant': 'assets/optimized/site/inspection-thermography/thermal-inspection-1.webp',
};

/* Client-supplied service galleries. Duplicates from the ZIP are intentionally excluded. */
const OM_IMAGE_GALLERIES = {
  'Module Cleaning': [
    'assets/optimized/site/om-module-cleaning/module-cleaning-5.webp',
    'assets/optimized/site/om-module-cleaning/module-cleaning-1.webp',
    'assets/optimized/site/om-module-cleaning/module-cleaning-3.webp',
  ],
  'Inverter Maintenance': [
    'assets/optimized/site/electrical-maintenance/inverter-maintenance-1.webp',
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-15-16-pm.webp',
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-06-pm-2.webp',
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-16-35-pm.webp',
    'assets/optimized/client-supplied/inverter-maintenance/o-m-inverter-temperature.webp',
  ],
  'LT Panel': [
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-06-pm-2.webp',
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-13-pm.webp',
    'assets/optimized/client-supplied/epc-construction/installation-4.webp',
  ],
  'Meter Panel': [
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-06-pm-2.webp',
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-13-pm.webp',
    'assets/optimized/client-supplied/inverter-maintenance/o-m-inverter-temperature.webp',
  ],
  'Lightning Arrestor': [
    'assets/optimized/client-supplied/epc-construction/installation-3.webp',
    'assets/optimized/client-supplied/earth-pit/whatsapp-image-2026-08-22-at-4-51-59-pm.webp',
    'assets/optimized/client-supplied/epc-construction/installation-6.webp',
  ],
  'Inverter Measurement': [
    'assets/optimized/client-supplied/inverter-maintenance/o-m-inverter-temperature.webp',
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-15-16-pm.webp',
  ],
  'Earth Pit Testing': [
    'assets/optimized/client-supplied/epc-construction/installation-3.webp',
    'assets/optimized/client-supplied/earth-pit/whatsapp-image-2026-08-22-at-4-51-59-pm.webp',
    'assets/optimized/client-supplied/earth-pit/whatsapp-image-2026-08-22-at-4-52-03-pm.webp',
  ],
  'Mechanical PM': [
    'assets/optimized/site/om-module-cleaning/module-cleaning-6.webp',
    'assets/optimized/client-supplied/epc-construction/installation-5.webp',
  ],
  'Plant Monitoring': [
    'assets/optimized/client-supplied/monitoring-reporting/3-reporting.webp',
    'assets/optimized/client-supplied/monitoring-reporting/3-reportings.webp',
    'assets/optimized/client-supplied/monitoring-reporting/plant-monitering-and-performance.webp',
  ],
  'Breakdown Maintenance': [
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-16-35-pm.webp',
    'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-13-pm.webp',
  ],
  'Communication Issue': [
    'assets/optimized/site/electrical-communication/communication-panel-1.webp',
    'assets/optimized/site/electrical-communication/communication-panel-2.webp',
  ],
  'Revamp Works': [
    'assets/optimized/client-supplied/revamp/whatsapp-image-2026-03-19-at-6-35-18-pm-1.webp',
    'assets/optimized/client-supplied/revamp/whatsapp-image-2026-04-01-at-1-57-19-pm.webp',
    'assets/optimized/client-supplied/revamp/whatsapp-image-2026-04-20-at-8-10-18-pm.webp',
  ],
  'Thermography of Plant': [
    'assets/optimized/site/inspection-thermography/thermal-inspection-1.webp',
    'assets/optimized/site/inspection-thermography/thermal-inspection-2.webp',
    'assets/optimized/site/inspection-thermography/thermal-inspection-3.webp',
  ],
};

/* Due diligence zones */
const DD_ZONES = [
  {
    name: 'Technical', icon: 'bolt',
    desc: 'Electrical and system health of the plant.',
    detail: [
      'PV module and string condition',
      'Inverter and protection devices',
      'DC / AC cabling and termination',
      'Earthing and lightning protection'
    ]
  },
  {
    name: 'Operational', icon: 'wrench',
    desc: 'How the plant is actually operated and maintained.',
    detail: [
      'Maintenance and cleaning records',
      'Monitoring practices and alarms',
      'Site operations and documentation',
      'Spare and material management'
    ]
  },
  {
    name: 'Structural', icon: 'layers',
    desc: 'Mechanical integrity of the plant infrastructure.',
    detail: [
      'Mounting structures and foundations',
      'Corrosion and alignment',
      'Module fixing integrity',
      'Civil condition assessment'
    ]
  },
  {
    name: 'Performance', icon: 'chart',
    desc: 'Generation behaviour against expectations.',
    detail: [
      'Generation data analysis',
      'String-level performance review',
      'Degradation assessment',
      'Yield consistency'
    ]
  },
  {
    name: 'Risk', icon: 'shield',
    desc: 'Identified technical, safety and operational risks.',
    detail: [
      'Technical and electrical risks',
      'Safety and access risks',
      'Environmental exposure',
      'Operational reliability'
    ]
  },
  {
    name: 'Improvement', icon: 'compass',
    desc: 'Prioritised recommendations for the client.',
    detail: [
      'Output improvement measures',
      'Reliability actions',
      'Maintenance plan adjustments',
      'Cost-effective priorities'
    ]
  }
];

/* Gallery data — descriptive captions, no fabricated project facts */
const GALLERY = [
  { src: 'assets/optimized/site/plant/solar-plant-overview.webp', cat: 'plant', tag: 'Plant & Site', cap: 'Representative utility-scale solar plant overview', wide: true },
  { src: 'assets/optimized/site/epc-construction/epc-construction.webp', cat: 'epc', tag: 'EPC & Construction', cap: 'Solar module installation and field construction', wide: true },
  { src: 'assets/optimized/site/om-module-cleaning/module-cleaning-1.webp', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Module cleaning with brush and water' },
  { src: 'assets/optimized/site/om-module-cleaning/module-cleaning-2.webp', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Module cleaning in progress' },
  { src: 'assets/optimized/site/om-module-cleaning/module-cleaning-3.webp', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Brush cleaning of PV modules' },
  { src: 'assets/optimized/site/om-module-cleaning/module-cleaning-4.webp', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Cleaning operation at plant' },
  { src: 'assets/optimized/site/om-module-cleaning/module-cleaning-5.webp', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Module cleaning — site operations', wide: true },
  { src: 'assets/optimized/site/om-module-cleaning/module-cleaning-6.webp', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Cleaning — plant view' },
  { src: 'assets/optimized/site/electrical-maintenance/inverter-maintenance-1.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter maintenance — inspection' },
  { src: 'assets/optimized/site/electrical-maintenance/inverter-maintenance-2.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter checks at plant' },
  { src: 'assets/optimized/site/electrical-maintenance/inverter-maintenance-3.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter — periodic maintenance' },
  { src: 'assets/optimized/site/electrical-maintenance/inverter-maintenance-4.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Plant maintenance activity' },
  { src: 'assets/optimized/site/electrical-maintenance/inverter-maintenance-5.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter maintenance — checks' },
  { src: 'assets/optimized/site/electrical-maintenance/inverter-maintenance-6.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter internal checks', tall: true },
  { src: 'assets/optimized/site/electrical-communication/communication-panel-1.webp', cat: 'communication', tag: 'Communication', cap: 'Inverter communication — monitoring' },
  { src: 'assets/optimized/site/electrical-communication/communication-panel-2.webp', cat: 'communication', tag: 'Communication', cap: 'Communication module inspection' },
  { src: 'assets/optimized/site/inspection-thermography/thermal-inspection-1.webp', cat: 'thermo', tag: 'Thermography', cap: 'Plant thermography — thermal inspection' },
  { src: 'assets/optimized/site/inspection-thermography/thermal-inspection-2.webp', cat: 'thermo', tag: 'Thermography', cap: 'Thermal scan of plant area' },
  { src: 'assets/optimized/site/inspection-thermography/thermal-inspection-3.webp', cat: 'thermo', tag: 'Thermography', cap: 'Thermography inspection view' },
  { src: 'assets/optimized/site/inspection-thermography/thermal-inspection-4.webp', cat: 'thermo', tag: 'Thermography', cap: 'Thermal inspection data' },
  { src: 'assets/optimized/site/epc-construction/epc-construction.webp', cat: 'epc', tag: 'EPC & Revamp', cap: 'Solar module installation and revamp work', wide: true },
  { src: 'assets/optimized/site/module-surface-care/surface-care-1.webp', cat: 'solution', tag: 'Solution Cleaning', cap: 'Chemical / solution cleaning of modules' },
  { src: 'assets/optimized/site/module-surface-care/surface-care-2.webp', cat: 'solution', tag: 'Solution Cleaning', cap: 'Solution cleaning operation' },
  
  
  
  
  
  { src: 'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-15-16-pm.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter fan and equipment maintenance' },
  { src: 'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-14-06-pm-2.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Electrical panel inspection during maintenance' },
  { src: 'assets/optimized/client-supplied/inverter-maintenance/whatsapp-image-2026-07-11-at-8-16-35-pm.webp', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Field electrical maintenance check' },
  { src: 'assets/optimized/client-supplied/inverter-maintenance/o-m-inverter-temperature.webp', cat: 'inverter', tag: 'Inverter Measurement', cap: 'Inverter temperature measurement' },
  { src: 'assets/optimized/client-supplied/epc-construction/installation-2.webp', cat: 'epc', tag: 'EPC & Construction', cap: 'Foundation and setting-out work' },
  { src: 'assets/optimized/client-supplied/epc-construction/installation-3.webp', cat: 'epc', tag: 'EPC & Construction', cap: 'Solar plant foundation work' },
  { src: 'assets/optimized/client-supplied/epc-construction/installation-4.webp', cat: 'epc', tag: 'EPC & Construction', cap: 'Electrical installation during project execution' },
  { src: 'assets/optimized/client-supplied/epc-construction/installation-5.webp', cat: 'epc', tag: 'EPC & Construction', cap: 'Trenching and cable route preparation' },
  { src: 'assets/optimized/client-supplied/epc-construction/installation-1.webp', cat: 'epc', tag: 'EPC & Construction', cap: 'Foundation and field execution' },
  { src: 'assets/optimized/client-supplied/epc-construction/installation-6.webp', cat: 'epc', tag: 'EPC & Construction', cap: 'Solar structure installation' },
  { src: 'assets/optimized/client-supplied/revamp/whatsapp-image-2026-03-19-at-6-35-18-pm-1.webp', cat: 'revamp', tag: 'Revamp Works', cap: 'Solar plant revamp activity' },
  { src: 'assets/optimized/client-supplied/revamp/whatsapp-image-2026-04-01-at-1-57-19-pm.webp', cat: 'revamp', tag: 'Revamp Works', cap: 'Rooftop solar revamp work' },
  { src: 'assets/optimized/client-supplied/revamp/whatsapp-image-2026-04-20-at-8-10-18-pm.webp', cat: 'revamp', tag: 'Revamp Works', cap: 'Module and structure revamp work' },
  { src: 'assets/optimized/client-supplied/monitoring-reporting/3-reporting.webp', cat: 'monitoring', tag: 'Plant Monitoring', cap: 'Reporting and plant performance records' },
  { src: 'assets/optimized/client-supplied/monitoring-reporting/3-reportings.webp', cat: 'monitoring', tag: 'Plant Monitoring', cap: 'Performance reporting reference' },
  { src: 'assets/optimized/client-supplied/monitoring-reporting/plant-monitering-and-performance.webp', cat: 'monitoring', tag: 'Plant Monitoring', cap: 'Illustrative performance management view' },
  { src: 'assets/optimized/client-supplied/safety/safety-image.webp', cat: 'safety', tag: 'Safety', cap: 'Maitra field safety team' },
  ];

const GALLERY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'plant', label: 'Plant & Site' },
  { id: 'epc', label: 'EPC & Construction' },
  { id: 'cleaning', label: 'Module Cleaning' },
  { id: 'inverter', label: 'Inverter' },
  { id: 'communication', label: 'Communication' },
  { id: 'thermo', label: 'Thermography' },
  { id: 'solution', label: 'Module Surface Care' },
  { id: 'revamp', label: 'Revamp' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'safety', label: 'Safety' },
  ];

/* Team — client-facing profiles use professional designations instead of personal names. */
const TEAM = [
  { role: 'Managing Director', img: 'assets/optimized/team/prajkta-kulkarni.webp', lead: true, stage: 'PROJECT DIRECTION', desc: 'Strategic direction, client alignment and the decisions that keep a project moving from requirement to delivery.', focus: ['Strategy', 'Client Alignment', 'Direction'] },
  { role: 'Project & Asset Manager', img: 'assets/team/amrut-bugad-cutout.png', lead: true, stage: 'PROJECT DELIVERY', desc: 'Coordinates project delivery and asset responsibilities across the operating lifecycle, keeping execution and follow-through connected.', focus: ['Project Delivery', 'Asset Management', 'Coordination'] },
  { role: 'EPC Supervisor', img: 'assets/team/babu-ghevade-cutout.png', stage: 'FIELD EXECUTION', desc: 'Supports EPC execution on site, translating the approved project sequence into coordinated field activity.', focus: ['EPC Execution', 'Site Supervision', 'Field Coordination'] },
  { role: 'Site Supervisor', img: 'assets/team/ravi-kumar-cutout.png', stage: 'SITE CONTROL', desc: 'Supports day-to-day site execution, keeping field activities aligned with the planned work sequence.', focus: ['Site Execution', 'Work Coordination', 'Quality Focus'] },
  { role: 'Sr O&M Supervisor', img: 'assets/team/rushikesh-ubale-cutout.png', stage: 'ASSET PERFORMANCE', desc: 'Supports O&M field activity, maintenance response and the practical work required to keep solar assets operating reliably.', focus: ['O&M', 'Maintenance', 'Field Response'] }
];

const MAITRA_VALUES = [
  { code: 'S', name: 'Safety First', accent: 'green', text: 'Safety is our highest priority in every project and activity.' },
  { code: 'E', name: 'Excellence', accent: 'blue', text: 'We strive for high standards in quality, execution and performance.' },
  { code: 'T', name: 'Teamwork', accent: 'amber', text: 'We believe in collaboration, coordination and working together towards common goals.' },
  { code: 'C', name: 'Customer Satisfaction', accent: 'cyan', text: 'We are committed to understanding our clients’ needs and delivering dependable solutions.' },
  { code: 'I', name: 'Innovation', accent: 'navy', text: 'We continuously look for better, smarter and more efficient ways to execute solar projects.' }
];

const MAITRA_CLIENTS = [
  'BECIS', 'Fourgreens', 'Soledify', 'Prosumers', 'Shreeram Cables',
  'GSE Renewables', 'Purushotam Solar', 'Prozeal', 'CBRE South Asia Pvt. Ltd.', 'AFRY'
];

const LEADERSHIP_STAGES = [
  { label: 'PROJECT DIRECTION', person: 0 },
  { label: 'PROJECT DELIVERY', person: 1 },
  { label: 'FIELD EXECUTION', person: 2 },
  { label: 'SITE CONTROL', person: 3 },
  { label: 'ASSET PERFORMANCE', person: 4 },
  { label: 'ASSET PERFORMANCE', person: 4 }
];

/* Panel registry */
const PANELS = {
  about: { eyebrow: '01 / About Maitra', title: 'About Maitra', render: renderAboutPanel },
  services: { eyebrow: '02 / Services', title: 'Capabilities', render: renderServicesPanel },
  epc: { eyebrow: '02.02 / EPC', title: 'Execution Sequence', render: renderEpcPanel },
  om: { eyebrow: '02.01 / O&M', title: 'Asset Care', render: renderOmPanel },
  dd: { eyebrow: '02.03 / Due Diligence', title: 'Technical Assessment', render: renderDdPanel },
  projects: { eyebrow: '03 / Projects & Site Work', title: 'Field Portfolio', render: renderProjectsPanel },
  team: { eyebrow: '04 / Team', title: 'People Behind the Plant', render: renderTeamPanel },
  contact: { eyebrow: '05 / Contact', title: 'Start the Conversation', render: renderContactPanel },
  clients: { eyebrow: '06 / Customer Relationships', title: 'Our Clients', render: renderClientsPanel }
};

/* ------------------------------------------------------------
   2. DOM REFERENCES
------------------------------------------------------------ */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

const body = document.body;
const header = $('#siteHeader');
const navToggle = $('#navToggle');
const mobileMenu = $('#mobileMenu');
const panelShell = $('#panelShell');
const panelTitle = $('#panelTitle');
const panelEyebrow = $('#panelEyebrow');
const panelBody = $('#panelBody');
const ixScrollRail = $('#ixScrollRail');
const modalShell = $('#modalShell');
const modalBody = $('#modalBody');
const consultShell = $('#consultShell');
const lightboxEl = $('#lightbox');
const lightboxImg = $('#lightboxImg');
const lightboxCaption = $('#lightboxCaption');
const lightboxTitle = $('#lightboxTitle');
const lightboxCount = $('#lightboxCount');
const lightboxCounter = $('#lightboxCounter');
const lightboxThumbs = $('#lightboxThumbs');
const toastEl = $('#toast');

let lastFocused = null;
let currentPanelId = null;
let panelHistory = [];
let lightboxList = [];
let lightboxIndex = 0;
let menuLastFocused = null;

/* ------------------------------------------------------------
   3. HELPERS
------------------------------------------------------------ */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function icon(name, cls) {
  return `<svg class="icon ${cls || ''}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}

function slugify(value) {
  return String(value).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function openOmItem(name) {
  if (!name) return;
  openPanel('om');
  requestAnimationFrame(() => {
    const item = $$('.om-item', panelBody).find(el => el.getAttribute('data-om-name') === name);
    if (!item) return;
    item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    toggleAccordion(item, '.om-detail');
  });
}

function lockScroll() { body.classList.add('no-scroll'); }
function unlockScroll() { body.classList.remove('no-scroll'); }

/* Keep the scroll lock correct when overlays stack (panel + modal). */
function anyOverlayOpen() {
  return !panelShell.hidden || !modalShell.hidden || !consultShell.hidden || !lightboxEl.hidden;
}
function syncScrollLock() { body.classList.toggle('no-scroll', anyOverlayOpen()); }

function getActiveOverlayRoot() {
  if (!lightboxEl.hidden) return lightboxEl.querySelector('[role="dialog"]') || lightboxEl;
  if (!consultShell.hidden) return consultShell.querySelector('[role="dialog"]') || consultShell;
  if (!modalShell.hidden) return modalShell.querySelector('[role="dialog"]') || modalShell;
  if (!panelShell.hidden) return panelShell.querySelector('[role="dialog"]') || panelShell;
  if (!mobileMenu.hidden) return mobileMenu;
  return null;
}

function getFocusable(root) {
  if (!root) return [];
  return $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', root)
    .filter(el => !el.hidden && el.getAttribute('aria-hidden') !== 'true' && el.offsetParent !== null);
}

function trapOverlayFocus(e) {
  if (e.key !== 'Tab') return;
  const root = getActiveOverlayRoot();
  if (!root) return;
  const focusable = getFocusable(root);
  if (!focusable.length) {
    e.preventDefault();
    root.focus?.();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

panelBody?.addEventListener('scroll', updatePanelScrollRail, { passive: true });

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toastEl.hidden = true; }, 4200);
}

/* Accordion expand/collapse */
function toggleAccordion(item, detailClass) {
  const open = item.classList.toggle('is-open');
  const detail = item.querySelector(detailClass);
  if (detail) detail.style.maxHeight = open ? detail.scrollHeight + 'px' : '';
  const btn = item.querySelector('[aria-expanded]');
  if (btn) btn.setAttribute('aria-expanded', String(open));
}

/* ------------------------------------------------------------
   4. HEADER + MOBILE MENU
------------------------------------------------------------ */
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

const MENU_PREVIEWS = {
  about: { src:'assets/optimized/site/plant/solar-plant-overview.webp', index:'01 / 06', label:'FIELD REFERENCE', note:'Engineering, execution and operational discipline across the solar plant lifecycle.' },
  services: { src:'assets/optimized/site/om-module-cleaning/module-cleaning-1.webp', index:'02 / 06', label:'FIELD OPERATIONS', note:'O&M, EPC and due diligence organised around accountable engineering scopes.' },
  projects: { src:'assets/optimized/site/epc-construction/epc-construction.webp', index:'03 / 06', label:'SITE WORK', note:'Representative field imagery showing the scale and complexity of solar infrastructure.' },
  team: { src:'assets/optimized/team/prajkta-kulkarni.webp', index:'04 / 06', label:'MAITRA TEAM', note:'People, site discipline and asset thinking behind every project.' },
  contact: { src:'assets/optimized/site/plant/solar-plant-overview.webp', index:'05 / 06', label:'START HERE', note:'Direct access to Maitra for EPC, O&M, due diligence and asset management.' },
  clients: { src:'assets/optimized/site/plant/solar-plant-overview.webp', index:'06 / 06', label:'CLIENT RELATIONSHIPS', note:'Representative client relationships supplied by Maitra Solar Solutions.' }
};

function updateMenuPreview(key) {
  const data = MENU_PREVIEWS[key] || MENU_PREVIEWS.about;
  const frame = $('.menu-preview-frame', mobileMenu);
  const img = $('.menu-preview-frame img', mobileMenu);
  const idx = $('.menu-preview-index', mobileMenu);
  const label = $('.menu-preview-label', mobileMenu);
  const note = $('.menu-preview-note', mobileMenu);
  if (!frame || !img) return;
  frame.dataset.previewKey = key;
  if (img.dataset.src === data.src) {
    idx.textContent = data.index;
    label.textContent = data.label;
    if (note) note.textContent = data.note;
    return;
  }
  img.style.opacity = '0';
  window.setTimeout(() => {
    img.src = data.src;
    img.dataset.src = data.src;
    idx.textContent = data.index;
    label.textContent = data.label;
    if (note) note.textContent = data.note;
    requestAnimationFrame(() => { img.style.opacity = '1'; });
  }, 120);
}

function updateMenuScrollRail() {
  if (!mobileMenu) return;
  const rail = $('.menu-scroll-rail', mobileMenu);
  const thumb = $('.menu-scroll-rail span', mobileMenu);
  if (!rail || !thumb) return;
  const max = Math.max(0, mobileMenu.scrollHeight - mobileMenu.clientHeight);
  const ratio = max ? mobileMenu.scrollTop / max : 0;
  const viewportRatio = mobileMenu.scrollHeight ? mobileMenu.clientHeight / mobileMenu.scrollHeight : 1;
  const thumbHeight = Math.max(18, Math.min(72, viewportRatio * 72));
  const travel = 100 - thumbHeight;
  thumb.style.height = `${thumbHeight}%`;
  thumb.style.transform = `translateY(${ratio * travel}%)`;
  rail.classList.toggle('is-scrollable', max > 8);
}

function bindMenuInteractions() {
  $$('#mobileMenu [data-menu-key]').forEach(btn => {
    const key = btn.getAttribute('data-menu-key');
    btn.addEventListener('pointerenter', () => updateMenuPreview(key), { passive:true });
    btn.addEventListener('focus', () => updateMenuPreview(key));
  });
  mobileMenu?.addEventListener('scroll', updateMenuScrollRail, { passive:true });
  window.addEventListener('resize', updateMenuScrollRail, { passive:true });
}

bindMenuInteractions();
updateMenuPreview('about');
updateMenuScrollRail();

navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  if (!open) menuLastFocused = document.activeElement;
  navToggle.setAttribute('aria-expanded', String(!open));
  navToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  mobileMenu.hidden = open;
  mobileMenu.setAttribute('aria-hidden', String(open));
  header.classList.toggle('is-menu-open', !open);
  if (!open) {
    lockScroll();
    updateMenuPreview(currentPanelId ? (new Set(['om','epc','dd']).has(currentPanelId) ? 'services' : currentPanelId) : 'about');
    requestAnimationFrame(() => { updateMenuScrollRail(); mobileMenu.querySelector('[data-menu-key]')?.focus(); });
  } else {
    unlockScroll();
    requestAnimationFrame(() => menuLastFocused?.focus());
  }
});

function closeMobileMenu(restoreFocus = false) {
  const wasOpen = !mobileMenu.hidden;
  mobileMenu.hidden = true;
  mobileMenu.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  header.classList.remove('is-menu-open');
  if (wasOpen && restoreFocus) requestAnimationFrame(() => menuLastFocused?.focus());
}

const menuConsultLink = $('[data-menu-consult]');
menuConsultLink?.addEventListener('click', (e) => {
  e.preventDefault();
  closeMobileMenu(false);
  const consultTrigger = $('[data-open-consult]') || $('[data-consult]');
  if (consultTrigger) consultTrigger.click();
  else if (typeof openConsult === 'function') openConsult();
});

/* ------------------------------------------------------------
   5. EXPERIENCE PANEL SYSTEM (same-page navigation)
------------------------------------------------------------ */
function setNavCurrent(panelId) {
  const servicePanels = new Set(['om', 'epc', 'dd']);
  const currentNavTarget = servicePanels.has(panelId) ? 'services' : panelId;
  $$('[data-open]').forEach(btn => {
    const active = Boolean(currentNavTarget) && btn.getAttribute('data-open') === currentNavTarget;
    btn.classList.toggle('is-current', active);
    if (active) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });
}

function updatePanelScrollRail() {
  if (!panelBody || !ixScrollRail) return;
  const scrollable = panelBody.scrollHeight - panelBody.clientHeight;
  const ratio = scrollable > 0 ? panelBody.scrollTop / scrollable : 0;
  const track = ixScrollRail.querySelector('span');
  if (!track) return;
  const viewportRatio = panelBody.scrollHeight > 0 ? panelBody.clientHeight / panelBody.scrollHeight : 1;
  const thumbHeight = Math.max(18, Math.min(72, viewportRatio * 72));
  const travel = 100 - thumbHeight;
  track.style.height = `${thumbHeight}%`;
  track.style.transform = `translateY(${ratio * travel}%)`;
  ixScrollRail.classList.toggle('is-scrollable', scrollable > 8);
}

function fadeContentIn() {
  panelBody.style.opacity = '0';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panelBody.style.transition = 'opacity 0.4s ease';
      panelBody.style.opacity = '1';
    });
  });
}

function openPanel(panelId, options = {}) {
  const cfg = PANELS[panelId];
  if (!cfg) return;
  if (!modalShell.hidden) closeModal(modalShell);
  if (!consultShell.hidden) closeModal(consultShell);
  if (!lightboxEl.hidden) closeLightbox();
  if (options.resetHistory) panelHistory = [];
  if (!panelShell.hidden && currentPanelId && currentPanelId !== panelId && options.pushHistory !== false) {
    panelHistory.push(currentPanelId);
  }
  const menuOpener = !mobileMenu.hidden && document.activeElement?.closest('#mobileMenu');
  lastFocused = menuOpener ? navToggle : document.activeElement;
  currentPanelId = panelId;
  panelShell.dataset.panel = panelId;
  panelBody.dataset.panel = panelId;
  panelEyebrow.textContent = cfg.eyebrow;
  panelTitle.textContent = cfg.title;
  panelBody.innerHTML = cfg.render();
  /* populate any empty gallery grids inside the panel */
  $$('.gallery-grid', panelBody).forEach(grid => {
    if (!grid.querySelector('.g-item')) renderGallery(grid);
  });
  panelShell.hidden = false;
  panelShell.setAttribute('aria-hidden', 'false');
  fadeContentIn();
  updatePanelScrollRail();
  syncScrollLock();
  setNavCurrent(panelId);
  closeMobileMenu();
  requestAnimationFrame(() => {
    const backBtn = $('.panel-back', panelShell);
    const closeBtn = $('.panel-close', panelShell);
    const focusTarget = backBtn && !backBtn.hidden ? backBtn : closeBtn;
    if (focusTarget) focusTarget.focus();
  });
}

function closePanel(options = {}) {
  panelShell.hidden = true;
  panelShell.setAttribute('aria-hidden', 'true');
  panelBody.innerHTML = '';
  delete panelShell.dataset.panel;
  delete panelBody.dataset.panel;
  updatePanelScrollRail();
  syncScrollLock();
  setNavCurrent(null);
  if (options.clearHistory !== false) {
    currentPanelId = null;
    panelHistory = [];
  }
  if (lastFocused) lastFocused.focus();
}

function goBackPanel() {
  if (panelHistory.length) {
    const previous = panelHistory.pop();
    openPanel(previous, { pushHistory: false });
  } else {
    closePanel();
  }
}

/* ------------------------------------------------------------
   6. MODAL SYSTEM
------------------------------------------------------------ */
function openModal(html, ariaLabel) {
  lastFocused = document.activeElement;
  modalBody.innerHTML = html;
  const modalDialog = $('.modal', modalShell);
  const modalHeading = $('.modal-title', modalShell);
  if (modalHeading) {
    modalHeading.id = 'modalTitle';
    modalDialog?.setAttribute('aria-labelledby', 'modalTitle');
  } else {
    modalDialog?.removeAttribute('aria-labelledby');
    modalDialog?.setAttribute('aria-label', ariaLabel || 'Details');
  }
  modalShell.hidden = false;
  modalShell.setAttribute('aria-hidden', 'false');
  modalShell.removeAttribute('aria-label');
  syncScrollLock();
  requestAnimationFrame(() => {
    const closeBtn = $('.modal-close', modalShell);
    if (closeBtn) closeBtn.focus();
  });
}

function closeModal(shell) {
  const target = shell || modalShell;
  target.hidden = true;
  target.setAttribute('aria-hidden', 'true');
  if (target === modalShell) modalBody.innerHTML = '';
  syncScrollLock();
  if (lastFocused) lastFocused.focus();
}

/* Detail modal for a capability service */
function openServiceModal(id) {
  const svc = SERVICES.find(s => s.id === id);
  if (!svc) return;
  let media = '';
  if (svc.images && svc.images.length) {
    const cls = svc.images.length > 1 ? 'modal-media two-col' : 'modal-media';
    media = `<div class="${cls}">${svc.images.map(src =>
      `<img src="${src}" alt="${esc(svc.name)} — field imagery" loading="lazy">`).join('')}</div>`;
  }
  const bullets = svc.bullets ? `<ul class="dd-list">${svc.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : '';
  const html = `<div class="ix-detail">
    <p class="ix-kicker">CAPABILITY ${esc(svc.num)}</p>
    <h2 class="modal-title">${esc(svc.name)}</h2>
    <p class="modal-sub">${esc(svc.desc)}</p>
    ${media}
    <p>${esc(svc.detail)}</p>
    ${bullets}
    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn btn-primary" type="button" data-close>Close</button>
      <button class="btn btn-ghost-light" type="button" data-open="contact">Talk to Maitra</button>
    </div>`;
  openModal(html, svc.name);
}

/* Legal placeholders */
function openLegalModal(kind) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Use';
  const html = `
    <p class="eyebrow eyebrow-light">${isPrivacy ? 'Privacy Policy' : 'Terms'}</p>
    <h2 class="modal-title">${title}</h2>
    <p class="modal-sub">Placeholder</p>
    <p>This section is a placeholder for the ${isPrivacy ? 'privacy policy' : 'terms and conditions'} of Maitra Solar Solutions and will be completed before public deployment.</p>`;
  openModal(html, title);
}

/* ------------------------------------------------------------
   7. GLOBAL CLICK DELEGATION
------------------------------------------------------------ */
document.addEventListener('click', (e) => {
  const backPanel = e.target.closest('[data-back-panel]');
  if (backPanel) {
    goBackPanel();
    return;
  }

  const modalBack = e.target.closest('[data-modal-back]');
  if (modalBack) {
    const targetPanel = modalBack.getAttribute('data-modal-back');
    closeModal(modalShell);
    if (targetPanel && PANELS[targetPanel]) {
      currentPanelId = targetPanel;
      setNavCurrent(targetPanel);
    }
    return;
  }

  const opener = e.target.closest('[data-open]');
  if (opener) {
    const panelId = opener.getAttribute('data-open');
    const omItemName = opener.getAttribute('data-om-item');
    if (panelId === 'contact' && !modalShell.hidden) {
      /* "Talk to Maitra" inside a detail modal */
      closeModal(modalShell);
    }
    if (panelId === 'om' && omItemName) openOmItem(omItemName);
    else openPanel(panelId, { resetHistory: panelShell.hidden });
    return;
  }

  const consultOpener = e.target.closest('[data-open-consult]');
  if (consultOpener) {
    if (!panelShell.hidden) closePanel();
    openConsult();
    return;
  }

  const modalOpener = e.target.closest('[data-modal]');
  if (modalOpener) {
    openLegalModal(modalOpener.getAttribute('data-modal'));
    return;
  }

  if (e.target.closest('[data-close]')) {
    if (!lightboxEl.hidden) closeLightbox();
    else if (!consultShell.hidden) closeModal(consultShell);
    else if (!modalShell.hidden) closeModal(modalShell);
    else if (!panelShell.hidden) closePanel();
    return;
  }

  /* capability triggers (landing cards + services-panel "View Details") */
  const svcTrigger = e.target.closest('[data-svc]');
  if (svcTrigger) {
    const svc = SERVICES.find(s => s.id === svcTrigger.getAttribute('data-svc'));
    if (svc && svc.openPanel) openPanel(svc.openPanel);
    else openServiceModal(svcTrigger.getAttribute('data-svc'));
    return;
  }

  /* O&M service detail cards */
  const omDetailTrigger = e.target.closest('[data-om-detail]');
  if (omDetailTrigger) {
    openOmServiceModal(omDetailTrigger.getAttribute('data-om-detail'));
    return;
  }

  /* accordions */
  const svcToggle = e.target.closest('.svc-toggle');
  if (svcToggle) {
    toggleAccordion(svcToggle.closest('.svc-row'), '.svc-detail');
    return;
  }
  const omItem = e.target.closest('.om-item');
  if (omItem) {
    toggleAccordion(omItem, '.om-detail');
    return;
  }
  const ddTrigger = e.target.closest('.dd-zone-trigger');
  if (ddTrigger) {
    toggleAccordion(ddTrigger.closest('.dd-zone'), '.dd-zone-detail');
    return;
  }

  const teamPerson = e.target.closest('[data-team-person]');
  if (teamPerson) {
    setTeamPanelPerson(Number(teamPerson.getAttribute('data-team-person')) || 0);
    return;
  }
  const epcStage = e.target.closest('.epc-stage');
  if (epcStage) {
    activateEpcStage(epcStage);
    return;
  }

  /* gallery */
  const filterBtn = e.target.closest('.filter-btn');
  if (filterBtn) {
    setGalleryFilter(filterBtn.getAttribute('data-filter'));
    return;
  }
  const gItem = e.target.closest('.g-item');
  if (gItem) {
    openLightboxGroup(gItem.getAttribute('data-cat'));
    return;
  }

  const lightboxThumb = e.target.closest('[data-lightbox-index]');
  if (lightboxThumb && !lightboxEl.hidden) {
    lightboxIndex = Number(lightboxThumb.getAttribute('data-lightbox-index')) || 0;
    showLightboxImage();
    return;
  }

  /* consultation */
  if (e.target.closest('#openConsult') || e.target.closest('#openConsultPanel')) {
    if (!panelShell.hidden) closePanel();
    openConsult();
  }
});

/* ------------------------------------------------------------
   8. PANEL RENDERERS
------------------------------------------------------------ */
function renderAboutPanel() {
  const values = MAITRA_VALUES.map((v, i) => `
    <article class="ix-value-card accent-${v.accent}">
      <div class="ix-value-top"><span>${String(i + 1).padStart(2, '0')}</span><b>${esc(v.code)}</b></div>
      <h4>${esc(v.name)}</h4>
      <p>${esc(v.text)}</p>
    </article>`).join('');
  return `
    <div class="ix ix-about">
      <div class="ix-about-hero">
        <div class="ix-copy">
          <p class="ix-kicker">FIELD ENGINEERING / MAITRA SOLAR SOLUTIONS</p>
          <h3>Engineering<br><span>Beyond Installation.</span></h3>
          <p class="ix-lead">Maitra Solar Solutions is a solar plant engineering company based in <strong>Dighi, Pune</strong>, delivering integrated solutions across project execution, operations and maintenance, asset management and technical assessment for ground-mounted and rooftop solar plants across Maharashtra and Pan India.</p>
          <p class="ix-copytext">From the first survey to handover, and from routine operation to complete overhaul, Maitra operates as a single accountable partner — combining site engineering discipline with structured O&amp;M and data-backed performance management.</p>
          <div class="ix-actions"><button class="ix-action primary" type="button" data-open="services">Explore capabilities <span>→</span></button><button class="ix-action" type="button" data-open="contact">Talk to Maitra <span>→</span></button></div>
        </div>
        <figure class="ix-about-media"><img src="assets/optimized/site/plant/solar-plant-overview.webp" alt="Representative utility-scale solar plant overview" loading="eager"><div class="ix-media-shade"></div><figcaption><span>REFERENCE IMAGERY</span><span>SOLAR PLANT / FIELD VIEW</span></figcaption></figure>
      </div>
      <div class="ix-evidence">${[['01','GROUND-MOUNTED','UTILITY SCALE'],['02','ROOFTOP','PROJECT DELIVERY'],['03','MAHARASHTRA','CORE REGION'],['04','PAN INDIA','SERVICE COVERAGE']].map(x=>`<div><b>${x[0]}</b><strong>${x[1]}</strong><small>${x[2]}</small></div>`).join('')}</div>
      <div class="ix-workflow"><div class="ix-section-intro"><div><p class="ix-kicker">LIFECYCLE / 01 — 08</p><h4>From survey to <span>performance.</span></h4></div><p>One accountable engineering sequence connects field execution, commissioning, monitoring and maintenance.</p></div><div class="ix-flow">${FLOW_LIFECYCLE.map((f,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><strong>${esc(f)}</strong></div>`).join('')}</div></div>
      <section class="ix-values-block" aria-labelledby="valuesTitle">
        <div class="ix-section-intro"><div><p class="ix-kicker">02 / OUR VALUES</p><h4 id="valuesTitle">Guided by <span>strong values.</span></h4></div><p>We deliver reliable solar solutions and create lasting impact through safety, quality, collaboration, customer focus and continuous improvement.</p></div>
        <div class="ix-values-grid">${values}</div>
        <div class="ix-values-strip">SAFETY <i>·</i> EXCELLENCE <i>·</i> TEAMWORK <i>·</i> CUSTOMER <i>·</i> INNOVATION</div>
      </section>
    </div>`;
}

function renderClientsPanel() {
  const cards = MAITRA_CLIENTS.map((name, i) => `
    <article class="ix-client-card">
      <span class="ix-client-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="ix-client-mark" aria-hidden="true"></span>
      <strong>${esc(name)}</strong>
    </article>`).join('');
  return `<div class="ix ix-clients">
    <div class="ix-clients-hero">
      <div><p class="ix-kicker">12 / CUSTOMER RELATIONSHIPS</p><h3>Our <span>Clients.</span></h3></div>
      <p>Trusted by organizations across solar, infrastructure, energy and commercial operations. Client names shown below are representative relationships supplied by Maitra Solar Solutions.</p>
    </div>
    <div class="ix-client-grid">${cards}</div>
    <div class="ix-client-footer"><strong>CLIENT NAMES AS PROVIDED BY MAITRA SOLAR SOLUTIONS</strong><span>Representative client relationships</span></div>
  </div>`;
}

function renderServicesPanel() {
  const rows=SERVICES.map(s=>`<article class="ix-service-row ${s.id==='om'?'featured':''}"><button class="ix-service-trigger" type="button" data-svc="${s.id}" aria-label="Open ${esc(s.name)}"><span class="ix-num">${esc(s.num)}</span><span class="ix-service-copy"><strong>${esc(s.name)}</strong><small>${esc(s.desc)}</small></span><span class="ix-service-meta"><em>${s.id==='om'?'13 SCOPES':'ENGINEERING VIEW'}</em><span>↗</span></span></button></article>`).join('');
  return `<div class="ix ix-services"><div class="ix-command-intro"><div><p class="ix-kicker">SERVICES / LEVEL 01</p><h3>Engineering<br><span>Capabilities.</span></h3></div><p>Three core capability groups connect field execution, asset care and technical assessment. Select a discipline to enter its working view.</p></div><div class="ix-service-list">${rows}</div><div class="ix-footerline"><span>SELECT / OPEN</span><span>MAITRA / ENGINEERING CAPABILITIES</span></div></div>`;
}

function renderEpcPanel() {
  const stages=EPC_STAGES.map((st,i)=>`<button class="ix-epc-stage epc-stage" type="button" data-stage="${i}" aria-expanded="false"><span class="ix-num">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(st.title)}</strong><small>${esc(st.desc)}</small></span><b>→</b></button>`).join('');
  return `<div class="ix ix-epc"><div class="ix-subnav"><button class="ix-back" type="button" data-back-panel>← Services</button><span>EPC / EPC KEEPABILITY</span><span>10 STAGES</span></div><div class="ix-command-intro"><div><p class="ix-kicker">PROJECT DELIVERY / 02.02</p><h3>Execution<br><span>Sequence.</span></h3></div><p>Every project moves through a disciplined engineering sequence from mobilization to handover, with each stage visible and accountable.</p></div><div class="ix-progress"><span>SEQUENCE PROGRESS</span><div id="epcBar"></div><strong id="epcCount">0 / ${EPC_STAGES.length} stages</strong></div><div class="ix-epc-list">${stages}</div></div>`;
}

function activateEpcStage(el) {
  const wasActive = el.classList.contains('is-live');
  $$('.epc-stage').forEach(s => {
    s.classList.remove('is-live');
    s.setAttribute('aria-expanded', 'false');
  });
  if (!wasActive) {
    el.classList.add('is-live');
    el.setAttribute('aria-expanded', 'true');
  }
  const count = $$('.epc-stage.is-live').length;
  const bar = $('#epcBar');
  const label = $('#epcCount');
  if (bar) bar.style.setProperty('--progress', (count / EPC_STAGES.length) * 100 + '%');
  if (label) label.textContent = `${count} / ${EPC_STAGES.length} stages`;
}

function renderOmPanel() {
  const items=OM_ITEMS.map((it,i)=>`<button class="ix-om-item om-item" type="button" id="om-${slugify(it.name)}" data-om-name="${esc(it.name)}" data-om-detail="${esc(it.name)}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(it.name)}</strong><em>DETAIL →</em></button>`).join('');
  return `<div class="ix ix-om"><div class="ix-subnav"><button class="ix-back" type="button" data-back-panel>← Services</button><span>O&amp;M / ASSET CARE</span><span>13 DEFINED SCOPES</span></div><div class="ix-om-hero"><div class="ix-om-copy"><p class="ix-kicker">OPERATIONS / 02.01</p><h3>Protection<br><span>after installation.</span></h3><p>O&amp;M is the parent discipline for thirteen client-defined service scopes. Select a scope to open its field detail.</p><div class="ix-stats"><span><b>13</b> scopes</span><span><b>06</b> operating steps</span><span><b>01</b> accountable team</span></div></div><div class="ix-om-media"><video autoplay muted loop playsinline preload="metadata" aria-label="Maitra Solar Solutions O&amp;M field maintenance video"><source src="assets/video/maitra-om-maintenance.mp4" type="video/mp4"></video><div></div><span>FIELD MAINTENANCE / ASSET CARE</span></div></div><div class="ix-cycle"><p class="ix-kicker">OPERATING CYCLE</p><div>${FLOW_OM.map((f,i)=>`<span><b>${String(i+1).padStart(2,'0')}</b>${esc(f)}</span>`).join('')}</div></div><div class="ix-om-list">${items}</div></div>`;
}

function openOmServiceModal(name) {
  const item = OM_ITEMS.find(it => it.name === name);
  if (!item) return;
  const gallery = OM_IMAGE_GALLERIES[name] || (OM_IMAGES[name] ? [OM_IMAGES[name]] : []);
  const image = gallery.length ? `<div class="modal-media ${gallery.length > 1 ? 'two-col' : ''}">${gallery.map((src,i)=>`<img src="${src}" alt="${esc(name)} — Maitra field imagery ${i+1}" loading="${i===0?'eager':'lazy'}">`).join('')}</div>` : '';
  const html = `
    <p class="eyebrow eyebrow-light">O&amp;M / Service Detail</p>
    <h2 class="modal-title">${esc(item.name)}</h2>
    <p class="modal-sub">Client-defined O&amp;M service scope.</p>
    ${image}
    <p>${esc(item.text)}</p>
    <div class="service-detail-meta"><span>O&amp;M</span><span>FIELD SERVICE</span><span>MAITRA</span></div>
    <div class="service-detail-actions">
      <button class="btn btn-primary" type="button" data-open="contact">Request / Discuss Service <span aria-hidden="true">→</span></button>
      <button class="btn btn-ghost-light" type="button" data-modal-back="om">← Back to O&amp;M</button>
      <button class="btn btn-ghost-light" type="button" data-close>Close</button>
    </div>`;
  openModal(html, item.name);
}

function renderDdPanel() {
  const zones=DD_ZONES.map((z,i)=>`<article class="ix-dd-zone dd-zone"><button class="ix-dd-trigger dd-zone-trigger" type="button" aria-expanded="false"><span class="ix-num">${String(i+1).padStart(2,'0')}</span><strong>${esc(z.name)}</strong><small>${esc(z.desc)}</small><b>↗</b></button><div class="dd-zone-detail"><ul>${z.detail.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div></article>`).join('');
  return `<div class="ix ix-dd"><div class="ix-subnav"><button class="ix-back" type="button" data-back-panel>← Services</button><span>DUE DILIGENCE / 02.03</span><span>TECHNICAL ASSESSMENT</span></div><div class="ix-dd-hero"><div><p class="ix-kicker">ASSESSMENT / FIELD + DATA</p><h3>See the asset<br><span>before the decision.</span></h3></div><p>Comprehensive technical, operational, structural and performance assessment designed to identify risk, clarify condition and prioritise improvement.</p></div><div class="ix-flow ix-dd-flow">${FLOW_DD.map((f,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><strong>${esc(f)}</strong></div>`).join('')}</div><div class="ix-dd-zones">${zones}</div></div>`;
}


function renderProjectsPanel() {
  return `<div class="ix ix-projects"><div class="ix-project-intro"><div><p class="ix-kicker">PROJECTS / FIELD WORK</p><h3>Real site.<br><span>Real work.</span></h3></div><p>Field imagery aligned to the work Maitra delivers. Representative reference images are labelled where applicable.</p></div><div class="ix-project-tools"><div class="gallery-filters" role="group" aria-label="Filter project gallery">${GALLERY_FILTERS.map((f,i)=>`<button class="filter-btn ${i===0?'is-active':''}" type="button" data-filter="${f.id}">${esc(f.label)}</button>`).join('')}</div><span class="gallery-count" id="galleryCount"></span></div><div class="ix-project-meta"><span>FIELD PORTFOLIO</span><span>IMAGE COLLECTIONS / SELECT TO EXPLORE</span></div><div class="gallery-grid ix-project-grid" id="panelProjectGrid"></div></div>`;
}


function renderTeamPanel() {
  const lead = TEAM[0];
  return `
    <div class="team-showcase" id="teamShowcase">
      <div class="team-blueprint" aria-hidden="true">
        <span>MAITRA / PEOPLE / 01</span>
        <span>SELECT PROFILE → VIEW RESPONSIBILITY</span>
      </div>

      <div class="team-roster-head">
        <span>TEAM SELECTOR</span>
        <span>Choose a profile</span>
      </div>
      <div class="team-roster team-roster-horizontal" role="list" aria-label="Maitra team profiles">
        ${TEAM.map((m, i) => `
          <button class="team-roster-item ${i === 0 ? 'is-active' : ''}" type="button" data-team-person="${i}" aria-pressed="${i === 0 ? 'true' : 'false'}">
            <span class="team-roster-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="team-roster-thumb ${i === 0 ? 'is-photo' : 'is-cutout'}"><img src="${m.img}" alt="" loading="${i === 0 ? 'eager' : 'lazy'}"></span>
            <span class="team-roster-copy"><strong>${esc(m.role)}</strong><small>${esc(m.stage)}</small></span>
            <span class="team-roster-arrow" aria-hidden="true">↗</span>
          </button>`).join('')}
      </div>

      <div class="team-feature team-feature-compact" id="teamFeature">
        <div class="team-feature-visual ${lead.lead ? 'is-photo' : 'is-cutout'}">
          <div class="team-feature-grid" aria-hidden="true"></div>
          <img id="teamFeatureImg" src="${lead.img}" alt="${esc(lead.role)}" loading="eager">
          <div class="team-feature-index"><span id="teamFeatureIndex">01</span><i></i><span>05</span></div>
        </div>

        <div class="team-feature-copy">
          <div class="team-feature-kicker"><span id="teamFeatureStage">${esc(lead.stage)}</span><span>ACTIVE PROFILE</span></div>
          <div class="team-feature-rule"></div>
          <h3 id="teamFeatureName">${esc(lead.role)}</h3>
          <p class="team-feature-role" id="teamFeatureRole">${esc(lead.stage)}</p>
          <p class="team-feature-desc" id="teamFeatureDesc">${esc(lead.desc)}</p>
          <div class="team-feature-focus" id="teamFeatureFocus">${lead.focus.map(item => `<span>${esc(item)}</span>`).join('')}</div>
          <div class="team-feature-signature"><span class="team-sig-line"></span><span>ONE TEAM / ONE ACCOUNTABILITY</span></div>
        </div>
      </div>

      <div class="team-showcase-note"><span></span><p>From project direction to field execution, <strong>the people stay close to the work.</strong></p></div>
    </div>`;
}

function setTeamPanelPerson(index) {
  const member = TEAM[index];
  const img = $('#teamFeatureImg');
  const frame = img?.closest('.team-feature-visual');
  const name = $('#teamFeatureName');
  const role = $('#teamFeatureRole');
  const stage = $('#teamFeatureStage');
  const desc = $('#teamFeatureDesc');
  const focus = $('#teamFeatureFocus');
  const number = $('#teamFeatureIndex');
  if (!member || !img || !frame || !name || !role || !stage || !desc || !focus || !number) return;

  img.style.opacity = '0';
  frame.classList.remove('is-photo', 'is-cutout');
  frame.classList.add(index === 0 ? 'is-photo' : 'is-cutout');
  setTimeout(() => {
    img.src = member.img;
    img.alt = member.role;
    name.textContent = member.role;
    role.textContent = member.stage;
    stage.textContent = member.stage;
    desc.textContent = member.desc;
    number.textContent = String(index + 1).padStart(2, '0');
    focus.innerHTML = member.focus.map(item => `<span>${esc(item)}</span>`).join('');
    img.style.opacity = '1';
  }, 140);

  $$('.team-roster-item', panelBody).forEach((button, i) => {
    const active = i === index;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function renderContactPanel() {
  const wa=encodeURIComponent('Hello Maitra Solar Solutions, I would like to request a consultation regarding a solar project. Please let me know how we can proceed.');
  return `<div class="ix ix-contact"><div class="ix-contact-hero"><div><p class="ix-kicker">CONTACT / DIRECT ACCESS</p><h3>Start the<br><span>conversation.</span></h3></div><p>Speak directly with Maitra's management about EPC, O&amp;M, due diligence or asset management.</p></div><div class="ix-intents" aria-label="Service shortcuts"><button type="button" data-open="epc">EPC <span aria-hidden="true">→</span></button><button type="button" data-open="om">O&amp;M <span aria-hidden="true">→</span></button><button type="button" data-open="dd">DUE DILIGENCE <span aria-hidden="true">→</span></button><button type="button" data-open-consult>ASSET MANAGEMENT <span aria-hidden="true">→</span></button></div><div class="ix-contact-actions"><a class="ix-contact-action primary" href="https://wa.me/${MAITRA_WHATSAPP_NUMBER}?text=${wa}" target="_blank" rel="noopener noreferrer"><span>01</span><strong>Request a consultation</strong><em>WHATSAPP →</em></a><a class="ix-contact-action" href="tel:+918446853660"><span>02</span><strong>Call the Maitra team</strong><em>+91 84468 53660</em></a><a class="ix-contact-action" href="mailto:maitrasolarsolutions@gmail.com"><span>03</span><strong>Email project details</strong><em>maitrasolarsolutions@gmail.com</em></a></div><div class="ix-contact-grid"><div><p class="ix-kicker">LOCATION</p><strong>Dighi, Pune, Maharashtra, India</strong><span>Service coverage: Maharashtra &amp; Pan India</span></div><div><p class="ix-kicker">MANAGEMENT</p><strong>Managing Director</strong><strong>Project &amp; Asset Manager</strong></div><div><p class="ix-kicker">RESPONSE</p><span>Direct management access for project requirements, asset questions and technical assessments.</span></div></div></div>`;
}

function renderFlowList(flow) {
  return flow.map((f,i)=>`<li style="--flow-i:${i}"><b>${String(i+1).padStart(2,'0')}</b> ${esc(f)}</li>`).join('');
}

function teamCard(m) {
  return `
    <article class="team-card">
      <div class="team-photo ${m.lead ? '' : 'is-cutout'}">
        <img src="${m.img}" alt="${esc(m.role)}" loading="lazy">
      </div>
      <div class="team-info">
        <h3 class="team-name">${esc(m.role)}</h3>
        <p class="team-role">${esc(m.stage)}</p>
      </div>
    </article>`;
}

function initLeadershipStory() {
  const featureImg = $('#leadershipFeatureImg');
  const featureName = $('#leadershipFeatureName');
  const featureRole = $('#leadershipFeatureRole');
  const featureStage = $('#leadershipFeatureStage');
  const featureDesc = $('#leadershipFeatureDesc');
  const focus = $('#leadershipFocus');
  const photoIndex = $('#leadershipPhotoIndex');
  const stages = $$('.lead-stage');
  const people = $$('.lead-person');
  if (!featureImg || !featureName || !featureRole || !focus) return;

  let activePerson = 0;

  function setPerson(index) {
    const member = TEAM[index];
    if (!member) return;
    activePerson = index;
    featureImg.src = member.img;
    const photoFrame = featureImg.closest('.leadership-feature-photo');
    if (photoFrame) photoFrame.classList.toggle('is-cutout', index !== 0);
    featureImg.alt = member.role;
    featureName.textContent = member.role;
    featureRole.textContent = member.stage;
    featureStage.textContent = member.stage;
    featureDesc.textContent = member.desc;
    photoIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(TEAM.length).padStart(2, '0')}`;
    focus.innerHTML = member.focus.map(item => `<span>${esc(item)}</span>`).join('');
    people.forEach((button, i) => button.classList.toggle('is-active', i === index));
  }

  stages.forEach((button, stageIndex) => {
    button.addEventListener('click', () => {
      stages.forEach((b, i) => b.classList.toggle('is-active', i === stageIndex));
      const personIndex = LEADERSHIP_STAGES[stageIndex]?.person ?? activePerson;
      setPerson(personIndex);
    });
  });
  people.forEach((button, index) => {
    button.addEventListener('click', () => {
      setPerson(index);
      const stageIndex = LEADERSHIP_STAGES.findIndex(stage => stage.person === index);
      if (stageIndex >= 0) stages.forEach((b, i) => b.classList.toggle('is-active', i === stageIndex));
    });
  });
  setPerson(0);
}

function initOMMaintenanceVideo() {
  const video = $('#omMaintenanceVideo');
  if (!video) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) {
    video.pause();
    return;
  }

  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'metadata';

  const playVideo = () => {
    if (!document.hidden && !reduced.matches && video.paused) video.play().catch(() => {});
  };

  if (video.readyState >= 2) playVideo();
  else video.addEventListener('canplay', playVideo, { once: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else playVideo();
  });

  reduced.addEventListener?.('change', e => {
    if (e.matches) video.pause();
    else playVideo();
  });
}

/* ------------------------------------------------------------
   9. LANDING SECTION RENDERERS
------------------------------------------------------------ */
function renderCapabilities() {
  const grid = $('#capGrid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
    <button class="cap-card" type="button" data-svc="${s.id}" data-num="${esc(s.num)}" aria-label="Open ${esc(s.name)}">
      <div class="cap-top">
        <span class="cap-num">${esc(s.num)}</span>
        <span class="cap-arrow">${icon('arrow-right')}</span>
      </div>
      ${icon(s.icon, 'cap-icon')}
      <h3 class="cap-name">${esc(s.name)}</h3>
      <p class="cap-desc">${esc(s.desc)}</p>
    </button>`).join('');
}

/* Landing-page gallery filters */
function renderFilters() {
  const wrap = $('#galleryFilters');
  if (!wrap) return;
  wrap.innerHTML = GALLERY_FILTERS.map((f, i) =>
    `<button class="filter-btn ${i === 0 ? 'is-active' : ''}" type="button" data-filter="${f.id}">${esc(f.label)}</button>`).join('');
}

function renderLifecycleFlow() {
  const wrap = $('#lifecycleFlow');
  if (!wrap) return;
  const nodes = FLOW_LIFECYCLE.map((step, i) => `
    <div class="flow-node" data-step="${i}">
      <span class="flow-label flow-tag">${String(i + 1).padStart(2, '0')}</span>
      <span class="flow-label">${esc(step)}</span>
      <span class="flow-dot"></span>
      ${i < FLOW_LIFECYCLE.length - 1 ? '<span class="flow-link"></span>' : ''}
    </div>`).join('');
  wrap.innerHTML = `<div class="flow-track">${nodes}</div>
    <div class="flow-progress" aria-hidden="true"></div>`;
}

function galleryGroups() {
  const groups = [];
  const seen = new Set();
  GALLERY.forEach((g, i) => {
    if (seen.has(g.cat)) return;
    seen.add(g.cat);
    const images = GALLERY.map((entry, idx) => ({ g: entry, i: idx })).filter(x => x.g.cat === g.cat);
    groups.push({ cat: g.cat, tag: g.tag, cover: g, images });
  });
  return groups;
}

function renderGallery(gridEl) {
  if (!gridEl) return;
  gridEl.innerHTML = galleryGroups().map((group, i) => `
    <button class="g-item gallery-project-card ${i === 0 ? 'wide' : ''}" type="button" data-cat="${group.cat}" aria-label="Open ${esc(group.tag)} gallery">
      <img src="${group.cover.src}" alt="${esc(group.cover.cap)}" loading="lazy">
      <span class="g-tag">${esc(group.tag)}</span>
      <div class="g-project-overlay">
        <div class="g-project-copy">
          <span class="g-project-count">${group.images.length} ${group.images.length === 1 ? 'image' : 'images'}</span>
          <h3>${esc(group.tag)}</h3>
          <p>${esc(group.cover.cap)}</p>
        </div>
        <span class="g-project-action">View Gallery <span aria-hidden="true">→</span></span>
      </div>
    </button>`).join('');
  $$('img', gridEl).forEach(img => {
    if (img.complete) img.classList.add('is-loaded');
    else img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
  });
}

function renderTeam() {
  const grid = $('#teamGrid');
  if (!grid) return;
  grid.innerHTML = TEAM.map(teamCard).join('');
}

/* ------------------------------------------------------------
   10. GALLERY FILTER + COUNT
------------------------------------------------------------ */
function setGalleryFilter(cat) {
  $$('.filter-btn').forEach(b => b.classList.toggle('is-active', b.getAttribute('data-filter') === cat));
  let visible = 0;
  $$('.gallery-grid').forEach(grid => {
    $$('.g-item', grid).forEach(item => {
      const show = cat === 'all' || item.getAttribute('data-cat') === cat;
      item.hidden = !show;
      if (show) visible++;
    });
  });
  $$('.gallery-count').forEach(el => { el.textContent = `${visible} ${visible === 1 ? 'collection' : 'collections'}`; });
}

/* ------------------------------------------------------------
   11. LIGHTBOX
------------------------------------------------------------ */
function currentLightboxList() {
  return lightboxList;
}

function openLightboxGroup(cat) {
  lightboxList = GALLERY.map((g, i) => ({ g, i })).filter(x => x.g.cat === cat);
  lightboxIndex = 0;
  const group = lightboxList[0]?.g;
  if (!group) return;
  if (lightboxTitle) lightboxTitle.textContent = group.tag;
  if (lightboxCount) lightboxCount.textContent = `${lightboxList.length} ${lightboxList.length === 1 ? 'image' : 'images'}`;
  showLightboxImage();
  lightboxEl.hidden = false;
  lightboxEl.setAttribute('aria-hidden', 'false');
  syncScrollLock();
  lastFocused = document.activeElement;
  $('.lightbox-close', lightboxEl).focus();
}

function showLightboxImage() {
  const entry = lightboxList[lightboxIndex];
  if (!entry) return;
  const g = entry.g;
  lightboxImg.src = g.src;
  lightboxImg.alt = g.cap;
  lightboxCaption.innerHTML = `${esc(g.cap)}`;
  if (lightboxCounter) lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxList.length}`;
  if (lightboxThumbs) {
    lightboxThumbs.innerHTML = lightboxList.map((item, idx) => `
      <button class="lightbox-thumb ${idx === lightboxIndex ? 'is-active' : ''}" type="button" data-lightbox-index="${idx}" aria-label="View image ${idx + 1}">
        <img src="${item.g.src}" alt="" loading="lazy">
      </button>`).join('');
  }
}

function closeLightbox() {
  lightboxEl.hidden = true;
  lightboxEl.setAttribute('aria-hidden', 'true');
  syncScrollLock();
  if (lastFocused) lastFocused.focus();
}

/* ------------------------------------------------------------
   12. PROJECT ASSISTANCE → WHATSAPP
   Guided one-choice-at-a-time enquiry. No AI, backend, database or typing.
------------------------------------------------------------ */
const MAITRA_WHATSAPP_NUMBER = '918446853660';
const consultState = {};
let consultStepIndex = 0;
const consultStepNames = ['topic', 'projectType', 'stage', 'capacity', 'location'];
const consultSteps = [...document.querySelectorAll('.consult-step')];
const consultProgress = [...document.querySelectorAll('.project-assist-progress span')];
const consultReview = document.querySelector('[data-review]');
const consultSummary = $('#consultSummary');

function renderConsultStep(index) {
  consultStepIndex = index;
  consultSteps.forEach((step, i) => {
    const active = i === index;
    step.hidden = !active;
    step.classList.toggle('is-active', active);
    let nav = step.querySelector('.consult-step-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'consult-step-nav';
      step.appendChild(nav);
    }
    nav.innerHTML = i > 0
      ? `<button class="consult-back-btn" type="button" data-consult-back="${i - 1}">← Back</button>`
      : '';
  });
  if (consultReview) consultReview.hidden = true;
  consultProgress.forEach((bar, i) => bar.classList.toggle('is-active', i <= index));
  $('#formNote').textContent = '';
  requestAnimationFrame(() => {
    const first = consultSteps[index]?.querySelector('.choice-button');
    if (first) first.focus();
  });
}

function renderConsultReview() {
  consultSteps.forEach(step => { step.hidden = true; step.classList.remove('is-active'); });
  if (consultReview) {
    consultReview.hidden = false;
    consultReview.classList.add('is-active');
  }
  consultProgress.forEach(bar => bar.classList.add('is-active'));
  if (consultSummary) {
    const labels = {
      topic: 'Service',
      projectType: 'Project Type',
      stage: 'Project Stage',
      capacity: 'Approx. Capacity',
      location: 'Project Location'
    };
    consultSummary.innerHTML = consultStepNames.map(key => `
      <div class="consult-summary-row">
        <span>${esc(labels[key])}</span>
        <span>${esc(consultState[key] || '')}</span>
      </div>`).join('');
  }
  requestAnimationFrame(() => $('#sendConsultWhatsapp')?.focus());
}

function resetConsult() {
  Object.keys(consultState).forEach(key => delete consultState[key]);
  renderConsultStep(0);
}

function openConsult() {
  lastFocused = document.activeElement;
  consultShell.hidden = false;
  consultShell.setAttribute('aria-hidden', 'false');
  resetConsult();
  syncScrollLock();
}

consultShell?.addEventListener('click', (e) => {
  const choice = e.target.closest('.choice-button');
  if (choice) {
    const group = choice.dataset.group;
    consultState[group] = choice.dataset.value;
    const next = consultStepIndex + 1;
    if (next < consultSteps.length) renderConsultStep(next);
    else renderConsultReview();
    return;
  }

  if (e.target.closest('#sendConsultWhatsapp')) {
    const lines = [
      'Hello Maitra Solar Solutions,',
      '',
      'I would like to discuss a solar project.',
      '',
      'PROJECT ASSISTANCE',
      `Service Required: ${consultState.topic}`,
      `Project Type: ${consultState.projectType}`,
      `Project Stage: ${consultState.stage}`,
      `Approx. Capacity: ${consultState.capacity}`,
      `Project Location: ${consultState.location}`,
      '',
      'Please contact me regarding this requirement.',
      '',
      'Sent through the Maitra Solar Solutions website.'
    ];
    const whatsappUrl = `https://wa.me/${MAITRA_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    $('#formNote').textContent = 'Opening WhatsApp with your project enquiry…';
    showToast('Preparing your project enquiry for WhatsApp…');
    window.location.href = whatsappUrl;
  }

  if (e.target.closest('[data-consult-back]')) {
    const target = Number(e.target.closest('[data-consult-back]').getAttribute('data-consult-back'));
    if (Number.isFinite(target)) {
      consultStepNames.slice(target + 1).forEach(key => delete consultState[key]);
      renderConsultStep(target);
    }
    return;
  }

  if (e.target.closest('[data-consult-review-back]')) {
    delete consultState.location;
    renderConsultStep(consultSteps.length - 1);
    return;
  }

  if (e.target.closest('#restartConsult')) resetConsult();
});

/* ------------------------------------------------------------
   13. VIDEO FALLBACK
------------------------------------------------------------ */
function initHeroVideo() {
  const hero = $('#hero');
  const video = $('.hero-video', hero);
  if (!hero || !video) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const constrained = Boolean(connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType));
  const mobile = window.matchMedia('(max-width: 700px)').matches;

  const usePoster = () => {
    hero.classList.remove('is-playing');
    hero.classList.add('is-fallback');
    video.pause();
  };

  if (prefersReduced.matches || constrained) {
    if (constrained) document.documentElement.classList.add('is-data-constrained');
    usePoster();
    return;
  }

  const src = mobile ? video.dataset.mobileSrc : video.dataset.desktopSrc;
  if (!src) {
    usePoster();
    return;
  }

  video.src = src;
  video.load();

  video.addEventListener('error', usePoster, { once: true });
  video.addEventListener('playing', () => {
    hero.classList.add('is-playing');
    hero.classList.remove('is-fallback');
  }, { once: true });

  const startPlayback = () => {
    if (document.hidden || prefersReduced.matches || document.documentElement.classList.contains('is-data-constrained')) return;
    video.play().catch(usePoster);
  };

  video.addEventListener('canplay', startPlayback, { once: true });
  startPlayback();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else if (!video.paused) {
      return;
    } else {
      startPlayback();
    }
  });

  prefersReduced.addEventListener?.('change', e => {
    if (e.matches) usePoster();
    else if (!document.documentElement.classList.contains('is-data-constrained')) startPlayback();
  });
}

/* ------------------------------------------------------------
   14. REVEAL ON SCROLL
------------------------------------------------------------ */
function initReveals() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in-view');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

function initFlowActivation() {
  const pipeline = $('#lifecycleFlow');
  if (!pipeline || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        pipeline.classList.add('is-active');
        $$('.flow-node', pipeline).forEach((n, i) => {
          setTimeout(() => n.classList.add('is-live'), i * 140);
        });
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.35 });
  io.observe(pipeline);
}



/* ------------------------------------------------------------
   15. STATE-OF-THE-ART INTERACTIONS
------------------------------------------------------------ */
const ASSET_NODE_COPY = {
  plant: { index:'01', title:'PV Field', text:'Module condition, strings, surface care and field observations become the first layer of asset understanding.' },
  power: { index:'02', title:'Power Systems', text:'Inverters, AC/DC systems, protection and HT equipment form the electrical backbone of the plant.' },
  inspection: { index:'03', title:'Inspection', text:'Visual, thermal and technical inspections help turn field observations into structured findings.' },
  monitoring: { index:'04', title:'Monitoring', text:'Signals, alarms, records and operating observations can be connected into a clearer plant view.' },
  action: { index:'05', title:'Action', text:'Maintenance, engineering response, reporting and verification close the loop between finding and outcome.' }
};

function initAssetMap() {
  const map = $('#assetMap');
  const detail = $('#assetDetail');
  if (!map || !detail) return;
  const buttons = $$('.asset-node', map);
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const key = btn.dataset.assetNode;
    const data = ASSET_NODE_COPY[key];
    if (!data) return;
    buttons.forEach(b => { const active = b === btn; b.classList.toggle('is-active', active); b.setAttribute('aria-selected', String(active)); });
    detail.querySelector('.asset-detail-index').textContent = data.index;
    detail.querySelector('strong').textContent = data.title;
    detail.querySelector('p').textContent = data.text;
  }));
}

function initInspectionLab() {
  const root = $('#inspection-lab');
  if (!root) return;
  const images = $$('.inspection-image', root);
  const readout = $('#inspectionReadout', root);
  $$('.inspection-switch button', root).forEach(btn => btn.addEventListener('click', () => {
    const mode = btn.dataset.inspectionMode;
    $$('.inspection-switch button', root).forEach(b => b.classList.toggle('is-active', b === btn));
    images.forEach(img => img.classList.toggle('is-active', img.dataset.inspectionImage === mode));
    if (readout) readout.textContent = mode === 'thermal' ? 'THERMAL / IR VIEW' : 'VISUAL / FIELD VIEW';
  }));
}

const INSIGHT_COPY = {
  om: { tag:'O&M', title:'Preventive maintenance is a system, not a single visit.', text:'A strong O&M programme links recurring inspection, measurement, documented findings, corrective work and follow-up. The objective is to make asset condition visible early enough for the team to act deliberately.' },
  thermal: { tag:'INSPECTION', title:'Thermography is a diagnostic layer.', text:'Infrared imagery can highlight abnormal temperature patterns that deserve further investigation. A thermal observation should lead to verification, documentation and an appropriate technical response—not an assumption from a single image.' },
  epc: { tag:'EPC', title:'Commissioning is the bridge into operations.', text:'Testing, punch-point closure, documentation and handover create the transition from construction activity to an operational asset. A disciplined sequence makes responsibilities and outstanding work easier to track.' },
  performance: { tag:'PERFORMANCE', title:'Data matters when it changes the next action.', text:'Monitoring becomes operationally useful when plant observations can be connected to diagnosis, prioritised maintenance, verification and reporting. That is the principle behind the performance interface shown on this page.' }
};

function openInsight(key) {
  const data = INSIGHT_COPY[key];
  if (!data) return;
  openModal(`<p class="eyebrow eyebrow-light">${esc(data.tag)}</p><h2 class="modal-title">${esc(data.title)}</h2><p class="modal-sub">Technical concept / educational content</p><p>${esc(data.text)}</p><div class="insight-modal-note"><span>MAITRA KNOWLEDGE LAYER</span><b>Designed for future technical notes and field learnings.</b></div><div style="margin-top:24px"><button class="btn btn-primary" type="button" data-close>Close</button></div>`, data.title);
}

function initInsightCards() {
  $$('.insight-card').forEach(card => card.addEventListener('click', () => openInsight(card.dataset.insight)));
}

function initPerformanceMotion() {
  const dashboard = $('.performance-dashboard');
  if (!dashboard || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { dashboard.classList.add('is-live'); io.unobserve(dashboard); }
    });
  }, { threshold: .25 });
  io.observe(dashboard);
}

function initReducedMotionClass() {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.documentElement.classList.toggle('reduce-motion', mq.matches);
  mq.addEventListener?.('change', e => document.documentElement.classList.toggle('reduce-motion', e.matches));
}

/* ------------------------------------------------------------
   16. KEYBOARD SUPPORT
------------------------------------------------------------ */
document.addEventListener('keydown', (e) => {
  trapOverlayFocus(e);
  if (e.key === 'Escape') {
    if (!mobileMenu.hidden) {
      closeMobileMenu(true);
      return;
    }
    if (!lightboxEl.hidden) closeLightbox();
    else if (!consultShell.hidden) closeModal(consultShell);
    else if (!modalShell.hidden) closeModal(modalShell);
    else if (!panelShell.hidden) closePanel();
    return;
  }
  if (!lightboxEl.hidden && e.key === 'ArrowRight') {
    lightboxIndex = (lightboxIndex + 1) % lightboxList.length;
    showLightboxImage();
    return;
  }
  if (!lightboxEl.hidden && e.key === 'ArrowLeft') {
    lightboxIndex = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
    showLightboxImage();
    return;
  }
});

$('.lightbox-next', lightboxEl).addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % lightboxList.length;
  showLightboxImage();
});
$('.lightbox-prev', lightboxEl).addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
  showLightboxImage();
});

/* ------------------------------------------------------------
   17. INIT
------------------------------------------------------------ */
function init() {
  $('#year').textContent = new Date().getFullYear();
  renderCapabilities();
  renderFilters();
  renderLifecycleFlow();
  renderGallery($('#projectGrid'));
  renderTeam();
initLeadershipStory();
initOMMaintenanceVideo();
  initHeroVideo();
  initReveals();
  initFlowActivation();
  initAssetMap();
  initInspectionLab();
  initInsightCards();
  initPerformanceMotion();
  initReducedMotionClass();
  setGalleryFilter('all');
  setNavCurrent('services');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ------------------------------------------------------------
   18. SERVICE WORKER / APP SHELL
------------------------------------------------------------ */
if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
