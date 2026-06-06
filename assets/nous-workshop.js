const manifesto = 'Build in public. Keep the receipt. Desire becomes system. Taste is compression. Agents need boundaries. The work is the workshop. Make the thought real. No fake autonomy. Feedback becomes revision. The human approves the irreversible step.';
const STORAGE_KEY = 'nous.desireProtocol.v1';
const INTENT_KEY = 'nous.purchaseIntent.v1';
const FEEDBACK_KEY = 'nous.desireProtocol.feedback.v1';
const PRODUCT_KEY = 'nous.desireProtocol.product.v1';

const defaultProduct = {
  merchant: 'Nike',
  item: 'Vomero Premium',
  style: 'HQ2050-300',
  variant: 'Barely Green / Black / Metallic Silver',
  selected_size: 'W8 / M6.5',
  url: 'https://www.nike.com/t/vomero-premium',
  stock: 'Parsed from page text · cart still unverified',
  return_policy: 'Standard return window · not final sale',
  final_sale: false,
  estimate: { item: 220, shipping: 8, tax: 18.15, total: 246.15, currency: 'USD' },
  checked_at: 'Browser local parse'
};

const badCartText = `Nike Vomero Premium
Style HQ2050-300
Barely Green / Black / Metallic Silver
Women 8 / Men 6.5
Price $320.00
Shipping $34.00 rush delivery
Estimated tax $26.40
FINAL SALE. No returns.
Warranty subscription added at checkout.
https://www.nike.com/t/vomero-premium`;

function writeBackdrop() {
  const node = document.querySelector('[data-backdrop]');
  if (!node) return;
  node.innerHTML = Array.from({ length: 17 }, () => `<p>${manifesto}</p>`).join('');
}

function dollars(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function moneyAfter(label, text, fallback = 0) {
  const match = text.match(new RegExp(`${label}[^$\\n]*\\$([0-9]+(?:\\.[0-9]{1,2})?)`, 'i'));
  return match ? Number(match[1]) : fallback;
}

function parseProductText(raw) {
  const text = raw.trim();
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const firstLine = lines[0] || 'Unknown product';
  const merchant = /nike/i.test(text) ? 'Nike' : firstLine.split(/\s+/)[0] || 'Merchant';
  const item = firstLine.replace(/^Nike\s+/i, '') || 'Product';
  const style = text.match(/style\s+([A-Z0-9-]+)/i)?.[1] || 'unknown';
  const price = moneyAfter('price', text, defaultProduct.estimate.item);
  const shipping = moneyAfter('shipping', text, 0);
  const tax = moneyAfter('tax|estimated tax', text, 0);
  const total = Number((price + shipping + tax).toFixed(2));
  const url = text.match(/https?:\/\/\S+/i)?.[0] || '';
  const noReturns = /no returns/i.test(text);
  const finalSale = /final sale/i.test(text) && !/not final sale/i.test(text);
  const subscription = /subscription|auto.?renew|membership/i.test(text);
  const rush = /rush|express|overnight/i.test(text);
  const variant = lines.find((line) => /green|black|silver|red|bone|white|blue|metallic/i.test(line)) || 'Variant parsed from page text';
  const selectedSize = lines.find((line) => /(women|men|size|W\d|M\d)/i.test(line)) || 'Size not found';
  return {
    merchant,
    item,
    style,
    variant,
    selected_size: selectedSize.replace(/^size\s*/i, ''),
    url,
    stock: 'Parsed from page text · cart still unverified',
    return_policy: finalSale ? 'Final sale / no returns detected' : 'Standard return window · not final sale',
    final_sale: finalSale,
    risk_flags: [
      finalSale || noReturns ? 'final_sale_detected' : null,
      subscription ? 'subscription_language_detected' : null,
      rush ? 'rush_shipping_detected' : null,
      total > 0 ? null : 'price_missing'
    ].filter(Boolean),
    estimate: { item: price, shipping, tax, total, currency: 'USD' },
    checked_at: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  };
}

function buildIntent(data, product = defaultProduct, reviewed = false) {
  const max = Number(data.budget || 275);
  const hardStops = String(data.hardStops || '').toLowerCase();
  const riskFlags = new Set(product.risk_flags || []);
  if (product.final_sale && hardStops.includes('final sale')) riskFlags.add('blocked_by_final_sale_rule');
  if (product.estimate.total > max) riskFlags.add('over_budget');
  return {
    object: 'PurchaseIntent',
    version: '0.2',
    created_by: 'NOUS Workshop',
    created_at: new Date().toISOString(),
    merchant: product.merchant,
    item: product.item,
    style: product.style,
    variant: product.variant,
    selected_size: product.selected_size,
    source_url: product.url,
    estimate: product.estimate,
    constitution: data,
    parsed_risk_flags: [...riskFlags],
    guardrails: {
      under_budget: product.estimate.total <= max,
      return_policy_required: true,
      final_sale_allowed: false,
      cart_diff_required_before_payment: true,
      current_human_approval_required: true,
      reviewed_by_human_now: reviewed
    },
    status: reviewed && product.estimate.total <= max && riskFlags.size === 0 ? 'approval_packet_ready' : 'blocked'
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
  const breakdown = document.querySelector('[data-breakdown]');
  const verdict = document.querySelector('[data-verdict]');
  const packet = document.querySelector('[data-packet]');
  const reviewed = document.querySelector('[data-reviewed]');
  const makePacket = document.querySelector('[data-make-packet]');
  const copyPacket = document.querySelector('[data-copy-packet]');
  const exportPacket = document.querySelector('[data-export-packet]');
  const loadedFlag = document.querySelector('[data-loaded-flag]');
  const productSource = document.querySelector('[data-product-source]');
  const parseButton = document.querySelector('[data-parse-product]');
  const riskDemo = document.querySelector('[data-risk-demo]');
  const parseResult = document.querySelector('[data-parse-result]');
  let product = defaultProduct;

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

  const savedProduct = localStorage.getItem(PRODUCT_KEY);
  if (savedProduct) {
    try { product = JSON.parse(savedProduct); } catch (_) {}
  }

  function currentIntent() {
    return buildIntent(formData(form), product, Boolean(reviewed?.checked));
  }

  function renderProduct() {
    document.querySelector('[data-item-title]').textContent = `${product.merchant} · ${product.item}`;
    document.querySelector('[data-style]').textContent = product.style;
    document.querySelector('[data-variant]').textContent = product.variant;
    document.querySelector('[data-size]').textContent = product.selected_size;
    document.querySelector('[data-stock]').textContent = product.stock;
    document.querySelector('[data-returns]').textContent = product.return_policy;
    document.querySelector('[data-checked]').textContent = product.checked_at;
    totalNode.textContent = dollars(product.estimate.total);
    breakdown.textContent = `Item ${dollars(product.estimate.item)} · shipping ${dollars(product.estimate.shipping)} · tax ${dollars(product.estimate.tax)}`;
  }

  function updateTotal() {
    const ceiling = Number(budget.value || 275);
    const intent = currentIntent();
    const ok = intent.guardrails.under_budget && intent.parsed_risk_flags.length === 0;
    verdict.textContent = ok ? '✓ Clean intent' : '✕ Blocked';
    verdict.classList.toggle('pass', ok);
    verdict.classList.toggle('fail', !ok);
    if (makePacket) makePacket.disabled = !(ok && reviewed?.checked);
    renderProduct();
    renderJson(packet, intent);
  }

  function parseCurrentProduct() {
    product = parseProductText(productSource.value);
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(product));
    if (reviewed) reviewed.checked = false;
    const flags = product.risk_flags?.length ? `Blocked signals: ${product.risk_flags.join(', ')}.` : 'No obvious hard stops detected.';
    parseResult.textContent = `Parsed ${product.merchant} / ${product.item}. Total ${dollars(product.estimate.total)}. ${flags}`;
    updateTotal();
  }

  function markDraft() {
    state.textContent = 'DRAFT';
    state.classList.remove('saved');
    if (loadedFlag) loadedFlag.textContent = 'Unsaved edits. Tiny chaos, contained.';
    updateTotal();
  }

  form.addEventListener('input', markDraft);
  reviewed?.addEventListener('change', updateTotal);
  parseButton?.addEventListener('click', parseCurrentProduct);
  riskDemo?.addEventListener('click', () => {
    productSource.value = badCartText;
    parseCurrentProduct();
  });

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
    localStorage.removeItem(PRODUCT_KEY);
    form.reset();
    product = defaultProduct;
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
