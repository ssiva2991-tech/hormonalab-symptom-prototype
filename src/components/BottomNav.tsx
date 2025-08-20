
import { NavLink } from 'react-router-dom'

function Button({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `mobile-nav-item`
      }
    >
      {({ isActive }) => (
        <div className={`mobile-nav-btn ${isActive ? 'mobile-nav-btn-active' : ''}`}>
          <div className="mobile-nav-icon">{icon}</div>
          <div>{label}</div>
        </div>
      )}
    </NavLink>
  )
}

export default function BottomNav() {
  return (
    <nav className="mobile-nav md:hidden">
      <div className="mobile-nav-inner">
        <Button to="/" label="Home" icon="🏠" />
        <Button to="/log" label="Log" icon="✍️" />
        <Button to="/entries" label="Entries" icon="📜" />
        <Button to="/insights" label="Insights" icon="🧠" />
        <Button to="/wearables" label="Wearable" icon="⌚" />
      </div>
    </nav>
  )
}
