# Technical Journals Backend

Node.js + Express.js + MongoDB/Mongoose API for the Technical Journals platform.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set `MONGODB_URI`.

Local MongoDB example:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/technical_journals
```

MongoDB Atlas example:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/technical_journals
```

3. Seed the initial universities, journals, conferences, and footer settings:

```bash
npm run seed
```

4. Start the API:

```bash
npm run dev
```

The API keeps the project's existing numeric `id` fields and snake_case response fields so the current frontend continues to work without route or UI changes.

## Footer Settings API

Public:

- `GET /api/footer-settings`

Admin (JWT + admin role required):

- `GET /api/admin/footer-settings`
- `GET /api/admin/footer-settings/:id`
- `POST /api/admin/footer-settings`
- `PUT /api/admin/footer-settings/:id`
- `PATCH /api/admin/footer-settings/:id`
- `DELETE /api/admin/footer-settings/:id`

Example body:

```json
{
  "address": "Central Railway Colony, Omkar Nagar, Nagpur, Maharashtra 440027",
  "email": "contact@technicaljournals.org",
  "phone": "9970294396",
  "social": {
    "facebook": "https://facebook.com/technicaljournals",
    "linkedin": "https://linkedin.com/company/technicaljournals",
    "twitter": "https://twitter.com/technicaljournals",
    "youtube": "https://youtube.com/technicaljournals"
  },
  "status": "active"
}
```

The legacy MySQL schema and seed files are retained only for reference under `database/legacy/`; they are not used by the application runtime.
