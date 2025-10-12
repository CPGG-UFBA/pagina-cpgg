import { useEffect } from 'react'

interface EditButtonProps {
  onClick: () => void
  isEditMode: boolean
  onLogout: () => void
}

export function EditButton({ onClick, isEditMode, onLogout }: EditButtonProps) {
  useEffect(() => {
    // Remover botão anterior se existir
    const oldButton = document.getElementById('floating-edit-button')
    if (oldButton) oldButton.remove()

    // Criar botão diretamente no body
    const button = document.createElement('button')
    button.id = 'floating-edit-button'
    button.innerHTML = isEditMode 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>Sair do Modo Edição`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>Modo Edição`
    
    button.style.cssText = `
      position: fixed !important;
      bottom: 16px !important;
      right: 16px !important;
      z-index: 999999999 !important;
      padding: 12px 20px !important;
      border-radius: 8px !important;
      background-color: ${isEditMode ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'} !important;
      color: ${isEditMode ? 'hsl(var(--destructive-foreground))' : 'hsl(var(--primary-foreground))'} !important;
      border: none !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      pointer-events: auto !important;
      font-family: system-ui, -apple-system, sans-serif !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      transition: all 0.2s ease !important;
    `

    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log(isEditMode ? '🔴 LOGOUT CLICADO!' : '🔵 EDITAR CLICADO!')
      if (isEditMode) {
        onLogout()
      } else {
        onClick()
      }
    })

    button.addEventListener('mouseenter', () => {
      button.style.opacity = '0.9'
    })

    button.addEventListener('mouseleave', () => {
      button.style.opacity = '1'
    })

    document.body.appendChild(button)

    return () => {
      const btn = document.getElementById('floating-edit-button')
      if (btn) btn.remove()
    }
  }, [isEditMode, onClick, onLogout])

  return null
}