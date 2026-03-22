'use client'

import { About } from '@/components/sections/about'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { Testimonials } from '@/components/sections/testimonials'

export default function AboutPage() {
  return (
    <main className="pt-20">
      <About />
      <WhyChooseUs />
      <Testimonials />
    </main>
  )
}
