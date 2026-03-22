'use client'

import { Star } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { dictionary } from '@/lib/dictionary'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

export function Testimonials() {
  const { lang, t } = useLanguage()
  const testimonials = t('testimonials')

  return (
    <section id="testimonials" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
            {testimonials.title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="mx-auto mt-16 max-w-4xl px-12">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {dictionary.testimonials.items.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 bg-off-white shadow-none">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      {/* Stars */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="mt-6 text-lg leading-relaxed text-charcoal">
                        &ldquo;{testimonial.quote[lang]}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="mt-6">
                        <p className="font-semibold text-charcoal">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-navy/20 text-navy hover:bg-navy hover:text-white" />
            <CarouselNext className="border-navy/20 text-navy hover:bg-navy hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
