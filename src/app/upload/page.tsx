'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import UploadZone from '@/components/UploadZone'
import Disclaimer from '@/components/Disclaimer'
import { MedicalChart } from '@/components/MedicalIllustrations'
import { extractText, getDemoExtractedText } from '../../../lib/ocrUtils'
import { getDemoMedicalTerms } from '../../../lib/medicalAnalysis'
import { generateSimplifiedExplanation } from '../../../lib/aiSimplification'
import { AnalysisResult } from '../../../lib/types'
import { useLanguage } from '../LanguageProvider'
import { FileText, Beaker, Sparkles, Globe, Loader2, AlertCircle } from 'lucide-react'

const languages = [
  { code: 'en' as const, label: 'English' },
  { code: 'it' as const, label: 'Italiano' },
]

export default function UploadPage() {
  const router = useRouter()
  const { t, language, setLanguage } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const extractedTextRef = useRef('')
  const [editableText, setEditableText] = useState('')
  const [extractionDone, setExtractionDone] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelected = () => {
    setError('')
    setExtractionDone(false)
    extractedTextRef.current = ''
    setEditableText('')
  }

  const handleAnalyze = async () => {
    if (!file) return
    setIsProcessing(true)
    setError('')

    try {
      const text = await extractText(file)
      extractedTextRef.current = text
      setEditableText(text)
      setExtractionDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract text')
      setExtractionDone(false)
    }

    setIsProcessing(false)
  }

  const handleAnalyzeText = async () => {
    if (!editableText.trim()) {
      setError('Please enter or correct the extracted text before analysis.')
      return
    }

    setIsAnalyzing(true)
    setError('')

    try {
      const { terms, explanation } = await generateSimplifiedExplanation(editableText, language)

      const result: AnalysisResult = {
        terms,
        extractedText: editableText,
        simplifiedExplanation: explanation,
        summary: {
          totalTests: terms.length,
          normal: terms.filter(t => t.status === 'Normal').length,
          abnormal: terms.filter(t => t.status === 'High' || t.status === 'Low').length,
          slightlyAbnormal: terms.filter(t => t.status === 'Slightly Abnormal').length,
        },
        disclaimer: t('disclaimer'),
      }

      sessionStorage.removeItem('medexplain-chat')
      sessionStorage.setItem('medexplain-result', JSON.stringify(result))
      router.push('/result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    }

    setIsAnalyzing(false)
  }

  const handleUseDemo = async () => {
    setIsAnalyzing(true)
    setError('')

    const demoText = getDemoExtractedText()
    const { terms, explanation } = await generateSimplifiedExplanation(demoText, language)

    const finalTerms = terms.length > 0 ? terms : getDemoMedicalTerms()
    const finalExplanation = explanation || ''

    const result: AnalysisResult = {
      terms: finalTerms,
      extractedText: demoText,
      simplifiedExplanation: finalExplanation,
      summary: {
        totalTests: finalTerms.length,
        normal: finalTerms.filter(t => t.status === 'Normal').length,
        abnormal: finalTerms.filter(t => t.status === 'High' || t.status === 'Low').length,
        slightlyAbnormal: finalTerms.filter(t => t.status === 'Slightly Abnormal').length,
      },
      disclaimer: t('disclaimer'),
    }

    sessionStorage.removeItem('medexplain-chat')
    sessionStorage.setItem('medexplain-result', JSON.stringify(result))
    router.push('/result')
    setIsAnalyzing(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mx-auto mb-6 w-64"
        >
          <MedicalChart className="w-full h-auto" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('upload.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">Upload a medical report to get started</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <UploadZone
          onFileSelected={handleFileSelected}
          onAnalyze={handleAnalyze}
          isProcessing={isProcessing}
          file={file}
          setFile={setFile}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </motion.div>
        )}

        {extractionDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-sky-500 dark:text-sky-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-200">{t('extracted.text')}</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('extracted.edit')}</p>
            <textarea
              value={editableText}
              onChange={e => setEditableText(e.target.value)}
              rows={10}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-sm font-mono text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 focus:outline-none focus:border-sky-300 dark:focus:border-sky-700 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900 resize-y transition-all duration-200"
            />
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-1.5 border border-gray-200 dark:border-gray-700 w-fit">
              <Globe className="w-4 h-4 text-gray-500 ml-1" />
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    language === lang.code
                      ? 'bg-white dark:bg-gray-700 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyzeText}
              disabled={isAnalyzing || !editableText.trim()}
              className="w-full py-3 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-sky-200 dark:shadow-sky-900 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Beaker className="w-5 h-5" />
                  {t('upload.analyze')}
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-50 dark:bg-gray-950 text-sm text-gray-400 dark:text-gray-500">or</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUseDemo}
          disabled={isAnalyzing}
          className="w-full py-4 px-6 rounded-xl text-gray-700 dark:text-gray-300 font-medium bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-sky-900/10 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
          {t('upload.demo')}
        </motion.button>

        <Disclaimer variant="banner" />
      </motion.div>
    </div>
  )
}
