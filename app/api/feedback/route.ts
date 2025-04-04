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
    const sheetResponse = await fetch('https://api.apispreadsheets.com/data/6foRyHRgFnFQO3Yj/', {
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