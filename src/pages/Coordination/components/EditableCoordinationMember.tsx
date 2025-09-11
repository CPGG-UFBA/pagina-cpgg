import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit, Save, X } from 'lucide-react'

interface EditableCoordinationMemberProps {
  name: string
  title?: string
  onUpdate: (oldName: string, newName: string, newTitle?: string) => void
  onDelete: (name: string) => void
  isEditMode: boolean
}

export function EditableCoordinationMember({ 
  name, 
  title, 
  onUpdate, 
  onDelete, 
  isEditMode 
}: EditableCoordinationMemberProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(name)
  const [editTitle, setEditTitle] = useState(title || '')

  const handleSave = () => {
    if (editName.trim() && editName !== name) {
      onUpdate(name, editName.trim(), editTitle.trim() || undefined)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditName(name)
    setEditTitle(title || '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja remover "${name}"?`)) {
      onDelete(name)
    }
  }

  if (!isEditMode) {
    return (
      <div className="coordination-member">
        {title && <h1>{title}</h1>}
        <a>{name}</a>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="coordination-member editing space-y-2 p-3 border border-border rounded-lg bg-card">
        {title && (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Título/Cargo"
            className="font-bold"
          />
        )}
        <Input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Nome"
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} className="flex-1">
            <Save className="h-3 w-3 mr-1" />
            Salvar
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">
            <X className="h-3 w-3 mr-1" />
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="coordination-member editable flex items-center justify-between p-2 border border-border rounded-lg bg-card/50 hover:bg-card transition-colors">
      <div className="flex-1">
        {title && <h1 className="font-bold text-sm text-muted-foreground">{title}</h1>}
        <span className="text-foreground">{name}</span>
      </div>
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
          <Edit className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="ghost" onClick={handleDelete} className="text-destructive hover:text-destructive">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}