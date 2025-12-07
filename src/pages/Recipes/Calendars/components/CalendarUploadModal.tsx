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
        setError('Selecione um PDF')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError('Selecione um PDF')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      await onUpload(file, year, name)
      handleClose()
    } catch (err: any) {
      setError(err.message || 'Erro no upload')
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
      <DialogContent className="sm:max-w-[320px] !p-3 !gap-0" style={{ maxHeight: 'fit-content' }}>
        <DialogHeader className="!pb-1 !space-y-0">
          <DialogTitle className="text-sm">Adicionar Calendário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-1">
          <div className="flex gap-2">
            <div className="w-16 space-y-0.5">
              <Label htmlFor="year" className="text-xs">Ano</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                min={2000}
                max={2100}
                required
                className="h-7 text-xs px-1"
              />
            </div>
            <div className="flex-1 space-y-0.5">
              <Label htmlFor="name" className="text-xs">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-7 text-xs"
              />
            </div>
          </div>

          <div 
            className="border border-dashed border-border rounded p-1.5 text-center cursor-pointer hover:border-primary transition-colors flex items-center justify-center gap-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="w-3 h-3 text-muted-foreground" />
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
              {file ? file.name : 'Selecionar PDF'}
            </p>
          </div>

          {error && <p className="text-destructive text-xs">{error}</p>}
          
          <div className="flex justify-end gap-1 pt-1">
            <Button type="button" variant="outline" onClick={handleClose} size="sm" className="h-7 text-xs px-2">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !file} size="sm" className="h-7 text-xs px-2">
              {isLoading ? '...' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
