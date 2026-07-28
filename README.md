# Leo Store — Leo Books

This adds a minimal Express-based store for "Leo Books" with two pages:

- /store — public store page where visitors can place an order
- /notifications — simple page that lists incoming orders (notifications)

How it works
- Orders are POSTed to /api/order and saved to data/orders.json
- Notifications page fetches /api/orders to display them

Run locally
1. npm install
2. npm start
3. Open http://localhost:3000/store and http://localhost:3000/notifications

Notes
- This is a minimal demo (no authentication, no email sending). If you want real email alerts, I can add SMTP or an integration (SendGrid, Mailgun) and optionally protect the notifications page.
