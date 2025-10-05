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
  researcher: any // Mudança para aceitar mais propriedades
  isEditMode: boolean
  onUpdate: (id: string, name: string, isStatic?: boolean, originalName?: string, programKey?: string) => Promise<void>
  onDelete: (id: string, isStatic?: boolean, name?: string) => Promise<void>
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
  const [editedName, setEditedName] = useState(researcher.name)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettingChief, setIsSettingChief] = useState(false)

  // Verifica se é um pesquisador do banco de dados
  const isDatabaseResearcher = researcher.isDatabase || researcher.route.includes('/researchers/dynamic/')
  const researcherId = isDatabaseResearcher ? (researcher.id || researcher.route.split('/').pop()) : null

  const handleNameChange = async () => {
    if (editedName === researcher.name) return

    setIsLoading(true)
    try {
      if (isDatabaseResearcher && researcherId) {
        await onUpdate(researcherId, editedName)
      } else {
        // Pesquisador estático - migra para o banco
        await onUpdate('', editedName, true, researcher.originalName || researcher.name, researcher.programKey)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      if (isDatabaseResearcher && researcherId) {
        await onDelete(researcherId)
      } else {
        // Pesquisador estático - apenas oculta
        await onDelete('', true, researcher.originalName || researcher.name)
      }
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
    if (!onSetChief) return
    
    setIsSettingChief(true)
    try {
      // Se for estático, primeiro migra para o banco
      if (!isDatabaseResearcher) {
        await onUpdate('', editedName, true, researcher.originalName || researcher.name, researcher.programKey)
        // Aguarda um momento para o banco atualizar
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      // Depois marca como coordenador
      const id = isDatabaseResearcher ? researcherId : researcher.id
      if (id) {
        await onSetChief(id, researcher.programKey || '')
      }
    } finally {
      setIsSettingChief(false)
    }
  }

  if (!isEditMode) {
    return (
      <nav>
        <Link 
          to={researcher.route}
          className={researcher.isChief ? 'text-yellow-600 dark:text-yellow-400 font-semibold' : ''}
        >
          {researcher.name}
          {researcher.isChief && <span className="ml-1">(Chefe)</span>}
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
        {!isDatabaseResearcher && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded shrink-0">(estático)</span>
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