'use client'

import { Award, CheckCircle, Zap, Leaf } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { dictionary } from '@/lib/dictionary'

const VALUE_ICONS = [Award, CheckCircle, Zap, Leaf]

export function About() {
  const { lang, t } = useLanguage()
  const about = t('about')

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            {about.title}
          </h1>
          <p className="mt-2 text-xl font-medium text-sky-blue">
            {about.subtitle}
          </p>
        </div>

        {/* Intro & Story */}
        <div className="mx-auto mt-12 max-w-3xl space-y-6">
          <p className="text-lg leading-relaxed text-charcoal/80">
            {about.intro}
          </p>
          <p className="text-lg leading-relaxed text-charcoal/80">
            {about.story}
          </p>
        </div>

        {/* Mission */}
        <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-navy p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {about.mission.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            {about.mission.description}
          </p>
        </div>

        {/* Values */}
        <div className="mt-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
            {about.values.title}
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {dictionary.about.values.items.map((value, index) => {
              const Icon = VALUE_ICONS[index]
              return (
                <div
                  key={index}
                  className="group rounded-xl border border-border bg-off-white p-8 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-blue/10 transition-colors group-hover:bg-sky-blue/20">
                      <Icon className="h-6 w-6 text-sky-blue" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal">
                      {value.title[lang]}
                    </h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {value.description[lang]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
