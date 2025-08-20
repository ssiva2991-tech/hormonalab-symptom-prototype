
export default function About() {
  return (
    <div className="prose max-w-none">
      <h2>About this Demo</h2>
      <p>
        This is a lightweight, deploy-ready prototype for <strong>HormonaLab – Symptom & Insights</strong>.
        It uses platform-independent mocked APIs via MSW so it can be hosted anywhere without a backend.
      </p>
      <h3>Tech Stack</h3>
      <ul>
        <li>Vite + React + TypeScript</li>
        <li>TailwindCSS for responsive UI</li>
        <li>@tanstack/react-query for data fetching + mutations</li>
        <li>MSW (Mock Service Worker) to simulate <code>/api/*</code> endpoints with realistic latency</li>
      </ul>
      <h3>Privacy</h3>
      <p>All data is session-only and mocked. No real personal or health data is stored or transmitted.</p>
    </div>
  )
}
