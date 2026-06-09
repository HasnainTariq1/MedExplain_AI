'use client'

import { MedicalTerm } from '../../lib/types'
import { CheckCircle, AlertTriangle, XCircle, MinusCircle } from 'lucide-react'
import { useLanguage } from '@/app/LanguageProvider'

interface ReportTableProps {
  terms: MedicalTerm[]
}

const statusIcons: Record<string, React.ReactNode> = {
  'Normal': <CheckCircle className="w-4 h-4 text-green-500" />,
  'Slightly Abnormal': <AlertTriangle className="w-4 h-4 text-amber-500" />,
  'High': <XCircle className="w-4 h-4 text-rose-500" />,
  'Low': <MinusCircle className="w-4 h-4 text-rose-500" />,
}

const statusColors: Record<string, string> = {
  'Normal': 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/30',
  'Slightly Abnormal': 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30',
  'High': 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/30',
  'Low': 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/30',
}

export default function ReportTable({ terms }: ReportTableProps) {
  const { t } = useLanguage()

  if (terms.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No medical terms could be identified from the text.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-violet-100 dark:border-violet-800/30">
            <th className="text-left py-4 px-4 text-sm font-semibold text-violet-700 dark:text-violet-400">{t('test.name')}</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-violet-700 dark:text-violet-400">{t('test.value')}</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-violet-700 dark:text-violet-400">{t('test.range')}</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-violet-700 dark:text-violet-400">{t('test.status')}</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-violet-700 dark:text-violet-400">{t('test.meaning')}</th>
          </tr>
        </thead>
        <tbody>
          {terms.map((term) => (
            <tr
              key={term.name}
              className={`border-b border-violet-100 dark:border-violet-800/30 transition-colors hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-transparent dark:hover:from-violet-900/10 ${
                term.status !== 'Normal' ? 'bg-gradient-to-r from-amber-50/30 to-transparent dark:from-amber-900/10' : ''
              }`}
            >
              <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-gray-200">{term.name}</td>
              <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300 font-mono">
                {term.value} {term.unit && <span className="text-gray-500 dark:text-gray-400">{term.unit}</span>}
              </td>
              <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{term.referenceRange}</td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[term.status] || 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                  {statusIcons[term.status]}
                  {term.status === 'High' ? t('abnormal.high') :
                   term.status === 'Low' ? t('abnormal.low') :
                   term.status === 'Slightly Abnormal' ? t('abnormal.slightly') :
                   t('abnormal.normal')}
                </span>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                {term.simpleMeaning}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
