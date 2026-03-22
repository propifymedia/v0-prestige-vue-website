'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Facebook, Instagram } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { LanguageToggle } from '@/components/language-toggle'
import { useActiveSection, type SectionId } from '@/lib/use-active-section'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_ITEMS: { key: keyof typeof import('@/lib/dictionary').dictionary.nav; href: string; sectionId: SectionId }[] = [
  { key: 'services', href: '#services', sectionId: 'services' },
  { key: 'gallery', href: '#gallery', sectionId: 'gallery' },
  { key: 'about', href: '#why-choose-us', sectionId: 'why-choose-us' },
  { key: 'contact', href: '#quote', sectionId: 'quote' },
]

export function Header() {
  const { lang, t } = useLanguage()
  const activeSection = useActiveSection()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nav = t('nav')

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        isScrolled
          ? 'bg-navy/90 backdrop-blur-[12px]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          Prestige Vue
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'relative py-1 text-sm font-medium text-white/90 transition-colors hover:text-white',
                activeSection === item.sectionId &&
                  'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-blue after:content-[""]'
              )}
            >
              {nav[item.key]}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="text-white/80 transition-colors hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-white/80 transition-colors hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
          <LanguageToggle className="text-white" />
          <Button
            asChild
            className="bg-sky-blue text-navy hover:bg-sky-blue/90"
          >
            <Link href="#quote">{nav.quote}</Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-navy text-white">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-6 pt-8">
              {/* Mobile Language Toggle */}
              <div className="px-2">
                <LanguageToggle className="text-white" />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-2 py-2 text-lg font-medium text-white/90 transition-colors hover:text-white',
                      activeSection === item.sectionId && 'border-l-2 border-sky-blue pl-4'
                    )}
                  >
                    {nav[item.key]}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-4 px-2">
                <Button
                  asChild
                  className="w-full bg-sky-blue text-navy hover:bg-sky-blue/90"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href="#quote">{nav.quote}</Link>
                </Button>
              </div>

              {/* Mobile Social Links */}
              <div className="mt-auto flex items-center gap-4 px-2 pt-8">
                <Link
                  href="#"
                  className="text-white/80 transition-colors hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-white/80 transition-colors hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
