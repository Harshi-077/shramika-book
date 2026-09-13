import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import en from './en'
import te from './te'
import type { TranslationKeys } from './en'
import type { Language } from '../types'
import { useAuth } from '../context/AuthContext'
import { getSettings, upsertSettings } from '../lib/queries'

const dictionaries: Record<Language, Record<TranslationKeys, string>> = {
  en,
  te,
}

const STORAGE_KEY = 'shramika_book_language'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => Promise<void>
  t: (key: TranslationKeys) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem(STORAGE_KEY) as Language) || 'en'
  )

  // Load saved language preference from Supabase settings once the user logs in
  useEffect(() => {
    if (!user) return
    let cancelled = false
    getSettings()
      .then((settings) => {
        if (!cancelled && settings?.language) {
          setLanguageState(settings.language)
          localStorage.setItem(STORAGE_KEY, settings.language)
        }
      })
      .catch(() => {
        // If settings can't be loaded, fall back silently to local preference
      })
    return () => {
      cancelled = true
    }
  }, [user])

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    if (user) {
      try {
        await upsertSettings(lang)
      } catch {
        // Ignore persistence errors; local preference still applies
      }
    }
  }

  const t = useMemo(() => {
    const dict = dictionaries[language] ?? dictionaries.en
    return (key: TranslationKeys) => dict[key] ?? dictionaries.en[key] ?? key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
