'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Lang, dictionary } from '@/lib/dictionary'

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: <K extends keyof typeof dictionary>(key: K) => (typeof dictionary)[K][Lang]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    // Update document title
    document.title = dictionary.siteTitle[newLang]
    // Update html lang attribute
    document.documentElement.lang = newLang
    // Persist preference
    localStorage.setItem('prestige-vue-lang', newLang)
  }

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem('prestige-vue-lang') as Lang | null
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLangState(saved)
      document.documentElement.lang = saved
    }
  }, [])

  const t = <K extends keyof typeof dictionary>(key: K) => {
    return dictionary[key][lang] as (typeof dictionary)[K][Lang]
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
