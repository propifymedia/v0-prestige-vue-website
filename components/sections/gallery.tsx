'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/language-provider'
import { dictionary } from '@/lib/dictionary'
import { Lightbox } from '@/components/lightbox'
import { Button } from '@/components/ui/button'

const GALLERY_IMAGES = [
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
  '/images/gallery-4.jpg',
  '/images/gallery-5.jpg',
  '/images/gallery-6.jpg',
]

export function Gallery({ preview = false }: { preview?: boolean }) {
  const { lang, t } = useLanguage()
  const gallery = t('gallery')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const allImages = GALLERY_IMAGES.map((src, index) => ({
    src,
    caption: dictionary.galleryItems[index].caption,
  }))

  const images = preview ? allImages.slice(0, 3) : allImages

  const openLightbox = (index: number) => {
    if (!preview) setLightboxIndex(index)
  }
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + allImages.length) % allImages.length : null
    )
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % allImages.length : null
    )

  return (
    <section id="gallery" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
            {gallery.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {gallery.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className={`mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-lg bg-navy ${
                !preview && index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              } ${!preview && index === 0 ? 'aspect-square sm:aspect-auto' : 'aspect-[4/3]'}`}
            >
              <Image
                src={image.src}
                alt={image.caption[lang]}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={
                  !preview && index === 0
                    ? '(max-width: 640px) 100vw, 66vw'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                }
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-navy/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-sky-blue px-6 py-2 text-sm font-semibold text-navy">
                  {gallery.viewProject}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* View All CTA (preview mode only) */}
        {preview && (
          <div className="mt-10 text-center">
            <Button asChild className="bg-navy text-white hover:bg-navy/90">
              <Link href="/gallery">{gallery.viewAll}</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {!preview && lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  )
}
