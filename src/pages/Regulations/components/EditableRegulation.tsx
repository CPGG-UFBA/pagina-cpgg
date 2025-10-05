import { useState } from 'react'
import { Minus, Edit, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import lawsImage from '@/components/Figures/laws.jpg'

interface EditableRegulationProps {
  regulation: {
    id: string;
    name: string;
    pdf_url: string;
  }
  isEditMode: boolean
  onUpdate: (id: string, name: string, pdfUrl: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function EditableRegulation({ 
  regulation, 
  isEditMode, 
  onUpdate, 
  onDelete
}: EditableRegulationProps) {
  const [editedName, setEditedName] = useState(regulation.name)
  const [editedPdfUrl, setEditedPdfUrl] = useState(regulation.pdf_url)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    if (editedName === regulation.name && editedPdfUrl === regulation.pdf_url) {
      setShowEditDialog(false)
      return
    }

    setIsLoading(true)
    try {
      await onUpdate(regulation.id, editedName, editedPdfUrl)
      setShowEditDialog(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await onDelete(regulation.id)
      setShowDeleteConfirm(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isEditMode) {
    return (
      <a 
        href={regulation.pdf_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <div 
          className="p-8 text-center shadow-md text-white relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 rounded-xl" 
          style={{ 
            width: '350px', 
            height: '120px',
            background: `linear-gradient(135deg, rgba(2,0,36,0.85), rgba(121,9,94,0.85)), url(${lawsImage}) center/cover`
          }}>
          <h2 className="text-lg font-semibold">{regulation.name}</h2>
        </div>
      </a>
    )
  }

  return (
    <>
      <div className="block">
        <div 
          className="p-8 text-center shadow-md text-white relative overflow-hidden rounded-xl border-2 border-dashed border-primary" 
          style={{ 
            width: '350px', 
            height: '120px',
            background: `linear-gradient(135deg, rgba(2,0,36,0.85), rgba(121,9,94,0.85)), url(${lawsImage}) center/cover`
          }}>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg font-semibold">{regulation.name}</h2>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowEditDialog(true)}
                disabled={isLoading}
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => window.open(regulation.pdf_url, '_blank')}
                disabled={isLoading}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isLoading}
              >
                <Minus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog para editar */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Norma/Regulamento</DialogTitle>
            <DialogDescription>
              Altere os dados da norma abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome da Norma:</label>
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Digite o nome da norma"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Link do PDF:</label>
              <Input
                value={editedPdfUrl}
                onChange={(e) => setEditedPdfUrl(e.target.value)}
                placeholder="Digite o link do PDF"
                type="url"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={isLoading || !editedName || !editedPdfUrl}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar exclusão */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza de que quer apagar esta norma/regulamento?
              <br />
              <strong>{regulation.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isLoading}
            >
              NÃO
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Excluindo...' : 'SIM'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}