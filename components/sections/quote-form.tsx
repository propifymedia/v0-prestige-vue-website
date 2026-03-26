'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers/language-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function QuoteForm() {
  const { t } = useLanguage()
  const quoteForm = t('quoteForm')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalInfo: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to send')
      }

      toast.success(quoteForm.successMessage, { duration: 5000 })
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        additionalInfo: '',
      })
    } catch {
      toast.error(quoteForm.errorMessage, { duration: 5000 })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="quote" className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {quoteForm.title}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            {quoteForm.subtitle}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6 rounded-xl bg-white p-8"
        >
          {/* Name Row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-charcoal"
              >
                {quoteForm.firstName}
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="border-border"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-charcoal"
              >
                {quoteForm.lastName}
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="border-border"
              />
            </div>
          </div>

          {/* Contact Row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-charcoal"
              >
                {quoteForm.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="border-border"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-charcoal"
              >
                {quoteForm.phone}
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="border-border"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <label
              htmlFor="additionalInfo"
              className="mb-2 block text-sm font-medium text-charcoal"
            >
              {quoteForm.additionalInfo}
            </label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              rows={4}
              value={formData.additionalInfo}
              onChange={handleChange}
              className="border-border resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-navy text-white hover:bg-navy/90"
          >
            {isSubmitting ? quoteForm.sending : quoteForm.submit}
          </Button>
        </form>
      </div>
    </section>
  )
}
