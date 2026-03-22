'use client'

import Link from 'next/link'
import { Wrench, MessageSquare, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { dictionary } from '@/lib/dictionary'
import { Button } from '@/components/ui/button'

const ICONS = [Wrench, MessageSquare, ShieldCheck]

export function WhyChooseUs({ preview = false }: { preview?: boolean }) {
  const { lang, t } = useLanguage()
  const whyChooseUs = t('whyChooseUs')

  return (
    <section id="why-choose-us" className="bg-off-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
            {whyChooseUs.title}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.whyChooseUs.features.map((feature, index) => {
            const Icon = ICONS[index]
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-blue/10 transition-colors group-hover:bg-sky-blue/20">
                  <Icon
                    className="h-7 w-7 text-sky-blue"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold text-charcoal">
                  {feature.title[lang]}
                </h3>

                {/* Description */}
                {!preview && (
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {feature.description[lang]}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Learn More CTA (preview mode only) */}
        {preview && (
          <div className="mt-10 text-center">
            <Button asChild className="bg-navy text-white hover:bg-navy/90">
              <Link href="/about">{whyChooseUs.learnMore}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
