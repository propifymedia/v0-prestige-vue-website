'use client'

import Link from 'next/link'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { Gallery } from '@/components/sections/gallery'
import { Testimonials } from '@/components/sections/testimonials'
import { useLanguage } from '@/components/providers/language-provider'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { t } = useLanguage()
  const quoteForm = t('quoteForm')

  return (
    <main>
      <Hero />
      <Services preview />
      <WhyChooseUs preview />
      <Gallery preview />
      <Testimonials />

      {/* CTA Banner */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {quoteForm.title}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            {quoteForm.ctaBanner}
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-sky-blue px-8 py-6 text-lg font-semibold text-navy hover:bg-sky-blue/90"
            >
              <Link href="/contact">{quoteForm.submit}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
