import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, history, reportContext, language } = body

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        response: 'AI chat requires an API key. Please set OPENAI_API_KEY in your .env.local file.',
      })
    }

    const langInstruction = language === 'it'
      ? 'Rispondi in italiano semplice.'
      : 'Answer in simple English.'

    const systemPrompt = `You are a Medical Report Analyst helping a patient understand their medical report. ${langInstruction}

Rules:
- Use simple, patient-friendly language
- Do NOT diagnose any condition
- Do NOT prescribe medications or treatments
- Do NOT create panic or alarm
- Always recommend consulting a healthcare professional
- Answer based on the provided report context
- Be concise but helpful
- If the user asks about something not in the report, politely say you can only answer about their report`

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Here is the patient's medical report analysis for context:\n${reportContext || 'No report available'}` },
    ]

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content })
        }
      }
    }

    messages.push({ role: 'user', content: message })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 600,
      }),
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    return NextResponse.json({ response: data.choices[0].message.content })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response. Please try again.' },
      { status: 500 }
    )
  }
}
