# Jayaram Sai Paruchuri — Portfolio

Responsive dark-mode developer portfolio built with React, Vite, Tailwind CSS, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open `/admin` on the local Vite URL to manage projects and education records, review contact form submissions, and export or import a JSON content backup. The protected login API is hosted by Vercel Functions, so use `npx vercel dev` locally to exercise sign-in; plain `npm run dev` serves the frontend only.

## Vercel admin login

The `/admin` login is checked by server-side Vercel Functions. Before deployment, configure these project environment variables in **Vercel → Settings → Environment Variables**:

- `ADMIN_USERNAME`: the username you choose
- `ADMIN_PASSWORD`: a unique, strong password (never commit it to this project)
- `SESSION_SECRET`: a random secret of at least 32 characters

Redeploy after adding or changing environment variables. The server issues an eight-hour, signed, HttpOnly, SameSite=Strict cookie. Do not add admin credentials to `VITE_*` variables; Vite exposes those to the browser.

The project and education editor and contact form inbox still use this browser's local storage. The login protects the admin route, but shared updates across visitors and an inbox that collects deployed submissions need a persistent database and authenticated content API; those are not configured yet.

Build with `npm run build`.
