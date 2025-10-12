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
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Sair`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>`
    
    button.style.cssText = `
      position: fixed !important;
      bottom: 16px !important;
      right: 16px !important;
      z-index: 999999999 !important;
      ${isEditMode ? 'padding: 12px 24px;' : 'width: 60px; height: 60px;'}
      border-radius: ${isEditMode ? '8px' : '50%'} !important;
      background-color: ${isEditMode ? '#ef4444' : '#3b82f6'} !important;
      color: white !important;
      border: none !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      pointer-events: auto !important;
      font-family: system-ui, -apple-system, sans-serif !important;
      font-size: 14px !important;
      font-weight: 500 !important;
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
      button.style.backgroundColor = isEditMode ? '#dc2626' : '#2563eb'
    })

    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = isEditMode ? '#ef4444' : '#3b82f6'
    })

    document.body.appendChild(button)

    return () => {
      const btn = document.getElementById('floating-edit-button')
      if (btn) btn.remove()
    }
  }, [isEditMode, onClick, onLogout])

  return null
}