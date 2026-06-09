# MedExplain AI

**Medical Report Simplification System powered by Generative AI**

## 📋 Project Description

MedExplain AI is a full-stack web application that helps patients understand their medical reports. Users can upload medical reports (PDF, JPG, PNG), extract text using OCR, and receive AI-generated patient-friendly explanations. The system identifies medical terms, detects abnormal values, and provides simplified explanations in multiple languages.

### Project Domain: Healthcare
### Project Perspective: Consulting Use Case
### Course: AI for Industrial Applications

## ✨ Features

- **📄 Report Upload** - Drag-and-drop upload for PDF, JPG, PNG files
- **🔍 OCR Extraction** - Text extraction using Tesseract.js and PDF.js
- **📊 Medical Analysis** - Rule-based identification of 25+ medical tests with reference ranges
- **🤖 AI Simplification** - Generative AI explanations in patient-friendly language
- **💬 Chat Assistant** - Interactive chatbot for questions about your report
- **🌐 Multi-Language** - Support for English, Italian, and Urdu
- **📱 Responsive Design** - Mobile-friendly UI with healthcare theme
- **⚠️ Safety First** - Clear disclaimers throughout the application

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| Tesseract.js | OCR for images |
| pdfjs-dist | PDF text extraction |
| Framer Motion | Animations |
| React Dropzone | File upload |
| Lucide React | Icons |
| OpenAI API | AI generation (optional) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HasnainTariq1/MedExplain_AI.git
   cd medexplain_ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add OpenAI API key for AI-powered explanations:
   - Copy `.env.local` and add your key:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```
   - Without an API key, the app uses built-in fallback explanations

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

1. **Upload a Report** - Go to the Upload page and drag-drop a medical report (PDF/Image)
2. **Review Extracted Text** - Edit OCR-extracted text if needed
3. **Analyze** - Click "Analyze Report" to process
4. **View Results** - See your report analysis with color-coded status indicators
5. **Chat** - Ask questions about your results
6. **Change Language** - Use the language selector for Italian

### Demo Mode

No report to upload? Click "Use Demo Report" to see the system in action with sample data.

## ⚠️ Safety Disclaimer

MedExplain AI is designed for **educational and informational purposes only**. It does **not** provide:

- Medical diagnosis
- Treatment recommendations
- Emergency medical advice
- Prescription guidance

**Always consult a qualified healthcare professional** for medical decisions.

## 📁 Project Structure

```
medexplain-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── LanguageProvider.tsx  # Language context
│   │   ├── upload/page.tsx       # Report upload page
│   │   ├── result/page.tsx       # Results dashboard
│   │   ├── about/page.tsx        # About page
│   │   └── api/
│   │       ├── analyze/route.ts  # AI analysis API
│   │       └── chat/route.ts     # Chat API
│   └── components/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── Disclaimer.tsx
│       ├── UploadZone.tsx
│       ├── ReportTable.tsx
│       ├── SimplifiedExplanation.tsx
│       ├── ChatAssistant.tsx
│       └── LanguageSelector.tsx
├── lib/
│   ├── types.ts                  # TypeScript types
│   ├── medicalAnalysis.ts        # Rule-based medical analysis
│   ├── aiSimplification.ts       # AI simplification logic
│   ├── ocrUtils.ts               # OCR utilities
│   └── translations.ts           # Multi-language support
├── .env.local                    # Environment variables
└── README.md
```

## 🧪 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```
