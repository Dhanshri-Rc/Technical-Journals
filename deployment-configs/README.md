# Deployment Configurations

Each file here is a **standalone example** for one hosting provider. Do not use more than one at a time — copy only the file relevant to your host into your project (or hosting dashboard) before deploying.

- `netlify.toml` → copy to the project root as `netlify.toml`
- `vercel.json` → copy to the project root as `vercel.json`
- `firebase.json` → copy to the project root as `firebase.json` (requires `firebase init hosting` first)
- `apache.htaccess` → copy into your built `dist/` folder as `.htaccess`
- `nginx.conf` → merge the `location` block into your existing Nginx server config

These configs ensure that refreshing a client-side route (e.g. `/journals/j-electrical-electronics`) does not return a server 404, by rewriting all unmatched paths to `index.html`.
