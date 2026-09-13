import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { BookOpen, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'

export default function Login() {
  const { user, signIn } = useAuth()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error } = await signIn(email.trim(), password)
    setSubmitting(false)
    if (error) {
      setError(t('login_error'))
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">
          <BookOpen size={26} />
        </div>
        <div className="login-title">{t('appName')}</div>
        <div className="login-subtitle">{t('login_subtitle')}</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={14} />
              {t('login_email')}
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <Lock size={14} />
              {t('login_password')}
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? t('loading') : t('login_button')}
          </button>
        </form>
      </div>
    </div>
  )
}
