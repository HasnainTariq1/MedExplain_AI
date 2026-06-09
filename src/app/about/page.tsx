'use client'

import { motion } from 'framer-motion'
import { Bot, GraduationCap, Heart, Shield, Code2, ArrowRight } from 'lucide-react'
import { useLanguage } from '../LanguageProvider'
import Disclaimer from '@/components/Disclaimer'
import { HealthAnalysis } from '@/components/MedicalIllustrations'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="text-center mb-16"
      >
        <motion.div
          variants={{
            initial: { scale: 0 },
            animate: { scale: 1 },
          }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mx-auto mb-6 w-72"
        >
          <HealthAnalysis className="w-full h-auto" />
        </motion.div>
        <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t('about.title')}</motion.h1>
        <motion.p variants={fadeInUp} className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Bridging the gap between complex medical language and patient understanding
        </motion.p>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="bg-white dark:bg-[#12102e]/80 rounded-2xl border border-violet-100 dark:border-violet-800/30 p-8 card-shadow">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            MedExplain AI is a Generative AI-powered web application designed to help patients understand
            their medical reports in simple, clear language. Medical reports are often filled with complex
            terminology and numerical values that can be confusing and anxiety-inducing for patients.
            Our system bridges this gap by using AI to translate medical jargon into patient-friendly
            explanations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: <GraduationCap className="w-6 h-6" />,
              title: 'Educational Purpose',
              desc: 'Designed as a university project for "AI for Industrial Applications" course. The system demonstrates practical applications of Generative AI in healthcare communication.',
              gradient: 'from-violet-400 to-purple-500',
            },
            {
              icon: <Bot className="w-6 h-6" />,
              title: 'Powered by AI',
              desc: 'Uses advanced AI models and rule-based medical analysis to identify test results, explain medical terms, and generate patient-friendly explanations.',
              gradient: 'from-sky-400 to-cyan-500',
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: 'Patient-Centered',
              desc: 'Built with the goal of empowering patients with better understanding of their health information through clear, accessible language.',
              gradient: 'from-rose-400 to-pink-500',
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Safety First',
              desc: 'Every explanation includes a clear disclaimer. This tool is for educational purposes only and does not replace professional medical advice.',
              gradient: 'from-amber-400 to-orange-500',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-white dark:bg-[#12102e]/80 border border-violet-100 dark:border-violet-800/30 hover:border-violet-300 dark:hover:border-violet-700 card-shadow transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 text-white shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="bg-white dark:bg-[#12102e]/80 rounded-2xl border border-violet-100 dark:border-violet-800/30 p-8 card-shadow">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-6">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Next.js', desc: 'React framework' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Tesseract.js', desc: 'OCR engine' },
              { name: 'Framer Motion', desc: 'Animations' },
              { name: 'OpenAI API', desc: 'AI generation' },
              { name: 'pdfjs-dist', desc: 'PDF parsing' },
              { name: 'React Dropzone', desc: 'File upload' },
              { name: 'Lucide Icons', desc: 'UI icons' },
            ].map((tech, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center p-5 rounded-xl bg-gradient-to-br from-violet-50/50 to-sky-50/50 dark:from-violet-900/10 dark:to-sky-900/10 border border-violet-100/50 dark:border-violet-800/20 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-200"
              >
                <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">{tech.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="rounded-2xl bg-gradient-to-br from-violet-50 to-sky-50 dark:from-violet-900/20 dark:to-sky-900/20 border border-violet-100/60 dark:border-violet-800/30 p-8 card-shadow">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-sky-500 flex items-center justify-center shrink-0 shadow-lg shadow-violet-200/50 dark:shadow-violet-900/30">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2 text-lg">Academic Project</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                This project was developed as part of the &ldquo;AI for Industrial Applications&rdquo; course.
                It demonstrates the practical application of Generative AI and natural language
                processing in the healthcare domain. The system is designed for educational purposes
                to show how AI can help improve doctor-patient communication.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Disclaimer />
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center pt-4">
          <Link
            href="/upload"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-600 hover:to-sky-600 transition-all duration-300 shadow-xl shadow-violet-200/50 dark:shadow-violet-900/30 hover:shadow-2xl hover:shadow-violet-300/40 dark:hover:shadow-violet-800/40 active:scale-[0.98]"
          >
            Try MedExplain AI Now
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
