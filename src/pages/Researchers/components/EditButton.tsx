import { Edit3, LogOut } from 'lucide-react'

interface EditButtonProps {
  onClick: () => void
  isEditMode: boolean
  onLogout: () => void
}

export function EditButton({ onClick, isEditMode, onLogout }: EditButtonProps) {
  console.log('🟢 EditButton renderizado, isEditMode:', isEditMode)

  if (!isEditMode) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          console.log('🔵 BOTÃO CLICADO!')
          onClick()
        }}
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 999999,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto'
        }}
        onMouseEnter={(e) => {
          console.log('🟣 Mouse entrou')
          e.currentTarget.style.backgroundColor = '#2563eb'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3b82f6'
        }}
      >
        <Edit3 size={24} />
      </button>
    )
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('🔴 LOGOUT CLICADO!')
        onLogout()
      }}
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 999999,
        padding: '12px 24px',
        borderRadius: '8px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'auto'
      }}
      onMouseEnter={(e) => {
        console.log('🟣 Mouse entrou no logout')
        e.currentTarget.style.backgroundColor = '#dc2626'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ef4444'
      }}
    >
      <LogOut size={16} />
      Sair
    </button>
  )
}