'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { Button } from '@/components/ui/button'

type LightboxProps = {
  images: { src: string; caption: { fr: string; en: string } }[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const { lang, t } = useLanguage()
  const gallery = t('gallery')
  const currentImage = images[currentIndex]

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
        onClick={onClose}
        aria-label={gallery.close}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-10 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label={gallery.previous}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      {/* Image Container */}
      <div
        className="relative flex max-h-[80vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[70vh] w-[85vw] md:w-[70vw]">
          <Image
            src={currentImage.src}
            alt={currentImage.caption[lang]}
            fill
            className="object-contain"
            sizes="85vw"
            priority
          />
        </div>
        {/* Caption */}
        <p className="mt-4 text-center text-lg text-white">
          {currentImage.caption[lang]}
        </p>
        {/* Counter */}
        <p className="mt-2 text-sm text-white/60">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-10 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label={gallery.next}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  )
}
