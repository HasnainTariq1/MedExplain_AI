export async function extractTextFromImage(file: File): Promise<string> {
  try {
    const Tesseract = await import('tesseract.js')
    const { data } = await Tesseract.recognize(file, 'eng', {
      logger: () => {},
    })
    return data.text || ''
  } catch (error) {
    console.error('Tesseract OCR error:', error)
    throw new Error('Failed to extract text from image. Please try a clearer image.')
  }
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const pdfjsLib = await import('pdfjs-dist')
    const CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/cmaps/'

    const workerSrc = pdfjsLib.GlobalWorkerOptions?.workerSrc
    if (!workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/build/pdf.worker.min.mjs`
    }

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
      cMapUrl: CMAP_URL,
      cMapPacked: true,
    }).promise

    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ')
      fullText += pageText + '\n'
    }

    return fullText.trim()
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Failed to extract text from PDF. The PDF may be scanned or image-based.')
  }
}

export async function extractText(file: File): Promise<string> {
  const fileType = file.type

  if (fileType === 'application/pdf') {
    return extractTextFromPDF(file)
  }

  if (fileType.startsWith('image/')) {
    return extractTextFromImage(file)
  }

  throw new Error('Unsupported file type. Please upload a PDF, JPG, or PNG file.')
}

export function getDemoExtractedText(): string {
  return `Patient: Demo Patient
Date: 01/06/2026

LABORATORY REPORT

Test                    Result        Reference Range
─────────────────────────────────────────────────────
LDL Cholesterol         145 mg/dL     <100 mg/dL
HDL Cholesterol         48 mg/dL      40–60 mg/dL
Total Cholesterol       220 mg/dL     125–200 mg/dL
Triglycerides           165 mg/dL     <150 mg/dL
ALT                     58 U/L        7–56 U/L
AST                     32 U/L        10–40 U/L
Hemoglobin              13.8 g/dL     13.5–17.5 g/dL
Glucose                 110 mg/dL     70–99 mg/dL
Creatinine              0.9 mg/dL     0.6–1.2 mg/dL
Platelets               250 /μL       150–450 /μL
WBC                     7.2 /μL       4.5–11.0 /μL
RBC                     5.1 M/μL      4.7–6.1 M/μL
HbA1c                   5.4%          4.0–5.6%
Bilirubin               0.8 mg/dL     0.1–1.2 mg/dL
Sodium                  140 mEq/L     135–145 mEq/L
Potassium               4.2 mEq/L     3.5–5.0 mEq/L`
}
