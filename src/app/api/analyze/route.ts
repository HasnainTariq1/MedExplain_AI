import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, language } = body

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        terms: [],
        explanation: 'AI analysis requires an API key. Please set OPENAI_API_KEY in your .env.local file.',
      })
    }

    const langName = language === 'it' ? 'Italian' : 'English'

    const systemPrompt = 'You are a Medical Report Analyst. Your role is to analyze raw medical report text (extracted via OCR) and return ONLY valid JSON. Do not add any text before or after the JSON.'

    const userPrompt = `Analyze the following raw medical report text and return a JSON object with two fields: "terms" (an array of objects) and "explanation" (a string in ${langName}).

Each object in "terms" must have these fields:
- "name": the full test name
- "value": the numeric value or qualitative result (e.g. "Reactive", "NonReactive")
- "unit": the unit of measurement (empty string if qualitative)
- "referenceRange": the reference range shown in the report
- "status": one of "Normal", "High", "Low", or "Slightly Abnormal"
- "simpleMeaning": a brief patient-friendly explanation of what this test measures

The "explanation" field must contain a patient-friendly summary of the overall report in ${langName}. Include what each abnormal result means and always recommend consulting a doctor.

Rules:
- Do NOT make a medical diagnosis.
- Do NOT prescribe treatments.
- Always recommend consulting a doctor.
- Return ONLY valid JSON, no markdown, no code fences, no extra text.

--- RAW REPORT TEXT ---
${text}
--- END OF REPORT ---`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    const content = data.choices[0].message.content || ''

    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/{[\s\S]*"terms"[\s\S]*"explanation"[\s\S]*}/)
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content

    const parsed = JSON.parse(jsonStr)

    const terms = Array.isArray(parsed.terms)
      ? parsed.terms.map((t: any) => ({
          name: String(t.name || ''),
          value: String(t.value ?? ''),
          unit: String(t.unit || ''),
          referenceRange: String(t.referenceRange || ''),
          status: ['Normal', 'High', 'Low', 'Slightly Abnormal'].includes(t.status) ? t.status : 'Normal',
          simpleMeaning: String(t.simpleMeaning || ''),
        }))
      : []

    return NextResponse.json({ terms, explanation: String(parsed.explanation || '') })
  } catch (error) {
    console.error('Analysis API error:', error)
    return NextResponse.json(
      { terms: [], explanation: 'Failed to analyze report. Please try again.' },
      { status: 500 }
    )
  }
}
