import { useState, useRef, DragEvent } from 'react'
import { Input } from '@/components/ui/input'

interface PhotoDropZoneProps {
  id: string
  label: string
  value: File | null
  onChange: (file: File | null) => void
  className?: string
}

export function PhotoDropZone({ id, label, value, onChange, className }: PhotoDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        onChange(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    onChange(file || null)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${className}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <Input
          ref={fileInputRef}
          id={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="text-center">
          {value ? (
            <div className="space-y-2">
              <div className="text-sm text-green-600 font-medium">
                ✓ {value.name}
              </div>
              <div className="text-xs text-gray-500">
                Clique ou arraste para substituir
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                Clique para selecionar ou arraste uma imagem
              </div>
              <div className="text-xs text-gray-400">
                PNG, JPG, JPEG até 5MB
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}