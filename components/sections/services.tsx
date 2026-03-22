'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/language-provider'
import { dictionary } from '@/lib/dictionary'
import { Button } from '@/components/ui/button'

const SERVICE_IMAGES = [
  '/images/residential-service.svg',
  '/images/commercial-service.svg',
  '/images/motor-service.svg',
  '/images/custom-service.svg',
]

export function Services({ preview = false }: { preview?: boolean }) {
  const { lang, t } = useLanguage()
  const services = t('services')

  return (
    <section id="services" className="bg-off-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
            {services.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dictionary.services.items.map((service, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-lg bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-navy">
                <Image
                  src={SERVICE_IMAGES[index]}
                  alt={service.title[lang]}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-charcoal">
                  {service.title[lang]}
                </h3>
                {!preview && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description[lang]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA (preview mode only) */}
        {preview && (
          <div className="mt-10 text-center">
            <Button asChild className="bg-navy text-white hover:bg-navy/90">
              <Link href="/services">{services.viewAll}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
