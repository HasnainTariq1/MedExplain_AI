'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/app/LanguageProvider'

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'it' as const, label: 'IT' },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1.5 bg-violet-50/50 dark:bg-violet-900/20 rounded-xl p-1 border border-violet-100 dark:border-violet-800/30">
      <Globe className="w-3.5 h-3.5 text-violet-400 ml-1" />
      {languages.map(lang => (
        <motion.button
          key={lang.code}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLanguage(lang.code)}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
            language === lang.code
              ? 'bg-white dark:bg-violet-800/50 text-violet-600 dark:text-violet-400 shadow-sm'
              : 'text-violet-500 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300'
          }`}
        >
          {lang.label}
        </motion.button>
      ))}
    </div>
  )
}
