// app/api/feedback/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, feedback } = await request.json()

    // Validate input
    if (!feedback || feedback.length < 10) {
      return NextResponse.json(
        { error: 'Feedback must be at least 10 characters' },
        { status: 400 }
      )
    }

    // Store in Google Sheets (using API Spreadsheets)
    if (!process.env.NEXT_PUBLIC_API_SPREADSHEETS_URL) {
      throw new Error('NEXT_PUBLIC_API_SPREADSHEETS_URL is not defined')
    }

    const sheetResponse = await fetch(process.env.NEXT_PUBLIC_API_SPREADSHEETS_URL, {
      method: 'POST',
      body: JSON.stringify({
        data: { name, email, feedback, timestamp: new Date().toISOString() }
      })
    })

    if (!sheetResponse.ok) throw new Error('Failed to store feedback')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}