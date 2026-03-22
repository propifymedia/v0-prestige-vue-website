'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Lang, dictionary } from '@/lib/dictionary'

// Helper to resolve translations from nested dictionary structure
function resolveTranslation<T>(obj: T, lang: Lang): unknown {
  if (obj === null || obj === undefined) return obj
  if (typeof obj !== 'object') return obj
  
  // If it's an array, resolve each item
  if (Array.isArray(obj)) {
    return obj.map(item => resolveTranslation(item, lang))
  }
  
  const record = obj as Record<string, unknown>
  const keys = Object.keys(record)
  
  // If this object has exactly fr and en keys (or just those two), return the value for current lang
  // This handles translation leaf nodes like { fr: 'Services', en: 'Services' }
  if (keys.length === 2 && 'fr' in record && 'en' in record) {
    return record[lang]
  }
  
  // Otherwise, recursively resolve all nested properties
  const result: Record<string, unknown> = {}
  for (const key of keys) {
    result[key] = resolveTranslation(record[key], lang)
  }
  return result
}

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: <K extends keyof typeof dictionary>(key: K) => ResolvedDict<(typeof dictionary)[K]>
}

// Type helper to get resolved (lang-selected) dictionary type
type ResolvedDict<T> = T extends { fr: infer F; en: infer E }
  ? F extends object ? ResolvedDict<F> : F
  : T extends readonly (infer U)[]
  ? ResolvedDict<U>[]
  : T extends object
  ? { [K in keyof T]: ResolvedDict<T[K]> }
  : T

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
    return resolveTranslation(dictionary[key], lang) as ResolvedDict<(typeof dictionary)[K]>
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
