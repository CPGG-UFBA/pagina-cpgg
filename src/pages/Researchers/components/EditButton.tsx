import { Edit3, LogOut } from 'lucide-react'
import { useEffect } from 'react'

interface EditButtonProps {
  onClick: () => void
  isEditMode: boolean
  onLogout: () => void
}

export function EditButton({ onClick, isEditMode, onLogout }: EditButtonProps) {
  useEffect(() => {
    console.log('🟢 EditButton MONTADO!')
    console.log('🟢 isEditMode:', isEditMode)
    
    // Adicionar indicador visual de debug
    const debugDiv = document.createElement('div')
    debugDiv.id = 'edit-button-debug'
    debugDiv.textContent = 'BOTÃO AQUI'
    debugDiv.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 16px;
      background: red;
      color: white;
      padding: 10px;
      z-index: 9999999;
      font-weight: bold;
      border: 3px solid yellow;
    `
    document.body.appendChild(debugDiv)
    
    // Verificar elementos no ponto do botão
    setTimeout(() => {
      const buttonArea = { x: window.innerWidth - 50, y: window.innerHeight - 50 }
      const elementsAtPoint = document.elementsFromPoint(buttonArea.x, buttonArea.y)
      console.log('🔍 Elementos no ponto do botão:', elementsAtPoint.map(el => ({
        tag: el.tagName,
        id: el.id,
        classes: el.className,
        zIndex: window.getComputedStyle(el).zIndex,
        pointerEvents: window.getComputedStyle(el).pointerEvents
      })))
    }, 500)
    
    return () => {
      const el = document.getElementById('edit-button-debug')
      if (el) el.remove()
    }
  }, [isEditMode])

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
          zIndex: 9999999,
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
        zIndex: 9999999,
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