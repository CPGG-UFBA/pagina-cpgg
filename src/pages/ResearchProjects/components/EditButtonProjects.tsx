import { useState, useEffect } from 'react'
import { Edit3, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EditButtonProjectsProps {
  onClick: () => void
  isEditMode: boolean
  onLogout: () => void
}

export function EditButtonProjects({ onClick, isEditMode, onLogout }: EditButtonProjectsProps) {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Criar botão diretamente no body para escapar do overflow: hidden
    const existingButton = document.getElementById('research-projects-edit-button')
    if (existingButton) existingButton.remove()

    const buttonContainer = document.createElement('div')
    buttonContainer.id = 'research-projects-edit-button'
    buttonContainer.style.cssText = `
      position: fixed !important;
      bottom: 16px !important;
      right: 16px !important;
      z-index: 999999 !important;
      pointer-events: auto !important;
    `

    const button = document.createElement('button')
    button.innerHTML = isEditMode 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>Sair do Modo Edição`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>`
    
    button.style.cssText = `
      padding: ${isEditMode ? '12px 20px' : '10px'} !important;
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
      width: ${isEditMode ? 'auto' : '40px'} !important;
      height: 40px !important;
    `

    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log(isEditMode ? '🔴 LOGOUT CLICADO - Projetos' : '🔵 EDITAR CLICADO - Projetos')
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

    buttonContainer.appendChild(button)
    document.body.appendChild(buttonContainer)

    return () => {
      const btn = document.getElementById('research-projects-edit-button')
      if (btn) btn.remove()
    }
  }, [isEditMode, onClick, onLogout])

  return null
}