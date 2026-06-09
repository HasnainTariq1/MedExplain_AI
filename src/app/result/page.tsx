'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AnalysisResult } from '../../../lib/types'
import ReportTable from '@/components/ReportTable'
import SimplifiedExplanation from '@/components/SimplifiedExplanation'
import ChatAssistant from '@/components/ChatAssistant'
import Disclaimer from '@/components/Disclaimer'
import { BarChart, Download, FileText, Info, ArrowLeft, Loader2 } from 'lucide-react'
import { useLanguage } from '../LanguageProvider'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
}

export default function ResultPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [downloading, setDownloading] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  const [result] = useState<AnalysisResult | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('medexplain-result')
      if (stored) {
        try {
          return JSON.parse(stored) as AnalysisResult
        } catch {
          return null
        }
      }
    }
    return null
  })

  useEffect(() => {
    if (!result) {
      router.push('/upload')
    }
  }, [result, router])

  useEffect(() => {
    if (result && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  const handleDownload = async () => {
    if (!result || downloading) return
    setDownloading(true)

    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ])

    const fontFamily = "'Segoe UI', 'Helvetica', Arial, sans-serif"

    const stethoscopeSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.3.3 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`

    const statusBadge = (status: string) => {
      const colors: Record<string, string> = {
        Normal: 'background:#16a34a;color:#fff',
        High: 'background:#dc2626;color:#fff',
        Low: 'background:#dc2626;color:#fff',
        'Slightly Abnormal': 'background:#d97706;color:#fff',
      }
      const badgeStyle = `display:inline-flex;align-items:center;padding:3px 10px;border-radius:100px;font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;white-space:nowrap;line-height:1;${colors[status] || 'background:#6b7280;color:#fff'}`
      return `<span style="${badgeStyle}">${status}</span>`
    }

    const html = `<!DOCTYPE html>
<html style="background:#fff;font-family:${fontFamily};width:720px">
<head><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:${fontFamily};color:#111827;width:720px;margin:0 auto;padding:36px 40px}
  .header{display:flex;align-items:center;gap:14px;margin-bottom:4px}
  .logo{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#7c3aed,#0ea5e9);display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .title{font-size:20px;font-weight:800;color:#1e1b4b}
  .subtitle{font-size:10px;color:#6b7280;margin-top:1px}
  .sep{border:0;border-top:1.5px solid #e5e7eb;margin:14px 0}
  .cards{display:flex;gap:10px;margin:18px 0}
  .card{flex:1;padding:12px 8px;border-radius:10px;text-align:center}
  .card-val{font-size:22px;font-weight:800}
  .card-lbl{font-size:8.5px;margin-top:3px;font-weight:500}
  h2{font-size:13px;font-weight:700;margin:20px 0 10px;color:#1e1b4b}
  table{width:100%;border-collapse:collapse;font-size:10px}
  th{background:#f4f2fb;text-align:left;padding:7px 8px;font-weight:700;color:#5b21b6;font-size:9px;text-transform:uppercase;letter-spacing:0.5px}
  td{padding:7px 8px;border-bottom:1px solid #f3f4f6;vertical-align:middle}
  .test-name{font-weight:600;color:#1e1b4b}
  .test-value{color:#374151;font-family:monospace}
  .test-ref{color:#6b7280}
  .test-status{text-align:center}
  .expl{font-size:10.5px;color:#6b7280;line-height:1.7;margin-top:6px}
  .disc{font-size:7.5px;color:#9ca3af;margin-top:18px;padding-top:10px;border-top:1px solid #e5e7eb;line-height:1.5}
</style></head>
<body>
  <div class="header">
    <div class="logo">${stethoscopeSvg}</div>
    <div><div class="title">MedExplain AI</div><div class="subtitle">AI-Powered Medical Report Analysis</div></div>
  </div>
  <hr class="sep">
  <div class="cards">
    <div class="card" style="background:#f9fafb"><div class="card-val" style="color:#374151">${result.summary.totalTests}</div><div class="card-lbl" style="color:#6b7280">Total Tests</div></div>
    <div class="card" style="background:#f0fdf4"><div class="card-val" style="color:#16a34a">${result.summary.normal}</div><div class="card-lbl" style="color:#16a34a">Normal</div></div>
    <div class="card" style="background:#fffbeb"><div class="card-val" style="color:#d97706">${result.summary.slightlyAbnormal}</div><div class="card-lbl" style="color:#d97706">Slight Abnormal</div></div>
    <div class="card" style="background:#fef2f2"><div class="card-val" style="color:#dc2626">${result.summary.abnormal}</div><div class="card-lbl" style="color:#dc2626">Needs Attention</div></div>
  </div>

  <h2>Detailed Results</h2>
  <table>
    <tr><th style="width:30%">Test</th><th style="width:18%">Value</th><th style="width:25%">Reference</th><th style="width:27%">Status</th></tr>
    ${result.terms.map(t => `<tr>
      <td class="test-name">${t.name}</td>
      <td class="test-value">${t.value}${t.unit ? ` <span style="color:#9ca3af;font-size:9px">${t.unit}</span>` : ''}</td>
      <td class="test-ref">${t.referenceRange}</td>
      <td class="test-status">${statusBadge(t.status)}</td>
    </tr>`).join('')}
  </table>

  <h2>Simplified Explanation</h2>
  <div class="expl">${result.simplifiedExplanation.replace(/\n/g, '<br>')}</div>

  <div class="disc">${result.disclaimer}</div>
</body></html>`

    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.left = '-9999px'
    iframe.style.top = '0'
    iframe.style.width = '720px'
    iframe.style.height = '0'
    iframe.style.border = 'none'
    document.body.appendChild(iframe)

    const iframeDoc = iframe.contentDocument || iframe.contentWindow!.document
    iframeDoc.open()
    iframeDoc.write(html)
    iframeDoc.close()

    await document.fonts.ready

    const canvas = await html2canvas(iframeDoc.body, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: 720,
      backgroundColor: '#ffffff',
    })

    document.body.removeChild(iframe)

    const imgData = canvas.toDataURL('image/png')
    const doc = new jsPDF({ unit: 'px', format: 'a4' })
    const pdfW = doc.internal.pageSize.getWidth()
    const pdfH = doc.internal.pageSize.getHeight()
    const imgW = canvas.width / 2
    const imgH = canvas.height / 2
    const ratio = Math.min(pdfW / imgW, pdfH / imgH)

    if (imgH * ratio > pdfH) {
      let remaining = imgH
      let offset = 0
      while (remaining > 0) {
        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = canvas.width
        pageCanvas.height = Math.min(canvas.height * (pdfH / (imgH * ratio)), canvas.height - offset * (canvas.height / (imgH / ratio)))
        const ctx = pageCanvas.getContext('2d')!
        ctx.drawImage(canvas, 0, -offset * (canvas.height / (imgH / ratio)))
        const pageData = pageCanvas.toDataURL('image/png')
        if (offset > 0) doc.addPage()
        doc.addImage(pageData, 'PNG', 0, 0, pdfW, (pageCanvas.height / 2) * ratio)
        offset += pdfH / ratio
        remaining -= pdfH / ratio
      }
    } else {
      doc.addImage(imgData, 'PNG', 0, 0, imgW * ratio, imgH * ratio)
    }

      doc.save('MedExplain-Report-Summary.pdf')
    } catch {
      console.error('PDF generation failed')
    } finally {
      setDownloading(false)
    }
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-8 h-8 text-violet-500" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push('/upload')}
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Upload another report
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-sky-500 flex items-center justify-center shadow-lg shadow-violet-200/50 dark:shadow-violet-900/30">
              <BarChart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('result.title')}</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm ml-15">Analysis complete with {result.summary.totalTests} tests identified</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          disabled={downloading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-all duration-200 text-sm font-medium ${
            downloading
              ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 text-violet-400 cursor-wait'
              : 'bg-white dark:bg-[#12102e]/80 border-violet-100 dark:border-violet-800/30 text-gray-700 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 hover:shadow-md'
          }`}
        >
          {downloading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF &hellip;</>
          ) : (
            <><Download className="w-4 h-4" /> {t('result.download')}</>
          )}
        </motion.button>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="bg-white dark:bg-[#12102e]/80 rounded-2xl border border-violet-100 dark:border-violet-800/30 p-7 card-shadow">
          <h2 className="font-semibold text-gray-900 dark:text-gray-200 mb-5 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-violet-500 dark:text-violet-400" />
            {t('result.summary')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30 rounded-xl p-5 text-center border border-gray-100 dark:border-gray-800">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{result.summary.totalTests}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Tests</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 text-center border border-green-100 dark:border-green-800/30">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{result.summary.normal}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Normal</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 text-center border border-amber-100 dark:border-amber-800/30">
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{result.summary.slightlyAbnormal}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Slight Abnormal</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50/50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-5 text-center border border-rose-100 dark:border-rose-800/30">
              <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">{result.summary.abnormal}</p>
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">Needs Attention</p>
            </div>
          </div>
        </motion.div>

        <motion.div ref={tableRef} variants={fadeInUp} className="bg-white dark:bg-[#12102e]/80 rounded-2xl border border-violet-100 dark:border-violet-800/30 overflow-hidden card-shadow">
          <div className="p-6 border-b border-violet-100 dark:border-violet-800/30 bg-gradient-to-r from-violet-50/30 to-transparent dark:from-violet-900/10">
            <h2 className="font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              {t('result.table')}
            </h2>
          </div>
          <ReportTable terms={result.terms} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <SimplifiedExplanation explanation={result.simplifiedExplanation} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ChatAssistant terms={result.terms} extractedText={result.extractedText} />
        </motion.div>

        <motion.div variants={fadeInUp} className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/60 dark:border-blue-800/30 p-6 card-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center shrink-0">
              <Info className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Understanding Your Results</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200/80 space-y-1">
                <li>• <strong>Green</strong> = Normal range &mdash; these values look good</li>
                <li>• <strong>Orange</strong> = Slightly abnormal &mdash; may not be serious, but worth discussing</li>
                <li>• <strong>Red</strong> = Outside normal range &mdash; may need medical attention</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Disclaimer />
        </motion.div>
      </motion.div>
    </div>
  )
}
