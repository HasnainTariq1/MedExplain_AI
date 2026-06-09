'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, MessageSquare } from 'lucide-react'
import { ChatMessage, MedicalTerm } from '../../lib/types'
import { useLanguage } from '@/app/LanguageProvider'

interface ChatAssistantProps {
  terms: MedicalTerm[]
  extractedText: string
}

export default function ChatAssistant({ terms, extractedText }: ChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('medexplain-chat')
        if (saved) return JSON.parse(saved)
      } catch { /* empty */ }
    }
    return []
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)
  const { t } = useLanguage()

  useEffect(() => {
    try { sessionStorage.setItem('medexplain-chat', JSON.stringify(messages)) } catch { /* empty */ }
  }, [messages])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const last = messages[messages.length - 1]
    if (last?.role === 'assistant' && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  const buildReportContext = (): string => {
    let ctx = 'Medical report analysis:\n'
    ctx += `Total tests identified: ${terms.length}\n\n`
    for (const t of terms) {
      ctx += `- ${t.name}: ${t.value} ${t.unit} (reference: ${t.referenceRange}, status: ${t.status})\n`
      ctx += `  What it means: ${t.simpleMeaning}\n`
    }
    ctx += `\nRaw report text:\n${extractedText.slice(0, 3000)}`
    return ctx
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input.trim(), timestamp: Date.now() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
          reportContext: buildReportContext(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const reply = data.response || 'I could not process your question. Please try again.'
        const responseObj: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply + '\n\n⚠️ *Educational Purpose Only:* This information is for educational purposes and does not constitute medical advice. Always consult a qualified healthcare professional.',
          timestamp: Date.now(),
        }
        setMessages(prev => [...prev, responseObj])
      } else {
        throw new Error('API request failed')
      }
    } catch {
      const fallback = generateFallbackResponse(userMessage.content, terms)
      const responseObj: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallback + '\n\n⚠️ *Educational Purpose Only:* This information is for educational purposes and does not constitute medical advice. Always consult a qualified healthcare professional.',
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, responseObj])
    }

    setIsLoading(false)
  }

  const handleSuggestedQuestion = (q: string) => setInput(q)

  const suggestedQuestions = [
    `What does ${terms[0]?.name || 'my result'} mean?`,
    'Are my results normal?',
    'What should I ask my doctor?',
    'Give me a summary',
  ].filter((v, i, a) => a.indexOf(v) === i)

  return (
    <div className="rounded-2xl border border-violet-100 dark:border-violet-800/30 overflow-hidden bg-white dark:bg-[#12102e]/80 card-shadow">
      <div className="bg-gradient-to-r from-violet-500 to-sky-500 p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-sm">{t('result.chat')}</h3>
          <p className="text-xs text-white/80">Ask questions about your report</p>
        </div>
      </div>

      <div ref={messagesContainerRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-violet-50/30 to-transparent dark:from-violet-900/10 dark:to-transparent">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-violet-300 dark:text-violet-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Ask anything about your medical report</p>
            {terms.length > 0 && (
              <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                {terms.length} tests identified &middot; {terms.filter(t => t.status !== 'Normal').length} need attention
              </div>
            )}
            <div className="mt-4">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{t('chat.prompts')}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map(q => (
                  <button key={q} onClick={() => handleSuggestedQuestion(q)}
                    className="px-3 py-1.5 text-xs bg-white dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/30 rounded-full text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-200">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-sky-500 flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user'
                ? 'bg-gradient-to-r from-violet-500 to-sky-500 text-white rounded-2xl rounded-tr-md px-4 py-2.5 shadow-md'
                : 'bg-white dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30 rounded-2xl rounded-tl-md px-4 py-2.5'}`}>
                <p className={`text-sm whitespace-pre-line ${msg.role === 'user' ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-sky-100 dark:from-violet-900/50 dark:to-sky-900/50 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-sky-500 flex items-center justify-center shadow-md">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-violet-300 dark:bg-violet-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-violet-300 dark:bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-violet-300 dark:bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-violet-100 dark:border-violet-800/30 p-4 bg-white dark:bg-[#12102e]/40">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={t('chat.placeholder')}
            className="flex-1 px-4 py-2.5 rounded-xl border border-violet-200 dark:border-violet-800/30 bg-white dark:bg-violet-900/10 text-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-violet-400 dark:focus:border-violet-600 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/30 transition-all duration-200" />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-sky-500 text-white hover:from-violet-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-md shadow-violet-200/50 dark:shadow-violet-900/30">
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

function generateFallbackResponse(message: string, terms: MedicalTerm[]): string {
  const lowerMsg = message.toLowerCase().trim()
  const abnormalTerms = terms.filter(t => t.status !== 'Normal')
  const normalTerms = terms.filter(t => t.status === 'Normal')

  const matchedTerm = terms.find(t => {
    const nameLower = t.name.toLowerCase()
    if (lowerMsg.includes(nameLower)) return true
    const words = lowerMsg.split(/\s+/)
    const nameWords = nameLower.split(/\s+/)
    for (const w of words) {
      if (w.length > 2 && nameLower.includes(w)) return true
      for (const nw of nameWords) {
        if (nw.length > 2 && nw.includes(w)) return true
      }
    }
    return false
  })

  if (matchedTerm) {
    const dir = matchedTerm.status === 'Normal' ? 'within' :
      matchedTerm.status === 'High' ? 'higher than' :
      matchedTerm.status === 'Low' ? 'lower than' : 'slightly outside'
    const concern = matchedTerm.status === 'Normal'
      ? 'This is a good result and falls within the normal range.'
      : `This value is ${dir} the normal range (${matchedTerm.referenceRange}). ${matchedTerm.status === 'Slightly Abnormal' ? 'This is only slightly abnormal and may not be serious. Discuss it with your doctor.' : 'Please discuss this with your doctor for proper evaluation.'}`
    return `**${matchedTerm.name}** — your result: ${matchedTerm.value} ${matchedTerm.unit}\n\n${matchedTerm.simpleMeaning}\n\n${concern}`
  }

  if (lowerMsg.includes('high') || lowerMsg.includes('elevat') || lowerMsg.includes('abnormal')) {
    if (abnormalTerms.length === 0) return 'All your tested values are within normal range.'
    let r = `Values outside normal range:\n\n`
    for (const t of abnormalTerms) {
      r += `• **${t.name}**: ${t.value} ${t.unit} (ref: ${t.referenceRange}) — **${t.status}**\n  ${t.simpleMeaning}\n\n`
    }
    return r
  }

  if (lowerMsg.includes('normal') || lowerMsg.includes('good') || lowerMsg.includes('fine')) {
    if (normalTerms.length === 0) return 'No values were found within the normal reference range. Please discuss all results with your doctor.'
    let r = `Values within normal range:\n\n`
    for (const t of normalTerms) r += `• **${t.name}**: ${t.value} ${t.unit}\n`
    if (abnormalTerms.length > 0) r += `\nHowever, ${abnormalTerms.length} value${abnormalTerms.length > 1 ? 's' : ''} ${abnormalTerms.length > 1 ? 'are' : 'is'} outside range.`
    else r += '\n\nAll results are normal!'
    return r
  }

  if (lowerMsg.includes('summary') || lowerMsg.includes('overall') || lowerMsg.includes('my report')) {
    let s = `I analyzed your report and found ${terms.length} test results. `
    if (abnormalTerms.length > 0) {
      s += `${abnormalTerms.length} value${abnormalTerms.length > 1 ? 's' : ''} outside normal range: `
      s += abnormalTerms.map(t => `${t.name} (${t.value} ${t.unit})`).join(', ') + '. '
    }
    if (normalTerms.length > 0) {
      s += `${normalTerms.length} value${normalTerms.length > 1 ? 's' : ''} within normal range.`
    }
    return s
  }

  if (terms.length > 0) {
    return `I can help you understand your report. Try asking:\n${terms.slice(0, 4).map(t => `• "Tell me about ${t.name}"`).join('\n')}\n• "Are my results normal?"\n• "What should I ask my doctor?"`
  }

  return 'Could you ask about a specific test from your report? For example: "What does my hemoglobin level mean?"'
}
