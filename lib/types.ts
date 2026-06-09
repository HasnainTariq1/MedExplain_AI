export interface MedicalTerm {
  name: string
  value: string
  unit: string
  referenceRange: string
  status: 'Normal' | 'High' | 'Low' | 'Slightly Abnormal'
  simpleMeaning: string
}

export interface AnalysisResult {
  terms: MedicalTerm[]
  extractedText: string
  simplifiedExplanation: string
  summary: {
    totalTests: number
    normal: number
    abnormal: number
    slightlyAbnormal: number
  }
  disclaimer: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export type LanguageCode = 'en' | 'it'

export interface TranslationMap {
  [key: string]: {
    en: string
    it: string
  }
}
