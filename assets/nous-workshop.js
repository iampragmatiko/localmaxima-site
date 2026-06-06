const manifesto = 'Build in public. Keep the receipt. Desire becomes system. Taste is compression. Agents need boundaries. The work is the workshop. Make the thought real. No fake autonomy. Feedback becomes revision. The human approves the irreversible step.';
const STORAGE_KEY = 'nous.desireProtocol.v1';
const INTENT_KEY = 'nous.purchaseIntent.v1';
const FEEDBACK_KEY = 'nous.desireProtocol.feedback.v1';

function writeBackdrop() {
  const node = document.querySelector('[data-backdrop]');
  if (!node) return;
  node.innerHTML = Array.from({ length: 17 }, () => `<p>${manifesto}</p>`).join('');
}

function dollars(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function buildIntent(data, reviewed = false) {
  const item = 220;
  const shipping = 8;
  const tax = 18.15;
  const total = item + shipping + tax;
  const max = Number(data.budget || 275);
  return {
    object: 'PurchaseIntent',
    version: '0.1',
    created_by: 'NOUS Workshop',
    created_at: new Date().toISOString(),
    merchant: 'Nike',
    item: 'Vomero Premium',
    style: 'HQ2050-300',
    variant: 'Barely Green / Black / Metallic Silver',
    selected_size: 'W8 / M6.5',
    estimate: { item, shipping, tax, total, currency: 'USD' },
    constitution: data,
    guardrails: {
      under_budget: total <= max,
      return_policy_required: true,
      final_sale_allowed: false,
      cart_diff_required_before_payment: true,
      current_human_approval_required: true,
      reviewed_by_human_now: reviewed
    },
    status: reviewed && total <= max ? 'approval_packet_ready' : 'blocked'
  };
}

function renderJson(node, value) {
  if (!node) return;
  node.textContent = JSON.stringify(value, null, 2);
}

function initDesireProtocol() {
  const form = document.querySelector('[data-proto-form]');
  if (!form) return;

  const state = document.querySelector('[data-save-state]');
  const budget = form.querySelector('[name="budget"]');
  const totalNode = document.querySelector('[data-total]');
  const verdict = document.querySelector('[data-verdict]');
  const packet = document.querySelector('[data-packet]');
  const reviewed = document.querySelector('[data-reviewed]');
  const makePacket = document.querySelector('[data-make-packet]');
  const copyPacket = document.querySelector('[data-copy-packet]');
  const exportPacket = document.querySelector('[data-export-packet]');
  const loadedFlag = document.querySelector('[data-loaded-flag]');
  const total = 220 + 8 + 18.15;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      for (const [key, value] of Object.entries(data)) {
        if (form.elements[key]) form.elements[key].value = value;
      }
      state.textContent = 'LOADED';
      state.classList.add('saved');
      if (loadedFlag) loadedFlag.textContent = 'Saved maximums loaded from this browser.';
    } catch (_) {}
  }

  function currentIntent() {
    return buildIntent(formData(form), Boolean(reviewed?.checked));
  }

  function updateTotal() {
    const ceiling = Number(budget.value || 275);
    totalNode.textContent = dollars(total);
    const ok = total <= ceiling;
    verdict.textContent = ok ? '✓ Under max' : '✕ Over max';
    verdict.classList.toggle('pass', ok);
    verdict.classList.toggle('fail', !ok);
    if (makePacket) makePacket.disabled = !(ok && reviewed?.checked);
    renderJson(packet, currentIntent());
  }

  function markDraft() {
    state.textContent = 'DRAFT';
    state.classList.remove('saved');
    if (loadedFlag) loadedFlag.textContent = 'Unsaved edits. Tiny chaos, contained.';
    updateTotal();
  }

  form.addEventListener('input', markDraft);
  reviewed?.addEventListener('change', updateTotal);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = formData(form);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    state.textContent = 'SAVED';
    state.classList.add('saved');
    if (loadedFlag) loadedFlag.textContent = 'Maximums saved locally. Preference persisted. Spend still locked.';
    updateTotal();
  });

  document.querySelector('[data-reset]')?.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(INTENT_KEY);
    form.reset();
    if (reviewed) reviewed.checked = false;
    state.textContent = 'DRAFT';
    state.classList.remove('saved');
    if (loadedFlag) loadedFlag.textContent = 'Reset to defaults.';
    updateTotal();
  });

  makePacket?.addEventListener('click', () => {
    const intent = currentIntent();
    localStorage.setItem(INTENT_KEY, JSON.stringify(intent));
    renderJson(packet, intent);
    if (loadedFlag) loadedFlag.textContent = 'Approval packet created. Still not a purchase.';
  });

  copyPacket?.addEventListener('click', async () => {
    const intentText = JSON.stringify(currentIntent(), null, 2);
    try {
      await navigator.clipboard.writeText(intentText);
      if (loadedFlag) loadedFlag.textContent = 'Approval packet copied.';
    } catch (_) {
      if (loadedFlag) loadedFlag.textContent = 'Copy blocked by browser. Select the packet manually.';
    }
  });

  exportPacket?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(currentIntent(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'desire-protocol-purchase-intent.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  updateTotal();
}

function initFeedbackReceipt() {
  const form = document.querySelector('[data-feedback-form]');
  if (!form) return;

  const textarea = form.elements.feedback;
  const state = document.querySelector('[data-feedback-state]');
  const saved = localStorage.getItem(FEEDBACK_KEY);

  if (saved) {
    textarea.value = saved;
    if (state) state.textContent = 'Loaded local feedback receipt from this browser.';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem(FEEDBACK_KEY, textarea.value.trim());
    if (state) state.textContent = 'Saved locally. Paste this note into chat when Andrea wants Nous to revise the page.';
  });

  document.querySelector('[data-feedback-clear]')?.addEventListener('click', () => {
    localStorage.removeItem(FEEDBACK_KEY);
    textarea.value = '';
    if (state) state.textContent = 'Cleared local scratchpad. The durable receipt remains the page iteration log.';
  });
}

writeBackdrop();
initDesireProtocol();
initFeedbackReceipt();
