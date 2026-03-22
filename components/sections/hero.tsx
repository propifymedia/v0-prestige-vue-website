'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/language-provider'
import { Button } from '@/components/ui/button'

export function Hero() {
  const { t } = useLanguage()
  const hero = t('hero')

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center bg-navy"
    >
      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="Beautiful interior with custom blinds"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-white/80 md:text-xl">
          {hero.subheadline}
        </p>
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-sky-blue px-8 py-6 text-lg font-semibold text-navy hover:bg-sky-blue/90"
          >
            <Link href="/contact">{hero.cta}</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 pt-2">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
