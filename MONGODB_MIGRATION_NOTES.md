# MongoDB Migration Notes

## What changed

- Replaced the runtime MySQL connection and SQL model queries with MongoDB/Mongoose.
- Preserved existing numeric `id` fields, snake_case API fields, routes, controllers, authentication, uploads, email flow, pagination, and existing frontend behavior.
- Added a `counters` collection for numeric IDs.
- Added MongoDB seed data for universities, journals, conferences, and the default footer settings.
- Added one Footer Settings resource with public read and protected admin CRUD.
- Added an Admin > Footer Settings page using the existing admin styling.
- The public footer keeps the original static contact/social values as fallback data if the API cannot be reached.

## Backend setup

```bash
cd backend
npm install
npm run seed
npm run dev
```

Use this in `backend/.env` for local MongoDB:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/technical_journals
```

For MongoDB Atlas, replace it with your `mongodb+srv://...` connection string.

## Footer API

Public:

- `GET /api/footer-settings`

Admin:

- `GET /api/admin/footer-settings`
- `GET /api/admin/footer-settings/:id`
- `POST /api/admin/footer-settings`
- `PUT /api/admin/footer-settings/:id`
- `PATCH /api/admin/footer-settings/:id`
- `DELETE /api/admin/footer-settings/:id`

## Note about dependency lockfile

Run `npm install` inside `backend/` once after extracting the project. It installs Mongoose and generates a fresh backend `package-lock.json` matching the MongoDB dependency set.
