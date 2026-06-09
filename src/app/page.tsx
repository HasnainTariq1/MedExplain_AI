'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Upload, FileText, MessageSquare, Globe, Shield, Sparkles, Heart, Activity, Beaker } from 'lucide-react'
import Disclaimer from '@/components/Disclaimer'
import { DoctorPatient, MedicalChart, HealthAnalysis, MedicineHealth } from '@/components/MedicalIllustrations'
import { useLanguage } from './LanguageProvider'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

export default function Home() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Upload Reports',
      desc: 'Upload PDF, JPG, or PNG medical reports with our simple drag-and-drop interface.',
      gradient: 'from-violet-400 to-purple-500',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      iconColor: 'text-violet-500 dark:text-violet-400',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'OCR Extraction',
      desc: 'Automatically extract text from scanned reports and images using AI-powered OCR.',
      gradient: 'from-sky-400 to-cyan-500',
      bg: 'bg-sky-50 dark:bg-sky-900/20',
      iconColor: 'text-sky-500 dark:text-sky-400',
    },
    {
      icon: <Beaker className="w-6 h-6" />,
      title: 'Medical Analysis',
      desc: 'Identify test names, values, and reference ranges with intelligent pattern recognition.',
      gradient: 'from-fuchsia-400 to-pink-500',
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20',
      iconColor: 'text-fuchsia-500 dark:text-fuchsia-400',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI Simplification',
      desc: 'Convert complex medical jargon into simple, easy-to-understand language.',
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      iconColor: 'text-amber-500 dark:text-amber-400',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'AI Chat Assistant',
      desc: 'Ask questions about your report and get instant, patient-friendly answers.',
      gradient: 'from-rose-400 to-pink-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
      iconColor: 'text-rose-500 dark:text-rose-400',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multi-Language',
      desc: 'Get explanations in English or Italian to match your preference.',
      gradient: 'from-teal-400 to-emerald-500',
      bg: 'bg-teal-50 dark:bg-teal-900/20',
      iconColor: 'text-teal-500 dark:text-teal-400',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-white to-sky-50/80 dark:from-violet-950/40 dark:via-gray-950 dark:to-sky-950/40" />
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-200/40 dark:from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-sky-200/20 dark:from-sky-500/5 via-transparent to-transparent" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-violet-300/20 dark:bg-violet-500/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-sky-300/20 dark:bg-sky-500/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-sky-100 dark:from-violet-900/40 dark:to-sky-900/40 text-violet-700 dark:text-violet-300 text-sm font-medium border border-violet-200/50 dark:border-violet-800/30 shadow-sm">
                <Sparkles className="w-4 h-4" />
                AI-Powered Healthcare Communication
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gradient">
                {t('app.title')}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {t('app.tagline')}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  href="/upload"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white font-semibold bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-600 hover:to-sky-600 transition-all duration-300 shadow-xl shadow-violet-200/50 dark:shadow-violet-900/30 active:scale-[0.98] hover:shadow-2xl hover:shadow-violet-300/40 dark:hover:shadow-violet-800/40"
                >
                  <Upload className="w-5 h-5" />
                  Upload Report
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-gray-700 dark:text-gray-300 font-semibold bg-white dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/30 hover:border-violet-400 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Learn More
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-10 pt-4">
                {[
                  { label: 'Reports Analyzed', value: '100+' },
                  { label: 'Languages', value: '2' },
                  { label: 'Tests Identified', value: '25+' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-sky-400/20 dark:from-violet-500/10 dark:to-sky-500/10 rounded-full blur-3xl" />
                <div className="relative bg-white/70 dark:bg-[#12102e]/60 backdrop-blur-sm rounded-3xl shadow-xl border border-violet-100 dark:border-violet-800/30 p-6">
                  <DoctorPatient className="w-full h-auto" />
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-rose-500 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400">
                      <Heart className="w-4 h-4" />
                      Your LDL is slightly elevated
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400">
                      <Activity className="w-4 h-4" />
                      Glucose needs attention
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-green-500 bg-green-50 dark:bg-green-900/20 dark:text-green-400">
                      <Shield className="w-4 h-4" />
                      Other values look good!
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 text-center">
                    ⚠️ Educational purposes only. Always consult a doctor.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-[#0a0820] relative">
        <div className="absolute inset-0 bg-dots" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">How It Works</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three simple steps to understand your medical report
            </motion.p>
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                ill: <MedicalChart className="w-full h-32 -mt-2 mb-2" />,
                title: 'Upload Report',
                desc: 'Upload your medical report as PDF or image. Our system supports all common formats.',
              },
              {
                step: '02',
                ill: <HealthAnalysis className="w-full h-32 -mt-2 mb-2" />,
                title: 'AI Analysis',
                desc: 'Our AI extracts and analyzes medical terms, values, and reference ranges from your report.',
              },
              {
                step: '03',
                ill: <MedicineHealth className="w-full h-32 -mt-2 mb-2" />,
                title: 'Simple Explanation',
                desc: 'Get a clear, patient-friendly explanation of your results with AI-powered simplification.',
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative text-center p-6 rounded-2xl bg-gradient-to-br from-violet-50/50 to-sky-50/50 dark:from-violet-900/10 dark:to-sky-900/10 border border-violet-100/50 dark:border-violet-800/20 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl dark:hover:shadow-violet-900/30 transition-all duration-300 card-shadow"
              >
                <div className="absolute top-4 right-4 text-5xl font-bold text-violet-200/50 dark:text-violet-800/30 select-none leading-none">{s.step}</div>
                <div className="mx-auto mb-3">
                  {s.ill}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f4f2fb] dark:bg-[#0f0d2e]" />
        <div className="absolute inset-0 bg-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Powerful Features</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to understand your medical reports
            </motion.p>
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group p-7 rounded-2xl bg-white dark:bg-[#12102e]/80 border border-violet-100 dark:border-violet-800/30 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 card-shadow"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 transition-shadow duration-300`}
                >
                  <div className={feature.iconColor}>
                    {feature.icon}
                  </div>
                </motion.div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-700 to-sky-800 dark:from-violet-800 dark:via-indigo-900 dark:to-sky-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet-300/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-dots opacity-30" />
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-4">Ready to Understand Your Report?</motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-violet-100/80 mb-10 max-w-2xl mx-auto">
            Upload your medical report now and get a clear, AI-powered explanation in seconds.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/upload"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-violet-700 font-semibold hover:bg-violet-50 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-[0.98]"
            >
              <Upload className="w-5 h-5" />
              Upload Your Report
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-white dark:bg-[#0a0820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer variant="banner" />
        </div>
      </section>
    </div>
  )
}
