import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'

interface CalendarUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File, year: number, name: string) => Promise<void>
  nextYear: number
}

export function CalendarUploadModal({ isOpen, onClose, onUpload, nextYear }: CalendarUploadModalProps) {
  const [year, setYear] = useState(nextYear)
  const [name, setName] = useState(`Calendário de ${nextYear}`)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Por favor, selecione um arquivo PDF')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      setError('Por favor, selecione um arquivo PDF')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await onUpload(file, year, name)
      handleClose()
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload do calendário')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setYear(nextYear)
    setName(`Calendário de ${nextYear}`)
    setError('')
    onClose()
  }

  const handleYearChange = (newYear: number) => {
    setYear(newYear)
    setName(`Calendário de ${newYear}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[380px] p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-base">Adicionar Calendário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <div className="w-20 space-y-1">
              <Label htmlFor="year" className="text-xs">Ano</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                min={2000}
                max={2100}
                required
                className="h-8 text-sm"
              />
            </div>
            
            <div className="flex-1 space-y-1">
              <Label htmlFor="name" className="text-xs">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Calendário de 2026"
                required
                className="h-8 text-sm"
              />
            </div>
          </div>

          <div 
            className="border-2 border-dashed border-border rounded p-2 text-center cursor-pointer hover:border-primary transition-colors flex items-center justify-center gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              {file ? file.name : 'Selecionar PDF'}
            </p>
          </div>

          {error && <p className="text-destructive text-xs">{error}</p>}
          
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={handleClose} size="sm">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !file} size="sm">
              {isLoading ? 'Enviando...' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
