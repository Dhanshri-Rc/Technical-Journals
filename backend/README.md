# Technical Journals — Backend

Node.js + Express.js + MySQL API for the Technical Journals platform.

## Stack

- Express.js (REST API)
- MySQL via `mysql2/promise` (connection pool, parameterized queries only)
- JWT authentication (`jsonwebtoken`) + `bcryptjs` password hashing
- `multer` for cover/logo/image uploads
- `nodemailer` for contact-form emails
- `helmet`, `cors`, `express-rate-limit` for security

## 1. Install dependencies

```bash
cd backend
npm install
```

## 2. Create the MySQL database

Make sure MySQL (or MariaDB) is running locally, then:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p technical_journals < database/seed.sql
```

`schema.sql` creates the `technical_journals` database and all tables
(`users`, `journals`, `universities`, `conferences`, `contact_enquiries`).
`seed.sql` loads the journals/universities/conferences that were previously
hardcoded in the frontend's `src/data/site.js`, so the site isn't empty
after the switch to a real database.

## 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

| Variable | Notes |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Your MySQL connection. Don't use the `root` account with no password in production — create a dedicated app user with privileges scoped to `technical_journals`. |
| `JWT_SECRET` | Any long random string. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`. |
| `ADMIN_EMAIL` | The email the admin logs in with. |
| `ADMIN_PASSWORD_HASH` | A bcrypt hash of the admin's password — **never** a plaintext password. Generate it with:<br>`node -e "console.log(require('bcryptjs').hashSync('YourPassword123!', 10))"` |
| `FRONTEND_URL` | Must exactly match the origin the frontend runs on (e.g. `http://localhost:5173` for `npm run dev`), or the browser will block requests via CORS. |
| `SMTP_*` | Your SMTP provider's credentials. If left blank, the server still runs and enquiries still save to the database — it just skips sending email (and logs that it did). |

## 4. Run the server

```bash
npm run dev     # nodemon, auto-restarts on change
# or
npm start       # plain node
```

You should see:

```
[server] Technical Journals API listening on http://localhost:5000
[db] MySQL connection pool established
```

Health check: `GET http://localhost:5000/api/health`

## API summary

All responses follow `{ success, message, data }` (lists also include `pagination`).

```
POST   /api/auth/register
POST   /api/auth/login          { email, password, loginAs: "user" | "admin" }
GET    /api/auth/me             (Bearer token required)

GET    /api/journals            ?page&limit&search&subject&category&frequency&accessType&language&indexing&sort
GET    /api/journals/featured
GET    /api/journals/filter-options
GET    /api/journals/:idOrSlug

GET    /api/conferences         ?page&limit&search&type&subject&region&dateRange&sort
GET    /api/conferences/filter-options
GET    /api/conferences/:idOrSlug

GET    /api/universities        ?featured&limit
GET    /api/universities/:idOrSlug

POST   /api/contact             { name, email, subject, message }

# Everything below requires a valid admin JWT (Authorization: Bearer <token>)
GET    /api/admin/dashboard/stats
GET|POST /api/admin/journals            PUT|DELETE /api/admin/journals/:id
GET|POST /api/admin/conferences         PUT|DELETE /api/admin/conferences/:id
GET|POST /api/admin/universities        PUT|DELETE /api/admin/universities/:id
GET    /api/admin/enquiries             PATCH /api/admin/enquiries/:id/status   DELETE /api/admin/enquiries/:id
```

Admin create/update for journals, conferences, and universities accept
`multipart/form-data` so a cover/logo/image file can be uploaded in the same
request (field names: `cover_image`, `image`, `logo` respectively).

## Notes

- Registration always creates `account_role = 'user'` — there's no way for
  someone to self-register as an admin. The admin account lives only in
  `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`).
- `professional_role` (Author / Reviewer / Editor / University Administrator)
  is a separate field from `account_role` (`user` / `admin`) — see section 5
  of the original spec for why this distinction matters.
- Contact form: the enquiry is saved to MySQL **before** any email is sent.
  If SMTP fails, the enquiry is never lost — the failure is only logged.
- Uploaded files are served from `/uploads/...` and validated for MIME type,
  extension, and a 5MB size limit.
