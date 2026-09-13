import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarCheck, Wallet, Settings } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function BottomNav() {
  const { t } = useLanguage()

  const items = [
    { to: '/dashboard', Icon: LayoutDashboard, label: t('nav_dashboard') },
    { to: '/labourers', Icon: Users, label: t('nav_labourers') },
    { to: '/attendance', Icon: CalendarCheck, label: t('nav_attendance') },
    { to: '/payments', Icon: Wallet, label: t('nav_payments') },
    { to: '/settings', Icon: Settings, label: t('nav_settings') },
  ]

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {({ isActive }) => (
            <>
              <span className="nav-icon-wrap">
                <item.Icon size={isActive ? 27 : 24} strokeWidth={isActive ? 2.4 : 2} />
              </span>
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
