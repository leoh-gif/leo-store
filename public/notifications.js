// notifications.js — fetches orders and displays them
(async function(){
  const container = document.getElementById('orders');
  if (!container) return;
  container.textContent = 'Loading...';
  try {
    const res = await fetch('/api/orders');
    const json = await res.json();
    const orders = (json && json.orders) || [];
    if (orders.length === 0) {
      container.textContent = 'No orders yet.';
      return;
    }
    container.innerHTML = '';
    orders.forEach(o => {
      const el = document.createElement('div');
      el.className = 'order-item';
      el.innerHTML = `<strong>${escapeHtml(o.name)}</strong> — <em>${o.email}</em> <br>
        Quantity: ${o.quantity} — <small>${new Date(o.created_at).toLocaleString()}</small>
        ${o.message ? `<div>Message: ${escapeHtml(o.message)}</div>` : ''}`;
      container.appendChild(el);
    });
  } catch (err) {
    console.error(err);
    container.textContent = 'Could not load orders.';
  }

  function escapeHtml(s){
    if (!s) return '';
    return s.replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
    });
  }
})();
