'use client'

import { Sparkles, Bot } from 'lucide-react'

interface SimplifiedExplanationProps {
  explanation: string
  isLoading?: boolean
}

export default function SimplifiedExplanation({ explanation, isLoading }: SimplifiedExplanationProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-sky-50 dark:from-violet-900/20 dark:to-sky-900/20 border border-violet-100/60 dark:border-violet-800/30 p-6 card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-sky-500 flex items-center justify-center animate-pulse shadow-lg shadow-violet-200/50">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-200">AI Generating Explanation</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please wait...</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gradient-to-r from-violet-200 to-sky-200 dark:from-violet-800 dark:to-sky-800 rounded-full animate-pulse w-3/4" />
          <div className="h-4 bg-gradient-to-r from-violet-200 to-sky-200 dark:from-violet-800 dark:to-sky-800 rounded-full animate-pulse w-1/2" />
          <div className="h-4 bg-gradient-to-r from-violet-200 to-sky-200 dark:from-violet-800 dark:to-sky-800 rounded-full animate-pulse w-5/6" />
          <div className="h-4 bg-gradient-to-r from-violet-200 to-sky-200 dark:from-violet-800 dark:to-sky-800 rounded-full animate-pulse w-2/3" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-sky-50 dark:from-violet-900/20 dark:to-sky-900/20 border border-violet-100/60 dark:border-violet-800/30 p-6 card-shadow animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-sky-500 flex items-center justify-center shadow-lg shadow-violet-200/50 dark:shadow-violet-900/30">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-200">AI Simplified Explanation</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Generative AI</p>
        </div>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
        {explanation}
      </div>
    </div>
  )
}
