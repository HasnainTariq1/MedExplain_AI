import { MedicalTerm } from './types'

export async function generateSimplifiedExplanation(
  extractedText: string,
  language: string = 'en'
): Promise<{ terms: MedicalTerm[]; explanation: string }> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: extractedText, language }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.terms && Array.isArray(data.terms)) {
        const terms: MedicalTerm[] = data.terms.map((t: any) => ({
          name: t.name || '',
          value: t.value || '',
          unit: t.unit || '',
          referenceRange: t.referenceRange || '',
          status: ['Normal', 'High', 'Low', 'Slightly Abnormal'].includes(t.status) ? t.status : 'Normal',
          simpleMeaning: t.simpleMeaning || '',
        }))
        return { terms, explanation: data.explanation || '' }
      }
    }
  } catch {
    // fall through
  }

  return { terms: [], explanation: '' }
}

export async function generateChatResponse(
  message: string,
  terms: MedicalTerm[],
  extractedText: string,
  language: string = 'en'
): Promise<string> {
  try {
    const context = `Report text:\n${extractedText}\n\nIdentified tests:\n${JSON.stringify(terms)}`
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context, language }),
    })

    if (response.ok) {
      const data = await response.json()
      return data.response || getFallbackChatResponse(message, terms, language)
    }
  } catch {
    return getFallbackChatResponse(message, terms, language)
  }

  return getFallbackChatResponse(message, terms, language)
}

function getFallbackChatResponse(message: string, terms: MedicalTerm[], language: string): string {
  const lowerMsg = message.toLowerCase()

  const term = terms.find(t =>
    lowerMsg.includes(t.name.toLowerCase()) ||
    t.name.toLowerCase().includes(lowerMsg)
  )

  if (term) {
    if (language === 'it') {
      return `Per quanto riguarda ${term.name} (${term.value} ${term.unit}): ${term.simpleMeaning}\n\nIl tuo risultato è: ${term.status === 'Normal' ? 'Normale' : term.status === 'High' ? 'Alto' : term.status === 'Low' ? 'Basso' : 'Leggermente Anormale'}.\n\nRicorda: questa è solo una spiegazione educativa. Consulta il tuo medico per un'interpretazione completa.`
    }
    return `Regarding ${term.name} (${term.value} ${term.unit}): ${term.simpleMeaning}\n\nYour result is: ${term.status}.\n\nRemember: This is only an educational explanation. Please consult your doctor for a complete interpretation.`
  }

  if (lowerMsg.includes('normal') || lowerMsg.includes('health') || lowerMsg.includes('fine')) {
    if (language === 'it') return 'Dai risultati analizzati, alcuni valori sono normali e altri necessitano attenzione. Ti consiglio di discutere l\'intero referto con il tuo medico per una valutazione completa.'
    return 'Based on the analyzed results, some values are within normal range while others may need attention. I recommend discussing your full report with your doctor for a complete evaluation.'
  }

  if (language === 'it') {
    return 'Grazie per la tua domanda. Per darti una risposta più precisa, potresti chiedere informazioni su un valore specifico del tuo referto? Ad esempio: "Cosa significa LDL?" o "Il mio glucosio è alto?"'
  }
  return 'Thank you for your question. To give you a more accurate answer, could you ask about a specific value from your report? For example: "What does LDL mean?" or "Is my glucose high?"'
}
