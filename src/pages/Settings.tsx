import { Languages, Mail, LogOut } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'

export default function Settings() {
  const { t, language, setLanguage } = useLanguage()
  const { user, signOut } = useAuth()

  return (
    <Layout title={t('settings_title')}>
      <div className="card">
        <div className="section-title">
          <Languages size={13} />
          {t('settings_language')}
        </div>
        <div className="segmented">
          <button
            className={language === 'en' ? 'active' : ''}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          <button
            className={language === 'te' ? 'active' : ''}
            onClick={() => setLanguage('te')}
          >
            తెలుగు
          </button>
        </div>
      </div>

      <div className="card">
        <div className="section-title">{t('settings_account')}</div>
        <div className="settings-row">
          <span className="label">
            <span className="settings-icon">
              <Mail size={15} />
            </span>
            {t('settings_loggedInAs')}
          </span>
          <span className="value">{user?.email}</span>
        </div>
      </div>

      <button className="btn btn-danger btn-block" onClick={() => signOut()}>
        <LogOut size={17} />
        {t('logout')}
      </button>
    </Layout>
  )
}
