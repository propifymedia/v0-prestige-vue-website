'use client'

import Link from 'next/link'
import { Gallery } from '@/components/sections/gallery'
import { Testimonials } from '@/components/sections/testimonials'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'

export default function GalleryPage() {
  const { t } = useLanguage()

  return (
    <main className="pt-20">
      <Gallery />
      <div className="bg-off-white py-12 text-center">
        <Button asChild size="lg" className="bg-sky-blue text-navy hover:bg-sky-blue/90">
          <Link href="/contact">{t('hero').cta}</Link>
        </Button>
      </div>
      <Testimonials />
    </main>
  )
}
