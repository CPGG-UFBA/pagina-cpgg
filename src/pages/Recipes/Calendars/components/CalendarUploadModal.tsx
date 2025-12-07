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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Calendário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="year">Ano</Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              min={2000}
              max={2100}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Calendário</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Calendário de 2026"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Arquivo PDF</Label>
            <div 
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
              {file ? (
                <p className="text-sm text-foreground font-medium">{file.name}</p>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">Clique para selecionar um arquivo PDF</p>
                  <p className="text-xs text-muted-foreground mt-1">ou arraste e solte aqui</p>
                </>
              )}
            </div>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !file}>
              {isLoading ? 'Enviando...' : 'Adicionar Calendário'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
