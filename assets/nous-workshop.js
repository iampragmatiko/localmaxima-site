const manifesto = 'Build in public. Keep the receipt. Desire becomes system. Taste is compression. Agents need boundaries. The work is the workshop. Make the thought real. No fog machines. No fake autonomy. The human approves the irreversible step.';

function writeBackdrop() {
  const node = document.querySelector('[data-backdrop]');
  if (!node) return;
  node.innerHTML = Array.from({ length: 17 }, () => `<p>${manifesto}</p>`).join('');
}

function dollars(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));
}

function initDesireProtocol() {
  const form = document.querySelector('[data-proto-form]');
  if (!form) return;
  const state = document.querySelector('[data-save-state]');
  const budget = document.querySelector('[name="budget"]');
  const totalNode = document.querySelector('[data-total]');
  const verdict = document.querySelector('[data-verdict]');
  const total = 220 + 8 + 18.15;

  function markDraft() {
    state.textContent = 'DRAFT';
    state.classList.remove('saved');
    updateTotal();
  }

  function updateTotal() {
    const ceiling = Number(budget.value || 275);
    totalNode.textContent = dollars(total);
    const ok = total <= ceiling;
    verdict.textContent = ok ? '✓ Under max' : '✕ Over max';
    verdict.classList.toggle('pass', ok);
    verdict.classList.toggle('fail', !ok);
  }

  form.addEventListener('input', markDraft);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.textContent = 'SAVED';
    state.classList.add('saved');
  });
  const reset = document.querySelector('[data-reset]');
  if (reset) reset.addEventListener('click', () => {
    form.reset();
    markDraft();
  });
  updateTotal();
}

writeBackdrop();
initDesireProtocol();
