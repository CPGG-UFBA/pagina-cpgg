import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

interface Researcher {
  name: string
  route: string
  chief?: boolean
}

interface EditableResearcherProps {
  researcher: any
  isEditMode: boolean
  onUpdate: (id: string, name: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onSetChief?: (id: string, programKey: string) => Promise<void>
  dbResearchers: any[]
}

export function EditableResearcher({ 
  researcher, 
  isEditMode, 
  onUpdate, 
  onDelete,
  onSetChief,
  dbResearchers 
}: EditableResearcherProps) {
  console.log('EditableResearcher render:', { name: researcher.name, route: researcher.route, isEditMode })
  const [editedName, setEditedName] = useState(researcher.name)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettingChief, setIsSettingChief] = useState(false)

  // Todos os pesquisadores agora são do banco de dados
  const researcherId = researcher.id || researcher.route.split('/').pop()

  const handleNameChange = async () => {
    if (editedName === researcher.name) return

    setIsLoading(true)
    try {
      await onUpdate(researcherId, editedName)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
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

  const handleSetChief = async () => {
    if (!researcherId || !onSetChief) return
    
    setIsSettingChief(true)
    try {
      await onSetChief(researcherId, researcher.programKey || '')
    } finally {
      setIsSettingChief(false)
    }
  }

  if (!isEditMode) {
    return (
      <nav style={{ display: 'block', margin: 0, padding: 0 }}>
        <Link 
          to={researcher.route}
          className={researcher.isChief ? "text-yellow-400 font-semibold" : ""}
          style={{
            display: 'block',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.95)',
            lineHeight: '1.6',
            padding: '0.5rem 0.75rem',
            margin: '0.25rem 0',
            borderRadius: '8px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          {researcher.name}
          {researcher.isChief && <span className="ml-2 text-sm">(Chefe)</span>}
        </Link>
      </nav>
    )
  }

  return (
    <>
      <nav className="flex items-center gap-2 group">
        {onSetChief && (
          <Button
            size="sm"
            variant={researcher.isChief ? "default" : "outline"}
            className={`h-8 w-8 p-0 shrink-0 ${
              researcher.isChief 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600' 
                : 'bg-background text-foreground border-border hover:bg-muted'
            }`}
            onClick={handleSetChief}
            disabled={isLoading || isSettingChief}
            title={researcher.isChief ? "Coordenador do programa" : "Marcar como coordenador"}
          >
            <Star className={`w-4 h-4 ${researcher.isChief ? 'fill-current' : ''}`} />
          </Button>
        )}
        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleNameChange}
          onKeyPress={handleKeyPress}
          className="h-8 text-sm bg-background text-foreground border-border focus:border-ring flex-1"
          disabled={isLoading}
          placeholder="Nome do pesquisador"
        />
        <Button
          size="sm"
          variant="destructive"
          className="h-8 w-8 p-0 shrink-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 opacity-70 hover:opacity-100"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isLoading}
        >
          <Minus className="w-3 h-3" />
        </Button>
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
              className="bg-background text-foreground border-border hover:bg-muted"
            >
              NÃO
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? 'Excluindo...' : 'SIM'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}