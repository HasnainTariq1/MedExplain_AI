'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Stethoscope, Sun, Moon } from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import { useLanguage } from '@/app/LanguageProvider'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  const dark = useSyncExternalStore(
    () => () => {},
    () => document.documentElement.classList.contains('dark'),
    () => false
  )

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const setDark = (next: boolean) => {
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('medexplain-theme', next ? 'dark' : 'light')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => setDark(!dark)

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/upload', label: t('nav.upload') },
    { href: '/about', label: t('nav.about') },
  ]

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg shadow-violet-200/50 dark:shadow-violet-900/30 transition-shadow duration-300"
            >
              <Stethoscope className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-gradient">
              {t('app.title')}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-900/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2 flex items-center gap-2">
                {mounted && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200"
                    aria-label="Toggle theme"
                  >
                    <motion.div
                      key={dark ? 'dark' : 'light'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </motion.div>
                  </motion.button>
                )}
              <LanguageSelector />
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-violet-100 dark:border-violet-800/30 bg-white/95 dark:bg-[#0a0820]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 px-4">
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
