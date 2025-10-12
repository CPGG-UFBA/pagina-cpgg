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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('🔵 EditButton CLICADO!')
    console.log('🔵 isEditMode:', isEditMode)
    onClick()
  }

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('🔴 Logout CLICADO!')
    onLogout()
  }

  console.log('🟢 EditButton renderizado, isEditMode:', isEditMode)

  return (
    <div 
      className="fixed bottom-4 right-4" 
      style={{ 
        zIndex: 99999,
        pointerEvents: 'auto',
        position: 'fixed'
      }}
      onClick={() => console.log('🟡 Container do botão clicado')}
    >
      {!isEditMode ? (
        <div 
          className="relative"
          onMouseEnter={() => {
            console.log('🟣 Mouse entrou no botão')
            setIsHovered(true)
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button
            onClick={handleClick}
            size="sm"
            variant="secondary"
            style={{ pointerEvents: 'auto' }}
            className="w-10 h-10 p-0 bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90 shadow-md"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg border">
              Editar
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={handleLogoutClick}
          size="sm"
          variant="destructive"
          style={{ pointerEvents: 'auto' }}
          className="h-10 px-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      )}
    </div>
  )
}