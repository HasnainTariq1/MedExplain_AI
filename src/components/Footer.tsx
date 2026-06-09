'use client'

import { Stethoscope, Heart, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/app/LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-indigo-950 to-sky-950 dark:from-black dark:via-indigo-950 dark:to-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-400/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-violet-300 to-sky-300 bg-clip-text text-transparent">
                  {t('app.title')}
                </span>
              </div>
            </div>
            <p className="text-violet-200/60 text-sm leading-relaxed max-w-xs">
              {t('app.tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-violet-300 uppercase tracking-wider mb-4">Quick Links</h3>
            <div className="space-y-3">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/upload', label: t('nav.upload') },
                { href: '/about', label: t('nav.about') },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm text-violet-200/50 hover:text-white transition-colors duration-200 w-fit"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-violet-300 uppercase tracking-wider mb-4">Disclaimer</h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm text-violet-200/50 leading-relaxed">
                {t('disclaimer')}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-violet-200/30">
            &copy; {new Date().getFullYear()} {t('app.title')}. Educational Project.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-sm text-violet-200/30 flex items-center gap-1.5">
              Made with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> for better healthcare
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-violet-300 hover:bg-white/10 hover:text-white transition-all duration-200"
              aria-label="Scroll to top"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
