# Backend Integration — MongoDB

This project uses the existing React/Vite frontend and Node.js/Express backend with MongoDB through Mongoose. The frontend routes, visual design, API response structure, JWT authentication, upload handling, contact mail flow, manuscript workflow, and existing CRUD behavior remain unchanged.

## Database

Set the backend environment variable:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/technical_journals
```

MongoDB Atlas is also supported with a standard `mongodb+srv://...` connection string.

Install and seed:

```bash
cd backend
npm install
npm run seed
npm run dev
```

MongoDB collections include users, universities, journals, conferences, contact_enquiries, manuscript_submissions, footer_settings, and counters. Numeric public `id` values and existing snake_case API fields are intentionally preserved for frontend compatibility.

## Footer Settings

The footer contact details and social links are now served by `GET /api/footer-settings`. Admin CRUD is available below `/api/admin/footer-settings` and uses the existing admin JWT middleware. The frontend footer retains its current static values as a fallback when the API is unavailable.

Legacy SQL files, if present under `backend/database/legacy`, are reference-only and are not loaded by the application.
