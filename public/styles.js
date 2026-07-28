// shared simple styles
const css = `
body { font-family: system-ui, -apple-system, Arial, sans-serif; max-width: 900px; margin: 24px auto; padding: 0 16px; color: #111 }
header { display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px }
nav a { color: #0366d6; text-decoration:none }
.product { border: 1px solid #ddd; padding: 16px; border-radius:8px }
.price { font-weight:600 }
button { background:#0366d6; color:#fff; border:none; padding:8px 12px; border-radius:6px; cursor:pointer }
button:disabled { opacity:0.6 }
.modal { position:fixed; left:0; top:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center }
.modal.hidden { display:none }
.modal-content { background:#fff; padding:16px; border-radius:8px; width:320px }
label { display:block; margin-bottom:8px }
input, textarea { width:100%; padding:6px; box-sizing:border-box }
.actions { display:flex; gap:8px; justify-content:flex-end }
.order-item { border-bottom:1px solid #eee; padding:8px 0 }
`;

// write stylesheet to /public/styles.css dynamically for simplicity
(async function(){
  if (typeof window === 'undefined') return; // only run in browser
  const link = document.createElement('style');
  link.textContent = css;
  document.head.appendChild(link);
})();
