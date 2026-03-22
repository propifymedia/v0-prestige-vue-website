'use client'

import { Gallery } from '@/components/sections/gallery'
import { Testimonials } from '@/components/sections/testimonials'

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <Gallery />
      <Testimonials />
    </main>
  )
}
