// store.js — handles the store page UI and ordering
(function(){
  if (!document.getElementById('orderBtn')) return;
  const orderBtn = document.getElementById('orderBtn');
  const orderForm = document.getElementById('orderForm');
  const form = document.getElementById('form');
  const cancel = document.getElementById('cancel');
  const status = document.getElementById('status');

  orderBtn.addEventListener('click', () => {
    orderForm.classList.remove('hidden');
    status.textContent = '';
  });
  cancel.addEventListener('click', () => orderForm.classList.add('hidden'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      quantity: Number(form.quantity.value) || 1,
      message: form.message.value.trim()
    };
    const submitBtn = form.querySelector('button[type=submit]');
    submitBtn.disabled = true;
    status.textContent = 'Sending order...';
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Request failed');
      status.textContent = 'Order placed! Thank you — you will receive a confirmation by email.';
      form.reset();
      setTimeout(()=> orderForm.classList.add('hidden'), 1500);
    } catch (err) {
      console.error(err);
      status.textContent = 'Could not place order. Please try again.';
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
