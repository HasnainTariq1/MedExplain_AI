import { LanguageCode, TranslationMap } from './types'

const translations: TranslationMap = {
  'app.title': {
    en: 'MedExplain AI',
    it: 'MedExplain AI',
  },
  'app.tagline': {
    en: 'Simplifying Medical Reports into Patient-Friendly Language',
    it: 'Semplificare i Referti Medici in un Linguaggio Semplice',
  },
  'nav.home': { en: 'Home', it: 'Home' },
  'nav.upload': { en: 'Upload Report', it: 'Carica Referto' },
  'nav.about': { en: 'About', it: 'Informazioni' },
  'disclaimer': {
    en: 'MedExplain AI is designed for educational and informational purposes only. It does not provide medical diagnosis, treatment, or emergency advice. Always consult a qualified healthcare professional for medical decisions.',
    it: 'MedExplain AI è progettato solo a scopo educativo e informativo. Non fornisce diagnosi mediche, trattamenti o consigli di emergenza. Consulta sempre un medico qualificato per decisioni mediche.',
  },
  'upload.title': { en: 'Upload Your Medical Report', it: 'Carica il Tuo Referto Medico' },
  'upload.dragdrop': { en: 'Drag & drop your medical report here, or click to browse', it: 'Trascina il referto medico qui, o clicca per cercare' },
  'upload.supported': { en: 'Supported formats: PDF, JPG, PNG', it: 'Formati supportati: PDF, JPG, PNG' },
  'upload.analyze': { en: 'Analyze Report', it: 'Analizza Referto' },
  'upload.demo': { en: 'Use Demo Report', it: 'Usa Referto di Esempio' },
  'result.title': { en: 'Report Analysis Results', it: 'Risultati Analisi Referto' },
  'result.summary': { en: 'Report Summary', it: 'Riepilogo Referto' },
  'result.table': { en: 'Medical Test Results', it: 'Risultati Test Medici' },
  'result.explanation': { en: 'Simplified Explanation', it: 'Spiegazione Semplificata' },
  'result.chat': { en: 'Ask About Your Report', it: 'Chiedi sul Tuo Referto' },
  'result.download': { en: 'Download Summary', it: 'Scarica Riepilogo' },
  'chat.placeholder': { en: 'Ask a question about your report...', it: 'Fai una domanda sul tuo referto...' },
  'chat.prompts': { en: 'Suggested Questions', it: 'Domande Suggerite' },
  'abnormal.high': { en: 'High', it: 'Alto' },
  'abnormal.low': { en: 'Low', it: 'Basso' },
  'abnormal.normal': { en: 'Normal', it: 'Normale' },
  'abnormal.slightly': { en: 'Slightly Abnormal', it: 'Leggermente Anormale' },
  'test.name': { en: 'Test Name', it: 'Nome Test' },
  'test.value': { en: 'Value', it: 'Valore' },
  'test.range': { en: 'Reference Range', it: 'Intervallo di Riferimento' },
  'test.status': { en: 'Status', it: 'Stato' },
  'test.meaning': { en: 'Simple Meaning', it: 'Significato Semplice' },
  'language.select': { en: 'Language', it: 'Lingua' },
  'about.title': { en: 'About MedExplain AI', it: 'Informazioni su MedExplain AI' },
  'extracted.text': { en: 'Extracted Text', it: 'Testo Estratto' },
  'extracted.edit': { en: 'You can edit the extracted text below to correct any OCR mistakes:', it: 'Puoi modificare il testo estratto qui sotto per correggere errori OCR:' },
}

export function translate(key: string, language: LanguageCode): string {
  return translations[key]?.[language] || translations[key]?.en || key
}

export function getTranslations(language: LanguageCode): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(translations)) {
    result[key] = value[language] || value.en
  }
  return result
}

export { translations }
