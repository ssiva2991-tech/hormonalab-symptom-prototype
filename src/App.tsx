
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LogSymptoms from './pages/LogSymptoms'
import RecentEntries from './pages/RecentEntries'
import Insights from './pages/Insights'
import Wearables from './pages/Wearables'
import About from './pages/About'
import BottomNav from './components/BottomNav'

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`
      }
    >
      {children}
    </NavLink>
  )
}

export default function App() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-amber-50/90 backdrop-blur border-b border-amber-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-amber-200 grid place-items-center text-orange-700 font-bold">H</div>
            <h1 className="text-lg font-semibold">HormonaLab – Symptom & Insights</h1>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/">Dashboard</NavItem>
            <NavItem to="/log">Log Symptoms</NavItem>
            <NavItem to="/entries">Recent Entries</NavItem>
            <NavItem to="/insights">Insights</NavItem>
            <NavItem to="/wearables">Wearables</NavItem>
            <NavItem to="/about">About</NavItem>
          </nav>
          <div className="md:hidden">
            <button className="btn" onClick={() => navigate('/log')}>Log a Symptom</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/log" element={<LogSymptoms />} />
          <Route path="/entries" element={<RecentEntries />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/wearables" element={<Wearables />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} HormonaLab Prototype</span>
          <span>Demo only. Mocked APIs via MSW.</span>
        </div>
      </footer>
          <BottomNav />
    </div>
  )
}
