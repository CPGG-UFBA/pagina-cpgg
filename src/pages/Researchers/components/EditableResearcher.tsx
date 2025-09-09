import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

interface Researcher {
  name: string
  route: string
  chief?: boolean
}

interface EditableResearcherProps {
  researcher: Researcher
  isEditMode: boolean
  onUpdate: (id: string, name: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  dbResearchers: any[]
}

export function EditableResearcher({ 
  researcher, 
  isEditMode, 
  onUpdate, 
  onDelete,
  dbResearchers 
}: EditableResearcherProps) {
  const [editedName, setEditedName] = useState(researcher.name)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Verifica se é um pesquisador do banco de dados
  const isDatabaseResearcher = researcher.route.includes('/researchers/dynamic/')
  const researcherId = isDatabaseResearcher ? researcher.route.split('/').pop() : null

  const handleNameChange = async () => {
    if (!isDatabaseResearcher || !researcherId || editedName === researcher.name) return

    setIsLoading(true)
    try {
      await onUpdate(researcherId, editedName)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!isDatabaseResearcher || !researcherId) return

    setIsLoading(true)
    try {
      await onDelete(researcherId)
      setShowDeleteConfirm(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameChange()
    }
  }

  if (!isEditMode) {
    return (
      <nav>
        <Link to={researcher.route}> {researcher.name}</Link>
      </nav>
    )
  }

  return (
    <>
      <nav className="flex items-center gap-2 group">
        {isDatabaseResearcher ? (
          <>
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleNameChange}
              onKeyPress={handleKeyPress}
              className="h-8 text-sm bg-background/50 border-border/50"
              disabled={isLoading}
            />
            <Button
              size="sm"
              variant="destructive"
              className="h-8 w-8 p-0 opacity-70 hover:opacity-100"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isLoading}
            >
              <Minus className="w-3 h-3" />
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="h-8 text-sm bg-background/80 border-border"
              placeholder="Nome do pesquisador"
            />
            <span className="text-xs text-muted-foreground">(estático)</span>
          </div>
        )}
      </nav>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza de que quer apagar este pesquisador?
              <br />
              <strong>{researcher.name}</strong>
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