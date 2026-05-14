import { NavLink, useLocation } from 'react-router-dom'
import styles from "../styles/index.module.css"

const navHome = {
    label: 'Início',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
        <polyline points="9 21 9 12 15 12 15 21" />
      </svg>
    )
}
const navItems = [
  {
    to: '/resumo',
    label: 'Resumo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    to: '/avatar',
    label: 'Avatar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    to: '/loja',
    label: 'Loja',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
]

function BottomNav() {
  const location = useLocation()

  return (
    <footer>
      <nav className={styles.bottomNav}>
        <NavLink className={styles.navItem} to="/">
          {navHome.icon}
          {navHome.label}
        </NavLink>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={`${styles.navItem} ${location.pathname.includes(item.to) ? styles.active : ''}`}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </footer>
  )
}

export default BottomNav;