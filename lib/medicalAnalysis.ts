import { MedicalTerm } from './types'

interface ReferenceRange {
  min: number
  max: number
  unit: string
  slightlyHigh?: number
  slightlyLow?: number
}

interface TestEntry {
  names: string[]
  standardName: string
  plausibleMin: number
  plausibleMax: number
}

const REFERENCE_RANGES: Record<string, ReferenceRange> = {
  'Hepatitis Bs Ag': { min: 0, max: 0, unit: '' },
  'HCV Antibody': { min: 0, max: 0, unit: '' },
  'LDL': { min: 0, max: 100, unit: 'mg/dL', slightlyHigh: 130 },
  'HDL': { min: 40, max: 60, unit: 'mg/dL' },
  'Total Cholesterol': { min: 125, max: 200, unit: 'mg/dL', slightlyHigh: 240 },
  'Triglycerides': { min: 0, max: 150, unit: 'mg/dL', slightlyHigh: 200 },
  'ALT': { min: 7, max: 56, unit: 'U/L', slightlyHigh: 80 },
  'AST': { min: 10, max: 40, unit: 'U/L', slightlyHigh: 60 },
  'ALP': { min: 44, max: 147, unit: 'U/L' },
  'Bilirubin': { min: 0.1, max: 1.2, unit: 'mg/dL', slightlyHigh: 1.5 },
  'Glucose': { min: 70, max: 99, unit: 'mg/dL', slightlyHigh: 126 },
  'Hemoglobin': { min: 11, max: 14.5, unit: 'g/dL' },
  'Hematocrit': { min: 34.5, max: 45.4, unit: '%' },
  'MCV': { min: 78.1, max: 95.3, unit: 'fL' },
  'MCH': { min: 25.3, max: 31.7, unit: 'pg' },
  'MCHC': { min: 30.3, max: 34.4, unit: 'g/dL' },
  'RDW': { min: 12.1, max: 16.9, unit: '%' },
  'Creatinine': { min: 0.6, max: 1.2, unit: 'mg/dL' },
  'Platelets': { min: 150, max: 450, unit: 'x10E9/L' },
  'WBC': { min: 4.0, max: 11.0, unit: 'x10E9/L' },
  'RBC': { min: 3.5, max: 5.5, unit: 'x10E12/L' },
  'HbA1c': { min: 4, max: 5.6, unit: '%', slightlyHigh: 6.4 },
  'BUN': { min: 7, max: 20, unit: 'mg/dL' },
  'Uric Acid': { min: 3.4, max: 7.2, unit: 'mg/dL' },
  'Sodium': { min: 135, max: 145, unit: 'mEq/L' },
  'Potassium': { min: 3.5, max: 5.0, unit: 'mEq/L' },
  'Calcium': { min: 8.5, max: 10.5, unit: 'mg/dL' },
  'TSH': { min: 0.4, max: 4.0, unit: 'mIU/L' },
  'Vitamin D': { min: 30, max: 100, unit: 'ng/mL' },
  'Iron': { min: 60, max: 170, unit: 'μg/dL' },
  'Ferritin': { min: 20, max: 250, unit: 'ng/mL' },
  'CRP': { min: 0, max: 3, unit: 'mg/L' },
  'Neutrophils': { min: 34.9, max: 76.2, unit: '%' },
  'Lymphocytes': { min: 17.5, max: 45, unit: '%' },
  'Eosinophils': { min: 0.3, max: 7.4, unit: '%' },
  'Monocytes': { min: 3.9, max: 10, unit: '%' },
  'Basophils': { min: 0, max: 1, unit: '%' },
  'Absolute Neutrophils': { min: 1.8, max: 7.6, unit: 'x10E9/L' },
  'Absolute Lymphocytes': { min: 1.1, max: 4.8, unit: 'x10E9/L' },
  'Absolute Eosinophils': { min: 0, max: 0.6, unit: 'x10E9/L' },
  'Absolute Monocytes': { min: 0.2, max: 1.0, unit: 'x10E9/L' },
  'Absolute Basophils': { min: 0, max: 0.1, unit: 'x10E9/L' },
}

const SIMPLE_MEANINGS: Record<string, string> = {
  'Hepatitis Bs Ag': 'Tests for Hepatitis B surface antigen. NonReactive means no infection detected. Reactive may indicate a current Hepatitis B infection.',
  'HCV Antibody': 'Tests for Hepatitis C antibodies. NonReactive means no antibodies detected. Reactive may indicate past or current Hepatitis C infection and should be confirmed with HCV RNA testing.',
  'LDL': 'Often called "bad" cholesterol. High levels can increase heart disease risk.',
  'HDL': 'Often called "good" cholesterol. Helps remove bad cholesterol from your blood.',
  'Total Cholesterol': 'A measure of total cholesterol in your blood. Includes both LDL and HDL.',
  'Triglycerides': 'A type of fat in your blood. High levels may increase heart disease risk.',
  'ALT': 'A liver enzyme. High levels may suggest liver stress or inflammation.',
  'AST': 'A liver enzyme. High levels can indicate liver or muscle damage.',
  'ALP': 'An enzyme found in liver and bone. Abnormal levels may indicate liver or bone issues.',
  'Bilirubin': 'A waste product from broken-down red blood cells. High levels cause jaundice.',
  'Glucose': 'Blood sugar level. High levels may indicate diabetes or prediabetes.',
  'Hemoglobin': 'A protein in red blood cells that carries oxygen. Low levels indicate anemia.',
  'Hematocrit': 'Percentage of blood volume occupied by red blood cells. Low levels may indicate anemia.',
  'MCV': 'Mean Corpuscular Volume. Measures average red blood cell size.',
  'MCH': 'Mean Corpuscular Hemoglobin. Measures average hemoglobin amount per red blood cell.',
  'MCHC': 'Mean Corpuscular Hemoglobin Concentration. Measures hemoglobin concentration in red blood cells.',
  'RDW': 'Red Cell Distribution Width. Measures variation in red blood cell size.',
  'Creatinine': 'A waste product filtered by kidneys. High levels may suggest kidney issues.',
  'Platelets': 'Blood cells that help with clotting. Abnormal levels affect bleeding risk.',
  'WBC': 'White blood cells fight infection. High levels may indicate infection or inflammation.',
  'RBC': 'Red blood cells carry oxygen. Low levels may indicate anemia.',
  'HbA1c': 'Average blood sugar over 2-3 months. High levels indicate poor diabetes control.',
  'BUN': 'Blood urea nitrogen. High levels may suggest kidney issues.',
  'Uric Acid': 'A waste product. High levels can cause gout or kidney stones.',
  'Sodium': 'An electrolyte important for nerve and muscle function.',
  'Potassium': 'An electrolyte critical for heart and muscle function.',
  'Calcium': 'Important for bones, teeth, and muscle function.',
  'TSH': 'Thyroid-stimulating hormone. Abnormal levels suggest thyroid issues.',
  'Vitamin D': 'Important for bone health and immune function.',
  'Iron': 'Essential for making red blood cells. Low levels cause anemia.',
  'Ferritin': 'Iron storage protein. Low levels indicate iron deficiency.',
  'CRP': 'C-reactive protein. High levels indicate inflammation in the body.',
  'Neutrophils': 'A type of white blood cell that fights bacterial infections.',
  'Lymphocytes': 'A type of white blood cell important for immune response.',
  'Eosinophils': 'A type of white blood cell involved in allergic reactions and parasite defense.',
  'Monocytes': 'A type of white blood cell that helps clean up damaged tissue.',
  'Basophils': 'A type of white blood cell involved in allergic and inflammatory responses.',
  'Absolute Neutrophils': 'Absolute count of neutrophils. High levels may indicate bacterial infection.',
  'Absolute Lymphocytes': 'Absolute count of lymphocytes. Abnormal levels may indicate immune system issues.',
  'Absolute Eosinophils': 'Absolute count of eosinophils. High levels may indicate allergies or parasites.',
  'Absolute Monocytes': 'Absolute count of monocytes. High levels may indicate chronic inflammation.',
  'Absolute Basophils': 'Absolute count of basophils. Abnormal levels may indicate allergic conditions.',
}

const TEST_ENTRIES: TestEntry[] = [
  { names: ['HEPATITIS BS AG', 'HEPATITIS B SURFACE ANTIGEN', 'HBSAG'], standardName: 'Hepatitis Bs Ag', plausibleMin: 0, plausibleMax: 1 },
  { names: ['HCV ANTIBODY', 'HEPATITIS C ANTIBODY', 'ANTI HCV', 'ANTI-HCV'], standardName: 'HCV Antibody', plausibleMin: 0, plausibleMax: 1 },
  { names: ['HAEMOGLOBIN', 'HEMOGLOBIN', 'HGB'], standardName: 'Hemoglobin', plausibleMin: 3, plausibleMax: 20 },
  { names: ['HAEMATOCRIT', 'HEMATOCRIT', 'HCT', 'PCV'], standardName: 'Hematocrit', plausibleMin: 10, plausibleMax: 70 },
  { names: ['MCV', 'MEAN CORPUSCULAR VOLUME'], standardName: 'MCV', plausibleMin: 50, plausibleMax: 150 },
  { names: ['MCH', 'MEAN CORPUSCULAR HEMOGLOBIN'], standardName: 'MCH', plausibleMin: 15, plausibleMax: 50 },
  { names: ['MCHC', 'MEAN CORPUSCULAR HEMOGLOBIN CONCENTRATION'], standardName: 'MCHC', plausibleMin: 20, plausibleMax: 50 },
  { names: ['RDW', 'RED CELL DISTRIBUTION WIDTH'], standardName: 'RDW', plausibleMin: 5, plausibleMax: 30 },
  { names: ['RBC', 'RED BLOOD CELLS', 'RED CELL COUNT'], standardName: 'RBC', plausibleMin: 1, plausibleMax: 9 },
  { names: ['WBC', 'WHITE BLOOD CELLS', 'WHITE CELL COUNT'], standardName: 'WBC', plausibleMin: 0.1, plausibleMax: 50 },
  { names: ['PLATELETS', 'PLT', 'PLATELET COUNT', 'THROMBOCYTES'], standardName: 'Platelets', plausibleMin: 5, plausibleMax: 1000 },
  { names: ['NEUTROPHILS', 'NEUT'], standardName: 'Neutrophils', plausibleMin: 0, plausibleMax: 100 },
  { names: ['LYMPHOCYTES', 'LYMPH'], standardName: 'Lymphocytes', plausibleMin: 0, plausibleMax: 100 },
  { names: ['EOSINOPHILS'], standardName: 'Eosinophils', plausibleMin: 0, plausibleMax: 50 },
  { names: ['MONOCYTES', 'MONO'], standardName: 'Monocytes', plausibleMin: 0, plausibleMax: 50 },
  { names: ['BASOPHILS'], standardName: 'Basophils', plausibleMin: 0, plausibleMax: 10 },
  { names: ['ABSOLUTE NEUTROPHILS', 'ABSOLUTE NEUTROPHIL COUNT', 'ANC'], standardName: 'Absolute Neutrophils', plausibleMin: 0, plausibleMax: 20 },
  { names: ['ABSOLUTE LYMPHOCYTES', 'ABSOLUTE LYMPHOCYTE COUNT', 'ALC'], standardName: 'Absolute Lymphocytes', plausibleMin: 0, plausibleMax: 20 },
  { names: ['ABSOLUTE EOSINOPHILS', 'ABSOLUTE EOSINOPHIL COUNT', 'AEC'], standardName: 'Absolute Eosinophils', plausibleMin: 0, plausibleMax: 5 },
  { names: ['ABSOLUTE MONOCYTES', 'ABSOLUTE MONOCYTE COUNT', 'AMC'], standardName: 'Absolute Monocytes', plausibleMin: 0, plausibleMax: 5 },
  { names: ['ABSOLUTE BASOPHILS', 'ABSOLUTE BASOPHIL COUNT', 'ABC'], standardName: 'Absolute Basophils', plausibleMin: 0, plausibleMax: 2 },
  { names: ['LDL', 'LDL CHOLESTEROL', 'LDL-C', 'LOW-DENSITY LIPOPROTEIN'], standardName: 'LDL', plausibleMin: 10, plausibleMax: 400 },
  { names: ['HDL', 'HDL CHOLESTEROL', 'HDL-C', 'HIGH-DENSITY LIPOPROTEIN'], standardName: 'HDL', plausibleMin: 5, plausibleMax: 150 },
  { names: ['TOTAL CHOLESTEROL', 'CHOLESTEROL', 'TC', 'SERUM CHOLESTEROL'], standardName: 'Total Cholesterol', plausibleMin: 50, plausibleMax: 500 },
  { names: ['TRIGLYCERIDES', 'TRIG', 'TG'], standardName: 'Triglycerides', plausibleMin: 10, plausibleMax: 1000 },
  { names: ['ALT', 'ALANINE AMINOTRANSFERASE', 'SGPT'], standardName: 'ALT', plausibleMin: 1, plausibleMax: 500 },
  { names: ['AST', 'ASPARTATE AMINOTRANSFERASE', 'SGOT'], standardName: 'AST', plausibleMin: 1, plausibleMax: 500 },
  { names: ['ALP', 'ALKALINE PHOSPHATASE'], standardName: 'ALP', plausibleMin: 5, plausibleMax: 1000 },
  { names: ['BILIRUBIN', 'TOTAL BILIRUBIN', 'BILI'], standardName: 'Bilirubin', plausibleMin: 0, plausibleMax: 30 },
  { names: ['GLUCOSE', 'BLOOD SUGAR', 'FBS', 'RBS', 'FASTING BLOOD SUGAR'], standardName: 'Glucose', plausibleMin: 20, plausibleMax: 600 },
  { names: ['CREATININE', 'CREATININE', 'SERUM CREATININE'], standardName: 'Creatinine', plausibleMin: 0.1, plausibleMax: 15 },
  { names: ['HBA1C', 'A1C', 'GLYCATED HEMOGLOBIN', 'HEMOGLOBIN A1C'], standardName: 'HbA1c', plausibleMin: 2, plausibleMax: 20 },
  { names: ['BUN', 'BLOOD UREA NITROGEN'], standardName: 'BUN', plausibleMin: 1, plausibleMax: 200 },
  { names: ['URIC ACID', 'URATE'], standardName: 'Uric Acid', plausibleMin: 1, plausibleMax: 20 },
  { names: ['SODIUM', 'NA'], standardName: 'Sodium', plausibleMin: 100, plausibleMax: 200 },
  { names: ['POTASSIUM'], standardName: 'Potassium', plausibleMin: 1, plausibleMax: 10 },
  { names: ['CALCIUM'], standardName: 'Calcium', plausibleMin: 4, plausibleMax: 20 },
  { names: ['TSH', 'THYROID STIMULATING HORMONE', 'THYROTROPIN'], standardName: 'TSH', plausibleMin: 0, plausibleMax: 100 },
  { names: ['VITAMIN D', '25-HYDROXY VITAMIN D', '25-OH VITAMIN D'], standardName: 'Vitamin D', plausibleMin: 0, plausibleMax: 200 },
  { names: ['IRON', 'SERUM IRON'], standardName: 'Iron', plausibleMin: 5, plausibleMax: 500 },
  { names: ['FERRITIN'], standardName: 'Ferritin', plausibleMin: 1, plausibleMax: 2000 },
  { names: ['CRP', 'C-REACTIVE PROTEIN', 'C REACTIVE PROTEIN'], standardName: 'CRP', plausibleMin: 0, plausibleMax: 500 },
]

function regexForName(name: string): RegExp {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp('(^|\\s|\\()' + escaped + '($|\\s|\\)|,)', 'i')
}

function parseNumber(value: string): number {
  return parseFloat(value.replace(/,/g, '').trim())
}

function isClinicalReferenceRange(min: number, max: number): boolean {
  if (min <= 0 || max <= 0) return false
  if (max <= min) return false
  if (max > 1000000) return false
  if (max - min > 100000) return false
  return true
}

function extractReferenceRange(text: string): { min: number; max: number } | null {
  const parenMatch = text.match(/\((\d+\.?\d*)\s*[-–]\s*(\d+\.?\d*)\)/)
  if (parenMatch) {
    const min = parseFloat(parenMatch[1])
    const max = parseFloat(parenMatch[2])
    if (isClinicalReferenceRange(min, max)) return { min, max }
  }

  const lineAfterName = text.replace(/^.*?[A-Z]{2,}\s*/, '')
  const rangeMatch = lineAfterName.match(/(\d+\.?\d*)\s*[-–]\s*(\d+\.?\d*)/)
  if (rangeMatch) {
    const min = parseFloat(rangeMatch[1])
    const max = parseFloat(rangeMatch[2])
    if (isClinicalReferenceRange(min, max)) return { min, max }
  }

  return null
}

function isLineSkippable(line: string): boolean {
  const l = line.toUpperCase()
  if (/TEL\s*[:.]?\s*\d/i.test(line)) return true
  if (/\bPHONE\b/i.test(line)) return true
  if (/\bFAX\b/i.test(line)) return true
  if (/\bEMAIL\b/i.test(line)) return true
  if (/@/.test(line)) return true
  if (/\bHTTP/i.test(line)) return true
  if (/\bWWW\./i.test(line)) return true
  if (/\bACCOUNT\s*#/i.test(line)) return true
  if (/\bMEDICAL\s*RECORD\s*#/i.test(line)) return true
  if (/\bSPECIMEN\s*ID/i.test(line)) return true
  if (/\bCOLLECTED\s*ON/i.test(line)) return true
  if (/\bREQUESTING\s*PHYSICIAN/i.test(line)) return true
  if (/\bREPORTED\s*ON/i.test(line)) return true
  if (/\bSURVEY\s*NO/i.test(line)) return true
  if (/\bPLOT\s*NO/i.test(line)) return true
  if (/\bCLINICAL\s+INFORMATION/i.test(line)) return true
  if (/THIS IS (A|AN) (COMPUTER|ELECTRONIC)/i.test(line)) return true
  if (/DOES NOT REQUIRE ANY SIGNATURE/i.test(line)) return true
  if (/\bMETHODOLOGY\b/i.test(line)) return true
  if (/\bPERIPHERAL FILM\b/i.test(line)) return true
  if (/\bNORMOCYTIC\b/i.test(line)) return true
  if (/\bDR\.?\s+[A-Z]/i.test(line)) return true
  if (/\bMBBS\b/i.test(line)) return true
  if (/\bFCPS\b/i.test(line)) return true
  if (/\bPLEASE CONSULT\b/i.test(line)) return true
  if (/\bINTERPRETATION\b/i.test(line) && !/\d/.test(line)) return true
  if (/\bCOMMENTS?\b/i.test(line) && !/\d/.test(line)) return true
  if (/\bREFERENCE\b/i.test(line) && !/\d+\.\s*\d/.test(line)) return true
  if (!/\d/.test(line)) return true
  return false
}

function findValueNearTestName(line: string, regex: RegExp): { value: number; displayValue: string; unit: string; isQualitative?: boolean } | null {
  const match = line.match(regex)
  if (!match) return null
  const matchEnd = (match.index || 0) + match[0].length
  const afterName = line.slice(matchEnd)

  const qualMatch = afterName.match(/\s*[:=]?\s*(NonReactive|Non Reactive|Non-Reactive|Reactive|Positive|Negative)/i)
  if (qualMatch) {
    const raw = qualMatch[1]
    const isAbnormal = /reactive|positive/i.test(raw)
    return { value: isAbnormal ? 1 : 0, displayValue: raw, unit: '', isQualitative: true }
  }

  const numMatch = afterName.match(/\s*[:=]?\s*(\d+\.?\d*)\s*(x10E\d+\/L|g\/dl|g\/dL|fL|pg|%|mg\/dL|U\/L|IU\/L|mEq\/L|mmol\/L|ng\/mL|μg\/dL|mcg\/dL|mg\/L|mIU\/L|μIU\/mL|\/μL|\/uL|\/mcL|M\/μL|M\/uL|million\/mcL|x10e12\/l|x10e9\/l)?/i)
  if (numMatch) {
    return { value: parseNumber(numMatch[1]), displayValue: numMatch[1], unit: numMatch[2] || '' }
  }
  return null
}

function normalizeUnits(value: number, unit: string, standardName: string): { value: number; unit: string; displayValue: string } {
  if (!unit) return { value, unit: REFERENCE_RANGES[standardName]?.unit || '', displayValue: value.toString() }
  const u = unit.toLowerCase()
  if ((standardName === 'Platelets' || standardName === 'WBC' || standardName === 'Absolute Neutrophils' || standardName === 'Absolute Lymphocytes' || standardName === 'Absolute Eosinophils' || standardName === 'Absolute Monocytes' || standardName === 'Absolute Basophils') && (u.includes('x10e9') || u.includes('x10^9'))) {
    return { value, unit: 'x10E9/L', displayValue: value.toString() }
  }
  if (standardName === 'RBC' && (u.includes('x10e12') || u.includes('x10^12'))) {
    return { value, unit: 'x10E12/L', displayValue: value.toFixed(2) }
  }
  if ((standardName === 'Hemoglobin' || standardName === 'MCHC') && (u === 'g/dl' || u === 'gm/dl')) {
    return { value, unit: 'g/dL', displayValue: value.toString() }
  }
  return { value, unit: unit.trim(), displayValue: value.toString() }
}

function determineStatus(value: number, range: ReferenceRange): MedicalTerm['status'] {
  if (value >= range.min && value <= range.max) return 'Normal'
  if (range.slightlyHigh && value <= range.slightlyHigh && value > range.max) return 'Slightly Abnormal'
  if (range.slightlyLow && value >= range.slightlyLow && value < range.min) return 'Slightly Abnormal'
  if (value > range.max) return 'High'
  if (value < range.min) return 'Low'
  return 'Slightly Abnormal'
}

export function extractMedicalTerms(text: string): MedicalTerm[] {
  const foundTerms: MedicalTerm[] = []
  const matchedNames = new Set<string>()
  const lines = text.split('\n')

  for (const rawLine of lines) {
    const trimmed = rawLine.trim()
    if (!trimmed || trimmed.length < 10) continue

    let lineMatched = false

    for (const entry of TEST_ENTRIES) {
      if (matchedNames.has(entry.standardName)) continue

      let matchedRegex: RegExp | null = null
      for (const name of entry.names) {
        const re = regexForName(name)
        if (re.test(trimmed)) {
          matchedRegex = re
          break
        }
      }
      if (!matchedRegex) continue
      lineMatched = true

      const parsed = findValueNearTestName(trimmed, matchedRegex)
      if (!parsed) continue
      if (parsed.value < entry.plausibleMin || parsed.value > entry.plausibleMax) continue

      const stdRange = REFERENCE_RANGES[entry.standardName]
      if (!stdRange) continue

      let range: ReferenceRange
      let refText: string
      const refPair = extractReferenceRange(trimmed)

      if (refPair) {
        range = { ...stdRange, min: refPair.min, max: refPair.max }
        refText = `${refPair.min}–${refPair.max} ${range.unit}`
      } else {
        range = stdRange
        refText = `${stdRange.min}–${stdRange.max} ${stdRange.unit}`
      }

      let status: MedicalTerm['status']
      let displayValue: string
      let displayUnit: string

      if (parsed.isQualitative) {
        status = parsed.value === 1 ? 'High' : 'Normal'
        displayValue = parsed.displayValue
        displayUnit = ''
      } else {
        const normalized = normalizeUnits(parsed.value, parsed.unit, entry.standardName)
        status = determineStatus(normalized.value, range)
        displayValue = normalized.displayValue
        displayUnit = normalized.unit || range.unit
      }

      foundTerms.push({
        name: entry.standardName,
        value: displayValue,
        unit: displayUnit,
        referenceRange: refText,
        status,
        simpleMeaning: SIMPLE_MEANINGS[entry.standardName] || '',
      })
      matchedNames.add(entry.standardName)
    }

    if (!lineMatched && isLineSkippable(trimmed)) continue
  }

  return foundTerms
}

export function getDemoMedicalTerms(): MedicalTerm[] {
  return [
    { name: 'Hemoglobin', value: '13.8', unit: 'g/dL', referenceRange: '11–14.5 g/dL', status: 'Normal', simpleMeaning: SIMPLE_MEANINGS['Hemoglobin'] || '' },
    { name: 'WBC', value: '7.2', unit: 'x10E9/L', referenceRange: '4.0–11.0 x10E9/L', status: 'Normal', simpleMeaning: SIMPLE_MEANINGS['WBC'] || '' },
    { name: 'Platelets', value: '250', unit: 'x10E9/L', referenceRange: '150–450 x10E9/L', status: 'Normal', simpleMeaning: SIMPLE_MEANINGS['Platelets'] || '' },
    { name: 'ALT', value: '58', unit: 'U/L', referenceRange: '7–56 U/L', status: 'Slightly Abnormal', simpleMeaning: SIMPLE_MEANINGS['ALT'] || '' },
    { name: 'Glucose', value: '110', unit: 'mg/dL', referenceRange: '70–99 mg/dL', status: 'High', simpleMeaning: SIMPLE_MEANINGS['Glucose'] || '' },
    { name: 'LDL', value: '145', unit: 'mg/dL', referenceRange: '0–100 mg/dL', status: 'High', simpleMeaning: SIMPLE_MEANINGS['LDL'] || '' },
    { name: 'HDL', value: '48', unit: 'mg/dL', referenceRange: '40–60 mg/dL', status: 'Normal', simpleMeaning: SIMPLE_MEANINGS['HDL'] || '' },
    { name: 'Creatinine', value: '0.9', unit: 'mg/dL', referenceRange: '0.6–1.2 mg/dL', status: 'Normal', simpleMeaning: SIMPLE_MEANINGS['Creatinine'] || '' },
    { name: 'Sodium', value: '140', unit: 'mEq/L', referenceRange: '135–145 mEq/L', status: 'Normal', simpleMeaning: SIMPLE_MEANINGS['Sodium'] || '' },
    { name: 'Potassium', value: '4.2', unit: 'mEq/L', referenceRange: '3.5–5.0 mEq/L', status: 'Normal', simpleMeaning: SIMPLE_MEANINGS['Potassium'] || '' },
  ]
}
