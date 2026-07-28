const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'orders.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ensure data directory and file exist
async function ensureDataFile() {
  await fs.ensureDir(path.join(__dirname, 'data'));
  if (!await fs.pathExists(DATA_FILE)) {
    await fs.writeJson(DATA_FILE, [] , { spaces: 2 });
  }
}

app.get('/', (req, res) => {
  res.redirect('/store');
});

app.post('/api/order', async (req, res) => {
  try {
    await ensureDataFile();
    const orders = await fs.readJson(DATA_FILE);
    const { name, email, quantity, message } = req.body;
    if (!name || !email || !quantity) {
      return res.status(400).json({ error: 'name, email and quantity are required' });
    }
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    const order = {
      id,
      name,
      email,
      quantity: Number(quantity),
      message: message || '',
      created_at: new Date().toISOString()
    };
    orders.unshift(order);
    await fs.writeJson(DATA_FILE, orders, { spaces: 2 });

    // For demonstration: also log
    console.log('New order:', order);

    res.json({ ok: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'could not save order' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    await ensureDataFile();
    const orders = await fs.readJson(DATA_FILE);
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'could not read orders' });
  }
});

app.listen(PORT, () => {
  console.log(`Leo Store running on http://localhost:${PORT}`);
  console.log('Store page: /store  Notifications: /notifications');
});
