import { Button } from '@/components/ui/button'
import { Edit, LogOut } from 'lucide-react'

interface EditButtonCoordinationProps {
  onClick: () => void
  isEditMode: boolean
  onLogout: () => void
}

export function EditButtonCoordination({ onClick, isEditMode, onLogout }: EditButtonCoordinationProps) {
  if (isEditMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={onLogout}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          size="lg"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair do Modo Edição
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={onClick}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
      >
        <Edit className="mr-2 h-4 w-4" />
        Modo Edição
      </Button>
    </div>
  )
}