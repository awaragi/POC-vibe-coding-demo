const stageNames = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const sampleDeals = {
  Lead: [
    {
      clientName: 'Apex Holdings',
      title: 'ERP refresh',
      owner: 'Jordan Sales',
      value: 245000,
      closeDate: '2025-12-15',
      probability: 30,
      notes: 'Refreshing finance and supply chain stack.',
      timeline: [
        { date: '2025-10-04', text: 'Executive intro with CFO' },
        { date: '2025-10-22', text: 'Discovery workshop completed' },
        { date: '2025-11-10', text: 'Entered Lead stage' }
      ]
    },
    {
      clientName: 'Brightwell Analytics',
      title: 'Insight pilot',
      owner: 'Priya Gupta',
      value: 98000,
      closeDate: '2025-11-30',
      probability: 25,
      notes: 'AI proof of value.',
      timeline: [
        { date: '2025-09-28', text: 'AI lab tour delivered' },
        { date: '2025-10-18', text: 'Security review kicked off' },
        { date: '2025-11-05', text: 'Pilot scope agreed' }
      ]
    },
    {
      clientName: 'Northwind Retail',
      title: 'CX ideation sprint',
      owner: 'Lee Carter',
      value: 132000,
      closeDate: '2026-01-12',
      probability: 40,
      notes: 'Focus on omnichannel journey.',
      timeline: [
        { date: '2025-10-02', text: 'Design thinking prep session' },
        { date: '2025-10-21', text: 'Store tour with COO' },
        { date: '2025-11-14', text: 'Entered Lead stage' }
      ]
    }
  ],
  Qualified: [
    {
      clientName: 'Momentum Bank',
      title: 'AI controls uplift',
      owner: 'Amelia Vega',
      value: 410000,
      closeDate: '2026-02-10',
      probability: 55,
      notes: 'Risk approval pending.',
      timeline: [
        { date: '2025-09-30', text: 'Compliance stakeholder buy-in' },
        { date: '2025-10-18', text: 'Entered Qualified stage' },
        { date: '2025-11-08', text: 'Model inventory delivered' }
      ]
    },
    {
      clientName: 'Equinox Retail',
      title: 'POS uplift',
      owner: 'Ivan Flores',
      value: 155000,
      closeDate: '2026-01-20',
      probability: 45,
      notes: 'Waiting on legal review.',
      timeline: [
        { date: '2025-10-05', text: 'Store systems tour complete' },
        { date: '2025-10-25', text: 'Legal review in progress' },
        { date: '2025-11-12', text: 'Entered Qualified stage' }
      ]
    }
  ],
  Proposal: [
    {
      clientName: 'Helios Grid',
      title: 'Grid modernization',
      owner: 'Jordan Sales',
      value: 520000,
      closeDate: '2026-03-05',
      probability: 60,
      notes: 'Proposal sent 11/10.',
      timeline: [
        { date: '2025-09-15', text: 'Architecture review complete' },
        { date: '2025-10-30', text: 'Pricing approved internally' },
        { date: '2025-11-10', text: 'Proposal delivered' }
      ]
    }
  ],
  Negotiation: [
    {
      clientName: 'Liberty Health',
      title: 'Data Hub build',
      owner: 'Priya Gupta',
      value: 275000,
      closeDate: '2026-02-02',
      probability: 65,
      notes: 'Pricing review meeting next week.',
      timeline: [
        { date: '2025-10-08', text: 'Security compliance sign-off' },
        { date: '2025-10-28', text: 'Negotiation kickoff' },
        { date: '2025-11-16', text: 'Commercial review scheduled' }
      ]
    }
  ],
  'Closed Won': [
    {
      clientName: 'Continental Freight',
      title: 'TMS rollout',
      owner: 'Lee Carter',
      value: 690000,
      closeDate: '2025-12-01',
      probability: 100,
      notes: 'Signed and kicking off.',
      timeline: [
        { date: '2025-09-10', text: 'Pilot completed' },
        { date: '2025-10-02', text: 'Executive sponsor approved' },
        { date: '2025-11-04', text: 'Contract inked - Closed Won' }
      ]
    }
  ],
  'Closed Lost': []
};

let dealIdCounter = 1;
const nextDealId = () => `deal-${dealIdCounter++}`;

const pipelineData = stageNames.reduce((acc, stage) => {
  const baseDeals = sampleDeals[stage] || [];
  acc[stage] = baseDeals.map((deal) => ({
    id: nextDealId(),
    ...deal,
    stage,
    timeline: Array.isArray(deal.timeline) ? deal.timeline.map((entry) => ({ ...entry })) : []
  }));
  return acc;
}, {});

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const stageListEl = document.getElementById('stageList');
const pipelineColumnsEl = document.getElementById('pipelineColumns');
const openPanelBtn = document.querySelector('[data-action="open-form"]');
const overlayEl = document.querySelector('[data-overlay]');
const panelEl = document.querySelector('[data-panel]');
const formEl = document.getElementById('opportunityForm');
const probabilityInput = document.getElementById('probability');
const probabilityValueEl = document.getElementById('probabilityValue');
const stageSelectEl = document.getElementById('stageSelect');
const closeBtn = panelEl?.querySelector('.panel-close');
const cancelBtn = panelEl?.querySelector('[data-action="cancel"]');
const saveBtn = panelEl?.querySelector('[data-action="save"]');
const closeDateInput = document.getElementById('closeDate');
const notesInput = document.getElementById('notes');
const detailDrawer = document.querySelector('[data-detail]');
const detailClientEl = detailDrawer?.querySelector('[data-detail-client]');
const detailTitleEl = detailDrawer?.querySelector('[data-detail-title]');
const detailStageEl = detailDrawer?.querySelector('[data-detail-stage]');
const detailValueEl = detailDrawer?.querySelector('[data-detail-value]');
const detailProbabilityEl = detailDrawer?.querySelector('[data-detail-probability]');
const detailCloseEl = detailDrawer?.querySelector('[data-detail-close-date]');
const detailOwnerEl = detailDrawer?.querySelector('[data-detail-owner]');
const detailForm = document.getElementById('detailForm');
const detailStageSelect = document.getElementById('detailStage');
const detailOwnerInput = document.getElementById('detailOwner');
const detailValueInput = document.getElementById('detailValue');
const detailCloseInput = document.getElementById('detailCloseDate');
const detailProbabilityInput = document.getElementById('detailProbability');
const detailProbabilityValueEl = document.getElementById('detailProbabilityValue');
const detailNotesInput = document.getElementById('detailNotes');
const detailSaveBtn = detailForm?.querySelector('[data-detail-save]');
const detailWonBtn = detailForm?.querySelector('[data-detail-won]');
const detailLostBtn = detailForm?.querySelector('[data-detail-lost]');
const detailCloseButton = detailDrawer?.querySelector('[data-detail-dismiss]');
const detailTimelineEl = document.getElementById('detailTimeline');
const toastStack = document.querySelector('.toast-stack');

let lastFocusedElement = null;
let selectedDealId = null;
let detailInitialState = null;

const requiredFields = ['clientName', 'opportunityTitle', 'dealOwner', 'stage', 'dealValue', 'closeDate', 'probability'];
const detailRequiredFields = ['stage', 'owner', 'value', 'closeDate', 'probability'];

const fieldConfig = formEl
  ? {
      clientName: {
        input: document.getElementById('clientName'),
        errorEl: document.querySelector('[data-error="clientName"]'),
        validator: (value) => {
          const valid = value.trim().length >= 2;
          return { valid, message: 'Client name is required.' };
        }
      },
      opportunityTitle: {
        input: document.getElementById('opportunityTitle'),
        errorEl: document.querySelector('[data-error="opportunityTitle"]'),
        validator: (value) => {
          const valid = value.trim().length >= 3;
          return { valid, message: 'Provide a descriptive title.' };
        }
      },
      dealOwner: {
        input: document.getElementById('dealOwner'),
        errorEl: document.querySelector('[data-error="dealOwner"]'),
        validator: (value) => {
          const valid = value.trim().length >= 2;
          return { valid, message: 'Assign an owner.' };
        }
      },
      stage: {
        input: stageSelectEl,
        errorEl: document.querySelector('[data-error="stage"]'),
        validator: (value) => {
          const valid = stageNames.includes(value);
          return { valid, message: 'Select a valid stage.' };
        }
      },
      dealValue: {
        input: document.getElementById('dealValue'),
        errorEl: document.querySelector('[data-error="dealValue"]'),
        validator: (value) => {
          const num = Number(value);
          const valid = !Number.isNaN(num) && num > 0;
          return { valid, message: 'Enter a positive value.' };
        }
      },
      closeDate: {
        input: closeDateInput,
        errorEl: document.querySelector('[data-error="closeDate"]'),
        validator: (value) => {
          if (!value) return { valid: false, message: 'Close date is required.' };
          const selected = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          selected.setHours(0, 0, 0, 0);
          const valid = selected >= today;
          return { valid, message: 'Date cannot be in the past.' };
        }
      },
      probability: {
        input: probabilityInput,
        errorEl: document.querySelector('[data-error="probability"]'),
        validator: (value) => {
          const num = Number(value);
          const valid = !Number.isNaN(num) && num >= 0 && num <= 100;
          return { valid, message: 'Probability must be 0-100%.' };
        }
      }
    }
  : {};

const detailFieldConfig = detailForm
  ? {
      stage: {
        input: detailStageSelect,
        errorEl: document.querySelector('[data-detail-error="stage"]'),
        validator: (value) => {
          const valid = stageNames.includes(value);
          return { valid, message: 'Choose a valid stage.' };
        }
      },
      owner: {
        input: detailOwnerInput,
        errorEl: document.querySelector('[data-detail-error="owner"]'),
        validator: (value) => {
          const valid = value.trim().length >= 2;
          return { valid, message: 'Owner is required.' };
        }
      },
      value: {
        input: detailValueInput,
        errorEl: document.querySelector('[data-detail-error="value"]'),
        validator: (value) => {
          const num = Number(value);
          const valid = !Number.isNaN(num) && num > 0;
          return { valid, message: 'Enter a positive amount.' };
        }
      },
      closeDate: {
        input: detailCloseInput,
        errorEl: document.querySelector('[data-detail-error="closeDate"]'),
        validator: (value) => {
          if (!value) return { valid: false, message: 'Close date is required.' };
          const selected = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          selected.setHours(0, 0, 0, 0);
          const valid = selected >= today;
          return { valid, message: 'Date cannot be in the past.' };
        }
      },
      probability: {
        input: detailProbabilityInput,
        errorEl: document.querySelector('[data-detail-error="probability"]'),
        validator: (value) => {
          const num = Number(value);
          const valid = !Number.isNaN(num) && num >= 0 && num <= 100;
          return { valid, message: 'Probability must be 0-100%.' };
        }
      }
    }
  : {};

function describeDate(dateString) {
  if (!dateString) return 'TBD';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'TBD';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function describeFullDate(dateString) {
  if (!dateString) return 'TBD';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'TBD';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function timelineDate(dateString) {
  if (!dateString) return 'TBD';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'TBD';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function showOverlay() {
  if (!overlayEl) return;
  overlayEl.hidden = false;
  requestAnimationFrame(() => overlayEl.classList.add('is-visible'));
}

function hideOverlay() {
  if (!overlayEl) return;
  overlayEl.classList.remove('is-visible');
  setTimeout(() => {
    if (!panelEl?.classList.contains('is-open') && !detailDrawer?.classList.contains('is-open')) {
      overlayEl.hidden = true;
    }
  }, 250);
}

function lockBody() {
  document.body.classList.add('body-locked');
}

function unlockBodyIfNeeded() {
  if (!panelEl?.classList.contains('is-open') && !detailDrawer?.classList.contains('is-open')) {
    document.body.classList.remove('body-locked');
  }
}

function renderStages() {
  if (!stageListEl) return;
  stageListEl.innerHTML = stageNames
    .map((stage) => {
      const count = pipelineData[stage]?.length || 0;
      return `
        <li class="stage-item">
          <div>
            <strong>${stage}</strong>
          </div>
          <span class="stage-count">${count}</span>
        </li>
      `;
    })
    .join('');
}

function renderDealCard(deal) {
  const client = escapeHtml(deal.clientName || 'Unnamed client');
  const title = escapeHtml(deal.title);
  const owner = escapeHtml(deal.owner);
  const notes = deal.notes ? `<p class="notes">${escapeHtml(deal.notes)}</p>` : '';
  const selectedClass = selectedDealId === deal.id ? ' is-selected' : '';
  return `
    <article class="card${selectedClass}" tabindex="0" data-deal-id="${deal.id}" data-stage="${deal.stage}">
      <div class="card-header">
        <p class="client">${client}</p>
        <span class="probability-pill">${deal.probability ?? 0}%</span>
      </div>
      <h4>${title}</h4>
      <div class="meta">
        <span>${owner}</span>
        <span>${describeDate(deal.closeDate)}</span>
      </div>
      <p class="value">${currency.format(deal.value || 0)}</p>
      ${notes}
    </article>
  `;
}

function renderPipeline() {
  if (!pipelineColumnsEl) return;
  pipelineColumnsEl.innerHTML = stageNames
    .map((stage) => {
      const deals = pipelineData[stage] || [];
      const cards = deals.length
        ? deals.map((deal) => renderDealCard(deal)).join('')
        : '<div class="empty-state">No opportunities yet. Click “+ New Opportunity” to add your first deal.</div>';

      return `
        <div class="pipeline-column">
          <header>
            <h3>${stage}</h3>
            <span>${deals.length} deals</span>
          </header>
          ${cards}
        </div>
      `;
    })
    .join('');
}

function syncSelectedCardHighlight() {
  document.querySelectorAll('.card.is-selected').forEach((el) => el.classList.remove('is-selected'));
  if (!selectedDealId) return;
  const card = document.querySelector(`.card[data-deal-id="${selectedDealId}"]`);
  if (card) card.classList.add('is-selected');
}

function hydrateStageOptions() {
  const options = stageNames.map((stage) => `<option value="${stage}">${stage}</option>`).join('');
  if (stageSelectEl) stageSelectEl.innerHTML = options;
  if (detailStageSelect) detailStageSelect.innerHTML = options;
}

function getTodayString() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${today.getFullYear()}-${month}-${day}`;
}

function setCloseDateMin() {
  const min = getTodayString();
  if (closeDateInput) closeDateInput.min = min;
  if (detailCloseInput) detailCloseInput.min = min;
}

function resetForm() {
  if (!formEl) return;
  formEl.reset();
  if (stageSelectEl) stageSelectEl.value = stageNames[0];
  if (probabilityInput) probabilityInput.value = 50;
  if (probabilityValueEl) probabilityValueEl.textContent = '50%';
  Object.values(fieldConfig).forEach(({ input, errorEl }) => {
    input.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  });
  setCloseDateMin();
  updateSaveState();
}

function openPanel() {
  if (!panelEl || !overlayEl) return;
  if (detailDrawer?.classList.contains('is-open')) {
    closeDetailDrawer({ skipFocusRestore: true });
  }
  lastFocusedElement = document.activeElement;
  resetForm();
  showOverlay();
  panelEl.classList.add('is-open');
  panelEl.setAttribute('aria-hidden', 'false');
  lockBody();
  setTimeout(() => fieldConfig?.clientName?.input?.focus(), 150);
}

function closePanel({ skipFocusRestore = false } = {}) {
  if (!panelEl || !panelEl.classList.contains('is-open')) return;
  panelEl.classList.remove('is-open');
  panelEl.setAttribute('aria-hidden', 'true');
  hideOverlay();
  setTimeout(() => {
    if (!skipFocusRestore && lastFocusedElement) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
    unlockBodyIfNeeded();
  }, 250);
}

function validateField(key, showFeedback = false) {
  const config = fieldConfig[key];
  if (!config) return true;
  const { input, errorEl, validator } = config;
  const { valid, message } = validator(input.value);
  const shouldShow = showFeedback || (errorEl && errorEl.textContent.length > 0);

  if (valid) {
    input.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  } else if (shouldShow && errorEl) {
    errorEl.textContent = message;
    input.classList.add('invalid');
  }
  return valid;
}

function updateSaveState() {
  if (!saveBtn) return;
  const allValid = requiredFields.every((key) => validateField(key, false));
  saveBtn.disabled = !allValid;
}

function gatherFormData() {
  return {
    clientName: fieldConfig.clientName.input.value.trim(),
    title: fieldConfig.opportunityTitle.input.value.trim(),
    owner: fieldConfig.dealOwner.input.value.trim(),
    stage: fieldConfig.stage.input.value,
    value: Number(fieldConfig.dealValue.input.value),
    closeDate: fieldConfig.closeDate.input.value,
    probability: Number(fieldConfig.probability.input.value),
    notes: notesInput?.value.trim() || ''
  };
}

function addTimelineEntry(deal, text) {
  if (!deal.timeline) deal.timeline = [];
  deal.timeline.unshift({ date: getTodayString(), text });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const isValid = requiredFields.every((key) => validateField(key, true));
  if (!isValid) {
    updateSaveState();
    return;
  }

  const formData = gatherFormData();
  const deal = {
    id: nextDealId(),
    ...formData,
    timeline: [{ date: getTodayString(), text: 'Opportunity created' }]
  };
  pipelineData[deal.stage] = [deal, ...(pipelineData[deal.stage] || [])];
  renderStages();
  renderPipeline();
  syncSelectedCardHighlight();
  closePanel();
  showToast(`${deal.title} added to ${deal.stage}.`, 'Opportunity created');
}

function showToast(message, title = 'Opportunity saved') {
  if (!toastStack) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  const heading = document.createElement('strong');
  heading.textContent = title;
  const body = document.createElement('p');
  body.textContent = message;
  toast.append(heading, body);
  toastStack.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function trapFocus(event, container) {
  if (event.key !== 'Tab') return;
  const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const focusable = container.querySelectorAll(focusableSelectors);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  }
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    if (panelEl?.classList.contains('is-open')) {
      closePanel();
      return;
    }
    if (detailDrawer?.classList.contains('is-open')) {
      closeDetailDrawer();
      return;
    }
  }

  if (panelEl?.classList.contains('is-open')) {
    trapFocus(event, panelEl);
  } else if (detailDrawer?.classList.contains('is-open')) {
    trapFocus(event, detailDrawer);
  }
}

function handleInput(event) {
  const name = event.target.name;
  if (name && fieldConfig[name]) {
    validateField(name, false);
    updateSaveState();
  }
  if (event.target === probabilityInput) {
    probabilityValueEl.textContent = `${event.target.value}%`;
  }
}

function getDealById(id) {
  for (const stage of stageNames) {
    const list = pipelineData[stage] || [];
    const match = list.find((deal) => deal.id === id);
    if (match) return match;
  }
  return null;
}

function populateDetailView(deal) {
  if (!detailDrawer || !detailForm) return;
  detailClientEl.textContent = deal.clientName;
  detailTitleEl.textContent = deal.title;
  detailStageEl.textContent = deal.stage;
  detailValueEl.textContent = currency.format(deal.value || 0);
  detailProbabilityEl.textContent = `${deal.probability ?? 0}%`;
  detailCloseEl.textContent = describeFullDate(deal.closeDate);
  detailOwnerEl.textContent = deal.owner;

  detailStageSelect.value = deal.stage;
  detailOwnerInput.value = deal.owner;
  detailValueInput.value = deal.value ?? '';
  detailCloseInput.value = deal.closeDate || '';
  detailProbabilityInput.value = Number.isFinite(deal.probability) ? deal.probability : 0;
  detailProbabilityValueEl.textContent = `${detailProbabilityInput.value}%`;
  detailNotesInput.value = deal.notes || '';

  Object.values(detailFieldConfig).forEach(({ input, errorEl }) => {
    input.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  });

  renderTimeline(deal);
  detailInitialState = captureDetailState(deal);
  updateDetailSaveState();
}

function captureDetailState(deal) {
  return {
    stage: deal.stage,
    owner: deal.owner,
    value: String(deal.value),
    closeDate: deal.closeDate || '',
    probability: String(deal.probability ?? 0),
    notes: deal.notes || ''
  };
}

function renderTimeline(deal) {
  if (!detailTimelineEl) return;
  if (!deal.timeline || deal.timeline.length === 0) {
    detailTimelineEl.innerHTML = '<li class="timeline-empty">No activity logged yet.</li>';
    return;
  }

  detailTimelineEl.innerHTML = deal.timeline
    .slice(0, 5)
    .map(
      (entry) => `
        <li class="timeline-item">
          <span class="timeline-dot"></span>
          <div>
            <time>${timelineDate(entry.date)}</time>
            <p>${escapeHtml(entry.text)}</p>
          </div>
        </li>
      `
    )
    .join('');
}

function validateDetailField(key, showFeedback = false) {
  const config = detailFieldConfig[key];
  if (!config) return true;
  const { input, errorEl, validator } = config;
  const { valid, message } = validator(input.value);
  const shouldShow = showFeedback || (errorEl && errorEl.textContent.length > 0);

  if (valid) {
    input.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  } else if (shouldShow && errorEl) {
    errorEl.textContent = message;
    input.classList.add('invalid');
  }
  return valid;
}

function hasDetailChanges() {
  if (!detailInitialState) return false;
  const current = {
    stage: detailStageSelect.value,
    owner: detailOwnerInput.value.trim(),
    value: String(detailValueInput.value),
    closeDate: detailCloseInput.value,
    probability: String(detailProbabilityInput.value),
    notes: detailNotesInput.value.trim()
  };

  return (
    current.stage !== detailInitialState.stage ||
    current.owner !== detailInitialState.owner ||
    current.value !== detailInitialState.value ||
    current.closeDate !== detailInitialState.closeDate ||
    current.probability !== detailInitialState.probability ||
    current.notes !== detailInitialState.notes
  );
}

function updateDetailSaveState() {
  if (!detailSaveBtn) return;
  const valid = detailRequiredFields.every((key) => validateDetailField(key, false));
  detailSaveBtn.disabled = !(valid && hasDetailChanges());
}

function collectDetailFormData() {
  return {
    stage: detailStageSelect.value,
    owner: detailOwnerInput.value.trim(),
    value: Number(detailValueInput.value),
    closeDate: detailCloseInput.value,
    probability: Number(detailProbabilityInput.value),
    notes: detailNotesInput.value.trim()
  };
}

function moveDealToStage(deal, nextStage) {
  if (deal.stage === nextStage) return;
  const currentStage = deal.stage;
  pipelineData[currentStage] = (pipelineData[currentStage] || []).filter((item) => item.id !== deal.id);
  deal.stage = nextStage;
  pipelineData[nextStage] = pipelineData[nextStage] || [];
  pipelineData[nextStage].unshift(deal);
}

function handleDetailSubmit(event) {
  event.preventDefault();
  if (!selectedDealId) return;
  const isValid = detailRequiredFields.every((key) => validateDetailField(key, true));
  if (!isValid) {
    updateDetailSaveState();
    return;
  }

  const deal = getDealById(selectedDealId);
  if (!deal) return;
  const updates = collectDetailFormData();
  const stageChanged = updates.stage !== deal.stage;

  deal.owner = updates.owner;
  deal.value = updates.value;
  deal.closeDate = updates.closeDate;
  deal.probability = updates.probability;
  deal.notes = updates.notes;

  if (stageChanged) {
    moveDealToStage(deal, updates.stage);
    addTimelineEntry(deal, `Stage updated to ${updates.stage}`);
  } else {
    addTimelineEntry(deal, 'Deal details updated');
  }

  renderStages();
  renderPipeline();
  syncSelectedCardHighlight();
  populateDetailView(deal);
  showToast(`${deal.title} updated.`, 'Deal updated');
}

function openDetailDrawer(dealId, triggerElement) {
  if (!detailDrawer || !overlayEl) return;
  if (panelEl?.classList.contains('is-open')) {
    closePanel({ skipFocusRestore: true });
  }
  const deal = getDealById(dealId);
  if (!deal) return;
  selectedDealId = dealId;
  lastFocusedElement = triggerElement || document.activeElement;
  syncSelectedCardHighlight();
  populateDetailView(deal);
  showOverlay();
  detailDrawer.classList.add('is-open');
  detailDrawer.setAttribute('aria-hidden', 'false');
  lockBody();
  setTimeout(() => detailStageSelect?.focus(), 100);
}

function closeDetailDrawer({ skipFocusRestore = false } = {}) {
  if (!detailDrawer || !detailDrawer.classList.contains('is-open')) return;
  detailDrawer.classList.remove('is-open');
  detailDrawer.setAttribute('aria-hidden', 'true');
  selectedDealId = null;
  syncSelectedCardHighlight();
  hideOverlay();
  setTimeout(() => {
    if (!skipFocusRestore && lastFocusedElement) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
    unlockBodyIfNeeded();
  }, 250);
}

function handleCardClick(event) {
  const card = event.target.closest('.card');
  if (!card || !pipelineColumnsEl.contains(card)) return;
  const dealId = card.dataset.dealId;
  if (!dealId) return;
  openDetailDrawer(dealId, card);
}

function handleCardKeydown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const card = event.target.closest('.card');
  if (!card) return;
  event.preventDefault();
  const dealId = card.dataset.dealId;
  if (dealId) openDetailDrawer(dealId, card);
}

function markDeal(stageTarget) {
  if (!selectedDealId) return;
  const deal = getDealById(selectedDealId);
  if (!deal) return;
  moveDealToStage(deal, stageTarget);
  deal.probability = stageTarget === 'Closed Won' ? 100 : 0;
  addTimelineEntry(deal, `Marked ${stageTarget}`);
  renderStages();
  renderPipeline();
  syncSelectedCardHighlight();
  populateDetailView(deal);
  showToast(`${deal.title} moved to ${stageTarget}.`, 'Stage updated');
}

function handleDetailInput(event) {
  const name = event.target.name;
  if (name && detailFieldConfig[name]) {
    validateDetailField(name, false);
    updateDetailSaveState();
  }
  if (event.target === detailProbabilityInput) {
    detailProbabilityValueEl.textContent = `${detailProbabilityInput.value}%`;
  }
}

function handleOverlayClick() {
  if (detailDrawer?.classList.contains('is-open')) {
    closeDetailDrawer();
  } else if (panelEl?.classList.contains('is-open')) {
    closePanel();
  }
}

renderStages();
renderPipeline();
syncSelectedCardHighlight();
hydrateStageOptions();
setCloseDateMin();

openPanelBtn?.addEventListener('click', openPanel);
overlayEl?.addEventListener('click', handleOverlayClick);
closeBtn?.addEventListener('click', () => closePanel());
cancelBtn?.addEventListener('click', () => closePanel());
detailCloseButton?.addEventListener('click', () => closeDetailDrawer());
detailWonBtn?.addEventListener('click', () => markDeal('Closed Won'));
detailLostBtn?.addEventListener('click', () => markDeal('Closed Lost'));
pipelineColumnsEl?.addEventListener('click', handleCardClick);
pipelineColumnsEl?.addEventListener('keydown', handleCardKeydown);
document.addEventListener('keydown', handleKeyDown);
formEl?.addEventListener('input', handleInput);
formEl?.addEventListener('change', handleInput);
formEl?.addEventListener('submit', handleFormSubmit);
detailForm?.addEventListener('input', handleDetailInput);
detailForm?.addEventListener('change', handleDetailInput);
detailForm?.addEventListener('submit', handleDetailSubmit);
