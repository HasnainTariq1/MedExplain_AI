'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, File, Image, FileText, X, Loader2 } from 'lucide-react'

interface UploadZoneProps {
  onFileSelected: (file: File) => void
  onAnalyze: () => void
  isProcessing: boolean
  file: File | null
  setFile: (file: File | null) => void
}

export default function UploadZone({ onFileSelected, onAnalyze, isProcessing, file, setFile }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0]
    if (selected) {
      setFile(selected)
      onFileSelected(selected)
      if (selected.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selected))
      } else {
        setPreview(null)
      }
    }
  }, [onFileSelected, setFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  })

  const removeFile = () => {
    setFile(null)
    setPreview(null)
  }

  const getFileIcon = () => {
    if (!file) return null
    if (file.type === 'application/pdf') return <FileText className="w-8 h-8 text-red-500" />
    if (file.type.startsWith('image/')) return <Image className="w-8 h-8 text-sky-500" />
    return <File className="w-8 h-8 text-gray-500" />
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          {...getRootProps()}
          className={`relative overflow-hidden rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-violet-400 bg-violet-50 dark:bg-violet-900/20 shadow-lg shadow-violet-100 dark:shadow-violet-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-md'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                isDragActive ? 'bg-violet-100 dark:bg-violet-900/30' : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <Upload className={`w-8 h-8 ${isDragActive ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
            </motion.div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                {isDragActive ? 'Drop your file here' : 'Drag & drop your medical report here'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                or click to browse files
              </p>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">Supported formats: PDF, JPG, PNG (max 10MB)</p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
              >
                {getFileIcon()}
              </motion.div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-200">{file.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={removeFile}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {preview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 max-h-64"
            >
              <img src={preview} alt="Medical report preview" className="w-full h-full object-contain" />
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-3 text-sm text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing your report...
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAnalyze}
            disabled={isProcessing}
            className="mt-4 w-full py-3 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-200 dark:shadow-violet-900/30 hover:shadow-xl active:shadow-md"
          >
            {isProcessing ? 'Processing...' : 'Analyze Report'}
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
