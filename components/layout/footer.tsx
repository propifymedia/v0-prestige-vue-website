'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { LanguageToggle } from '@/components/language-toggle'

export function Footer() {
  const { t } = useLanguage()
  const footer = t('footer')
  const nav = t('nav')

  return (
    <footer className="bg-charcoal py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold">
              Prestige Vue
            </Link>
            <p className="mt-4 leading-relaxed text-white/70">
              {footer.tagline}
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-sky-blue/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-sky-blue/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">{footer.quickLinks}</h3>
            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="#services"
                className="text-white/70 transition-colors hover:text-white"
              >
                {nav.services}
              </Link>
              <Link
                href="#gallery"
                className="text-white/70 transition-colors hover:text-white"
              >
                {nav.gallery}
              </Link>
              <Link
                href="#why-choose-us"
                className="text-white/70 transition-colors hover:text-white"
              >
                {nav.about}
              </Link>
              <Link
                href="#quote"
                className="text-white/70 transition-colors hover:text-white"
              >
                {nav.contact}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">{footer.contactUs}</h3>
            <div className="mt-4 flex flex-col gap-4">
              <a
                href="tel:+15145121060"
                className="flex items-center gap-3 text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 shrink-0 text-sky-blue" />
                514-512-1060
              </a>
              <a
                href="mailto:info@prestigevue.ca"
                className="flex items-center gap-3 text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 shrink-0 text-sky-blue" />
                info@prestigevue.ca
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="h-5 w-5 shrink-0 text-sky-blue" />
                <span>
                  6255 Rue Marivaux
                  <br />
                  Saint-Leonard, H1P3H6
                </span>
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-lg font-semibold">{footer.followUs}</h3>
            <div className="mt-4">
              <LanguageToggle className="text-white" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}
