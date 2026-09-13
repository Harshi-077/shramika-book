import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BottomNav from './BottomNav'

interface LayoutProps {
  title: string
  children: ReactNode
  showBack?: boolean
  /** Optional custom header content (e.g. branded logo lockup) that replaces the title text */
  headerContent?: ReactNode
  /** Optional element rendered on the right side of the header */
  headerRight?: ReactNode
}

export default function Layout({
  title,
  children,
  showBack,
  headerContent,
  headerRight,
}: LayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="app-shell">
      <header className="app-header">
        {showBack ? (
          <button className="back-button" onClick={() => navigate(-1)} aria-label="Back">
            <ArrowLeft size={18} />
          </button>
        ) : (
          <span className="header-spacer" />
        )}
        {headerContent ?? <h1>{title}</h1>}
        {headerRight ?? <span className="header-spacer" />}
      </header>
      <main className="app-main">{children}</main>
      <BottomNav />
    </div>
  )
}
