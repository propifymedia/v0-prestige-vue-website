'use client'

import { useLanguage } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'

type LanguageToggleProps = {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
      className={cn(
        'flex items-center gap-1 rounded-full border border-current/20 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/10',
        className
      )}
      aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <span className={cn(lang === 'fr' ? 'opacity-100' : 'opacity-50')}>FR</span>
      <span className="opacity-50">/</span>
      <span className={cn(lang === 'en' ? 'opacity-100' : 'opacity-50')}>EN</span>
    </button>
  )
}
