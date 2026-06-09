'use client'

import { AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/app/LanguageProvider'

interface DisclaimerProps {
  variant?: 'banner' | 'card' | 'inline'
}

export default function Disclaimer({ variant = 'card' }: DisclaimerProps) {
  const { t } = useLanguage()

  if (variant === 'banner') {
    return (
      <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{t('disclaimer')}</p>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400 italic flex items-start gap-2">
        <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
        {t('disclaimer')}
      </p>
    )
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-1">Safety & Disclaimer</h3>
          <p className="text-sm text-amber-800 dark:text-amber-200/80 leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </div>
  )
}
