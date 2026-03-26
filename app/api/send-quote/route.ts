import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, additionalInfo } =
      await request.json()

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'prestigevue@gmail.com',
      subject: 'NEW WEBSITE FORM SUBMISSION - PRESTIGE VUE',
      text: `New Form Submission
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Additional Info: ${additionalInfo || 'N/A'}`,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
