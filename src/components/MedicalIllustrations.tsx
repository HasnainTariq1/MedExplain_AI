'use client'

interface IllusProps {
  className?: string
}

export function DoctorPatient({ className }: IllusProps) {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background circle */}
      <circle cx="200" cy="160" r="130" className="fill-violet-100/60 dark:fill-violet-900/20" />
      <circle cx="200" cy="160" r="100" className="fill-violet-50/40 dark:fill-violet-900/10" />

      {/* Doctor */}
      <g transform="translate(100, 80)">
        {/* Body */}
        <rect x="30" y="55" width="40" height="55" rx="10" className="fill-white dark:fill-gray-800 stroke-violet-200 dark:stroke-violet-700" strokeWidth="1.5" />
        {/* Lab coat */}
        <rect x="28" y="55" width="44" height="55" rx="10" className="fill-sky-50 dark:fill-sky-900/30 stroke-sky-200 dark:stroke-sky-700" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="50" cy="35" r="20" className="fill-amber-100 dark:fill-amber-900/40 stroke-amber-200 dark:stroke-amber-700" strokeWidth="1.5" />
        {/* Hair */}
        <path d="M35 28 Q50 15 65 28" className="fill-gray-800 dark:fill-gray-200" />
        {/* Stethoscope */}
        <path d="M50 50 L50 65 Q35 70 30 60" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" fill="none" />
        <circle cx="30" cy="60" r="4" className="fill-gray-400 dark:fill-gray-500" />
        {/* Face */}
        <circle cx="44" cy="33" r="2" className="fill-gray-700 dark:fill-gray-300" />
        <circle cx="56" cy="33" r="2" className="fill-gray-700 dark:fill-gray-300" />
        <path d="M44 40 Q50 44 56 40" className="stroke-gray-600 dark:stroke-gray-300" strokeWidth="1.5" fill="none" />
        {/* Clipboard */}
        <rect x="55" y="60" width="18" height="24" rx="3" className="fill-white dark:fill-gray-700 stroke-violet-300 dark:stroke-violet-600" strokeWidth="1.5" />
        <line x1="59" y1="67" x2="69" y2="67" className="stroke-violet-300 dark:stroke-violet-500" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="59" y1="72" x2="67" y2="72" className="stroke-violet-300 dark:stroke-violet-500" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="59" y1="77" x2="65" y2="77" className="stroke-violet-300 dark:stroke-violet-500" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Patient */}
      <g transform="translate(230, 95)">
        {/* Body */}
        <rect x="25" y="40" width="40" height="50" rx="10" className="fill-white dark:fill-gray-800 stroke-violet-200 dark:stroke-violet-700" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="45" cy="22" r="18" className="fill-amber-100 dark:fill-amber-900/40 stroke-amber-200 dark:stroke-amber-700" strokeWidth="1.5" />
        {/* Hair */}
        <path d="M30 16 Q45 5 60 16" className="fill-violet-700 dark:fill-violet-400" />
        {/* Face */}
        <circle cx="40" cy="20" r="1.5" className="fill-gray-700 dark:fill-gray-300" />
        <circle cx="50" cy="20" r="1.5" className="fill-gray-700 dark:fill-gray-300" />
        <path d="M40 27 Q45 30 50 27" className="stroke-gray-600 dark:stroke-gray-300" strokeWidth="1.5" fill="none" />
        {/* Arm reaching out */}
        <path d="M25 55 Q5 50 10 40" className="stroke-violet-200 dark:stroke-violet-700" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>

      {/* Medical cross (subtle) */}
      <g transform="translate(175, 45)" opacity="0.15">
        <rect x="8" y="0" width="8" height="24" rx="2" className="fill-violet-500 dark:fill-violet-400" />
        <rect x="0" y="8" width="24" height="8" rx="2" className="fill-violet-500 dark:fill-violet-400" />
      </g>

      {/* Heart rate line */}
      <path d="M135 190 L155 190 L162 175 L172 205 L182 170 L192 200 L202 180 L212 190 L232 190"
        className="stroke-rose-400 dark:stroke-rose-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />

      {/* Floating medical icons */}
      <g opacity="0.2" transform="translate(60, 50)">
        <circle cx="0" cy="0" r="4" className="fill-violet-400 dark:fill-violet-500" />
        <circle cx="0" cy="0" r="8" className="fill-violet-300/50 dark:fill-violet-600/30" />
      </g>
      <g opacity="0.15" transform="translate(320, 100)">
        <circle cx="0" cy="0" r="3" className="fill-sky-400 dark:fill-sky-500" />
      </g>
      <g opacity="0.2" transform="translate(80, 230)">
        <circle cx="0" cy="0" r="5" className="fill-sky-400 dark:fill-sky-500" />
        <circle cx="0" cy="0" r="10" className="fill-sky-300/50 dark:fill-sky-600/30" />
      </g>
    </svg>
  )
}

export function MedicalChart({ className }: IllusProps) {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background */}
      <circle cx="200" cy="160" r="130" className="fill-sky-100/60 dark:fill-sky-900/20" />
      <circle cx="200" cy="160" r="100" className="fill-sky-50/40 dark:fill-sky-900/10" />

      {/* Document */}
      <g transform="translate(120, 65)">
        <rect x="0" y="0" width="160" height="195" rx="8" className="fill-white dark:fill-gray-800 stroke-violet-200 dark:stroke-violet-700" strokeWidth="1.5" />
        {/* Header bar */}
        <rect x="0" y="0" width="160" height="35" rx="8" className="fill-gradient-to-r fill-violet-500 dark:fill-violet-700" />
        <rect x="0" y="0" width="160" height="35" rx="8" className="fill-[#7c3aed] dark:fill-[#5b21b6]" />
        <rect x="0" y="20" width="160" height="15" className="fill-[#7c3aed] dark:fill-[#5b21b6]" />
        <circle cx="15" cy="17" r="5" className="fill-white/50" />
        <line x1="30" y1="15" x2="80" y2="15" className="stroke-white/70" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="22" x2="60" y2="22" className="stroke-white/40" strokeWidth="1.5" strokeLinecap="round" />

        {/* Chart bars */}
        <g transform="translate(20, 55)">
          <rect x="0" y="40" width="18" height="50" rx="4" className="fill-violet-200 dark:fill-violet-800" />
          <rect x="0" y="40" width="18" height="50" rx="4" className="fill-violet-400/70 dark:fill-violet-500/50" />
          <rect x="25" y="25" width="18" height="65" rx="4" className="fill-sky-200 dark:fill-sky-800" />
          <rect x="25" y="25" width="18" height="65" rx="4" className="fill-sky-400/70 dark:fill-sky-500/50" />
          <rect x="50" y="10" width="18" height="80" rx="4" className="fill-emerald-200 dark:fill-emerald-800" />
          <rect x="50" y="10" width="18" height="80" rx="4" className="fill-emerald-400/70 dark:fill-emerald-500/50" />
          <rect x="75" y="35" width="18" height="55" rx="4" className="fill-amber-200 dark:fill-amber-800" />
          <rect x="75" y="35" width="18" height="55" rx="4" className="fill-amber-400/70 dark:fill-amber-500/50" />
          <rect x="100" y="20" width="18" height="70" rx="4" className="fill-rose-200 dark:fill-rose-800" />
          <rect x="100" y="20" width="18" height="70" rx="4" className="fill-rose-400/70 dark:fill-rose-500/50" />
        </g>

        {/* Reference line */}
        <line x1="20" y1="75" x2="140" y2="75" className="stroke-amber-400/60 dark:stroke-amber-500/40" strokeWidth="1.5" strokeDasharray="4,3" />

        {/* Text lines at bottom */}
        <g transform="translate(20, 145)">
          <line x1="0" y1="0" x2="50" y2="0" className="stroke-violet-300 dark:stroke-violet-600" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="10" x2="80" y2="10" className="stroke-violet-200 dark:stroke-violet-700" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="0" y1="20" x2="65" y2="20" className="stroke-violet-200 dark:stroke-violet-700" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="0" y1="35" x2="40" y2="35" className="stroke-violet-300 dark:stroke-violet-600" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="45" x2="90" y2="45" className="stroke-violet-200 dark:stroke-violet-700" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>

      {/* Magnifying glass */}
      <g transform="translate(290, 220)" opacity="0.3">
        <circle cx="0" cy="0" r="12" className="stroke-violet-400 dark:stroke-violet-500" strokeWidth="2.5" fill="none" />
        <line x1="9" y1="9" x2="18" y2="18" className="stroke-violet-400 dark:stroke-violet-500" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Floating pills */}
      <g transform="translate(70, 50)" opacity="0.2">
        <rect x="0" y="0" width="6" height="16" rx="3" className="fill-violet-400 dark:fill-violet-500" />
        <rect x="10" y="2" width="6" height="14" rx="3" className="fill-sky-400 dark:fill-sky-500" />
      </g>
      <g transform="translate(310, 70)" opacity="0.15">
        <rect x="0" y="0" width="5" height="12" rx="2.5" className="fill-rose-400 dark:fill-rose-500" />
      </g>
    </svg>
  )
}

export function HealthAnalysis({ className }: IllusProps) {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background */}
      <circle cx="200" cy="160" r="130" className="fill-amber-50/60 dark:fill-amber-900/15" />
      <circle cx="200" cy="160" r="100" className="fill-amber-50/30 dark:fill-amber-900/8" />

      {/* Monitor/Device */}
      <g transform="translate(120, 75)">
        <rect x="0" y="0" width="160" height="130" rx="12" className="fill-white dark:fill-gray-800 stroke-violet-200 dark:stroke-violet-700" strokeWidth="1.5" />
        <rect x="10" y="10" width="140" height="90" rx="6" className="fill-gray-50 dark:fill-gray-900 stroke-violet-100 dark:stroke-violet-800" strokeWidth="1" />

        {/* Heart rate on screen */}
        <path d="M20 55 L35 55 L42 35 L52 75 L62 40 L72 70 L82 50 L90 55 L105 55"
          className="stroke-rose-400 dark:stroke-rose-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Screen glow */}
        <path d="M20 55 L35 55 L42 35 L52 75 L62 40 L72 70 L82 50 L90 55 L105 55"
          className="stroke-rose-400/30 dark:stroke-rose-500/30" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#blur)" />

        {/* Battery/Stats on screen */}
        <g transform="translate(120, 15)" opacity="0.5">
          <text x="0" y="0" className="fill-gray-500 dark:fill-gray-400" fontSize="6" fontFamily="monospace">HR 72</text>
        </g>
        <g transform="translate(120, 28)" opacity="0.4">
          <text x="0" y="0" className="fill-gray-500 dark:fill-gray-400" fontSize="5" fontFamily="monospace">SpO2 98%</text>
        </g>

        {/* Base */}
        <rect x="30" y="130" width="100" height="10" rx="3" className="fill-violet-200 dark:fill-violet-800" />
        <rect x="55" y="140" width="50" height="8" rx="2" className="fill-violet-100 dark:fill-violet-900" />
      </g>

      {/* Doctor hand holding */}
      <g transform="translate(85, 155)" opacity="0.25">
        <path d="M0 10 Q15 0 30 10" className="stroke-violet-300 dark:stroke-violet-600" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* Checkmark badge */}
      <g transform="translate(280, 220)">
        <circle cx="0" cy="0" r="18" className="fill-emerald-100 dark:fill-emerald-900/40 stroke-emerald-300 dark:stroke-emerald-700" strokeWidth="1.5" />
        <path d="M-6 0 L-2 4 L6 -4" className="stroke-emerald-500 dark:stroke-emerald-400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Stethoscope icon */}
      <g transform="translate(68, 50)" opacity="0.2">
        <path d="M0 0 L0 15 Q0 25 10 25 Q20 25 20 15" className="stroke-violet-400 dark:stroke-violet-500" strokeWidth="2" fill="none" />
        <circle cx="10" cy="25" r="6" className="stroke-violet-400 dark:stroke-violet-500" strokeWidth="2" fill="none" />
      </g>

      {/* Floating particles */}
      <circle cx="60" cy="250" r="4" className="fill-violet-300/40 dark:fill-violet-600/30" />
      <circle cx="330" cy="60" r="3" className="fill-sky-300/40 dark:fill-sky-600/30" />
      <circle cx="340" cy="240" r="5" className="fill-emerald-300/40 dark:fill-emerald-600/30" />
      <circle cx="50" cy="120" r="3" className="fill-amber-300/40 dark:fill-amber-600/30" />
    </svg>
  )
}

export function MedicineHealth({ className }: IllusProps) {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background */}
      <circle cx="200" cy="160" r="130" className="fill-rose-50/60 dark:fill-rose-900/15" />
      <circle cx="200" cy="160" r="100" className="fill-rose-50/30 dark:fill-rose-900/8" />

      {/* Shield/Health badge */}
      <g transform="translate(160, 70)">
        <path d="M40 0 L80 15 L80 60 Q80 95 40 110 Q0 95 0 60 L0 15 Z"
          className="fill-white dark:fill-gray-800 stroke-rose-200 dark:stroke-rose-700" strokeWidth="1.5" />
        <path d="M40 8 L72 20 L72 58 Q72 88 40 100 Q8 88 8 58 L8 20 Z"
          className="fill-rose-50/60 dark:fill-rose-900/20" />
        {/* Heart inside shield */}
        <path d="M40 40 Q40 33 35 33 Q28 33 28 40 Q28 48 40 55 Q52 48 52 40 Q52 33 45 33 Q40 33 40 40 Z"
          className="fill-rose-400 dark:fill-rose-500" />
      </g>

      {/* Medic cross */}
      <g transform="translate(185, 210)">
        <rect x="12" y="0" width="12" height="36" rx="3" className="fill-violet-400 dark:fill-violet-500" opacity="0.6" />
        <rect x="0" y="12" width="36" height="12" rx="3" className="fill-violet-400 dark:fill-violet-500" opacity="0.6" />
      </g>

      {/* Pulse dots */}
      <g transform="translate(80, 215)" opacity="0.15">
        <circle cx="0" cy="0" r="4" className="fill-violet-400 dark:fill-violet-500" />
        <circle cx="15" cy="0" r="3" className="fill-sky-400 dark:fill-sky-500" />
        <circle cx="28" cy="0" r="2" className="fill-rose-400 dark:fill-rose-500" />
      </g>
      <g transform="translate(280, 215)" opacity="0.15">
        <circle cx="0" cy="0" r="2" className="fill-rose-400 dark:fill-rose-500" />
        <circle cx="13" cy="0" r="3" className="fill-sky-400 dark:fill-sky-500" />
        <circle cx="26" cy="0" r="4" className="fill-violet-400 dark:fill-violet-500" />
      </g>

      {/* DNA helix (simplified) */}
      <g transform="translate(65, 50)" opacity="0.12">
        <path d="M10 0 Q30 15 10 30 Q-10 45 10 60 Q30 75 10 90"
          className="stroke-violet-500 dark:stroke-violet-400" strokeWidth="2" fill="none" />
        <path d="M30 0 Q10 15 30 30 Q50 45 30 60 Q10 75 30 90"
          className="stroke-sky-500 dark:stroke-sky-400" strokeWidth="2" fill="none" />
        <line x1="12" y1="12" x2="28" y2="8" className="stroke-violet-400 dark:stroke-violet-500" strokeWidth="1" />
        <line x1="8" y1="28" x2="32" y2="22" className="stroke-violet-400 dark:stroke-violet-500" strokeWidth="1" />
        <line x1="12" y1="42" x2="28" y2="38" className="stroke-violet-400 dark:stroke-violet-500" strokeWidth="1" />
        <line x1="8" y1="58" x2="32" y2="52" className="stroke-violet-400 dark:stroke-violet-500" strokeWidth="1" />
      </g>

      {/* Pills scattered */}
      <g transform="translate(280, 80)" opacity="0.2">
        <rect x="0" y="0" width="10" height="24" rx="5" className="fill-violet-400 dark:fill-violet-500" />
        <rect x="14" y="4" width="10" height="20" rx="5" className="fill-sky-400 dark:fill-sky-500" />
        <rect x="28" y="2" width="8" height="18" rx="4" className="fill-amber-400 dark:fill-amber-500" />
      </g>

      {/* Syringe (subtle) */}
      <g transform="translate(295, 145)" opacity="0.15">
        <rect x="0" y="6" width="30" height="6" rx="2" className="fill-violet-400 dark:fill-violet-500" />
        <rect x="30" y="4" width="8" height="10" rx="1" className="fill-violet-400 dark:fill-violet-500" />
        <line x1="38" y1="9" x2="48" y2="9" className="stroke-violet-400 dark:fill-violet-500" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Temperature */}
      <g transform="translate(80, 145)" opacity="0.15">
        <circle cx="10" cy="0" r="6" className="fill-rose-400 dark:fill-rose-500" />
        <rect x="8" y="6" width="4" height="20" rx="2" className="fill-gray-400 dark:fill-gray-500" />
        <line x1="6" y1="6" x2="14" y2="6" className="stroke-rose-300 dark:stroke-rose-600" strokeWidth="2" />
      </g>
    </svg>
  )
}
