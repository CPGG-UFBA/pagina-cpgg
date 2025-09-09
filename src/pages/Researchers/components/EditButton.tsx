import { useState } from 'react'
import { Edit3, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EditButtonProps {
  onClick: () => void
  isEditMode: boolean
  onLogout: () => void
}

export function EditButton({ onClick, isEditMode, onLogout }: EditButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  console.log('EditButton render - isEditMode:', isEditMode)

  return (
    <div className="fixed bottom-4 right-4 z-50" style={{ background: 'red', padding: '4px' }}>
      {!isEditMode ? (
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button
            onClick={onClick}
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-muted"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
              Editar
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={onLogout}
          size="sm"
          variant="destructive"
          className="h-10 px-3"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      )}
    </div>
  )
}