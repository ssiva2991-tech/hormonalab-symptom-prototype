
# HormonaLab – Symptom & Insights (Prototype)

Platform-independent demo using **Vite + React + TypeScript + Tailwind + React Query + MSW**.
- No backend required. Mock endpoints are intercepted in-browser with **MSW**.
- Works locally and on any static host (Vercel/Netlify/Azure SWA/GitHub Pages/etc.).

## Features
- Symptom Logging Form: validate, save via mocked API, success/error feedback
- Recent Entries: lists saved entries (session-only)
- Predictive Insights (mock): 1–2s simulated delay, shows `{ prediction, confidence }`
- Wearable Data (mock): Connect → fetch HR + sleep; show Last Synced; Sync refresh
- Responsive UI with Tailwind

## Run locally
```bash
npm install
npm run dev
```
> The `postinstall` script runs `msw init public --save` to generate `public/mockServiceWorker.js` automatically.

## Build & Deploy
```bash
npm run build
npm run preview
```
Deploy the `dist/` folder to any static host. No server required.

## Structure
```
/src
  /components    # shared UI
  /hooks         # react-query hooks
  /lib           # api client
  /mocks         # msw worker + handlers
  /pages         # Dashboard, LogSymptoms, RecentEntries, Insights, Wearables, About
  /utils         # helpers
  App.tsx
  main.tsx
  index.css
```
