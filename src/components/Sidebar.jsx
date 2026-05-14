import { NavLink, useLocation } from 'react-router-dom'
import styles from "../styles/index.module.css"
import { useLyrium } from "../context/LyriumContext";

const svg = {
  lyrium: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
                    <circle cx="12" cy="12" r="10" />
                    <text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text>
                  </svg>
  ),
}

const navHome = {
    label: 'Início',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
        <polyline points="9 21 9 12 15 12 15 21" />
      </svg>
    ),
}

const navItems = [
  {
    to: '/resumo',
    label: 'Resumo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    to: '/resumo/alimentacao',
    label: 'Alimentação',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    to: '/resumo/sono',
    label: 'Sono',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    to: '/resumo/passos',
    label: 'Passos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="1" />
        <path d="M9 20l3-8 2 4 2-4 2 5" />
      </svg>
    ),
  },
  {
    to: '/resumo/exercicio',
    label: 'Exercícios',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 5v14M18 5v14" />
        <rect x="1" y="8" width="5" height="8" rx="1" />
        <rect x="18" y="8" width="5" height="8" rx="1" />
        <line x1="6" y1="12" x2="18" y2="12" />
      </svg>
    ),
  },
  {
    to: '/avatar',
    label: 'Avatar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    to: '/loja',
    label: 'Loja',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
]

function Sidebar() {
  const location = useLocation()
  const { points } = useLyrium();
  return (
    <aside className={styles.desktopSidebar}>
      <div className={styles.sidebarLogo}>LYRA</div>
      <nav className={styles.sidebarNav}>
        <NavLink className={styles.sidebarLink} to="/">
          {navHome.icon}
          {navHome.label}
        </NavLink>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={`${styles.sidebarLink} ${location.pathname === item.to ? styles.active : ''}`}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.sidebarBadge}>
        {svg.lyrium}
        <span>{points} pontos</span>
      </div>
    </aside>
  )
}

export default Sidebar;