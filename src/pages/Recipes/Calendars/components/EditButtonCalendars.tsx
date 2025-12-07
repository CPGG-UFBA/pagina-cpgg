import { useEffect } from 'react'

interface EditButtonCalendarsProps {
  onClick: () => void
  isEditMode: boolean
  onLogout: () => void
}

export function EditButtonCalendars({ onClick, isEditMode, onLogout }: EditButtonCalendarsProps) {
  useEffect(() => {
    const button = document.createElement('button')
    button.id = 'floating-edit-calendars-button'

    const updateButtonContent = () => {
      if (isEditMode) {
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" x2="9" y1="12" y2="12"/>
          </svg>
          <span>Sair</span>
        `
        button.style.padding = '8px 16px'
        button.style.borderRadius = '20px'
        button.style.background = '#ef4444'
        button.style.color = 'white'
      } else {
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
          </svg>
          <span>Editar</span>
        `
        button.style.padding = '8px 16px'
        button.style.borderRadius = '20px'
        button.style.background = 'linear-gradient(135deg, rgba(89, 44, 187, 0.95), rgba(63, 9, 121, 0.95))'
        button.style.color = 'white'
      }
    }

    updateButtonContent()

    button.style.cssText += `
      position: fixed;
      bottom: 70px;
      right: 20px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    `

    button.addEventListener('click', () => {
      if (isEditMode) {
        onLogout()
      } else {
        onClick()
      }
    })

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)'
      button.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)'
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)'
      button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
    })

    document.body.appendChild(button)

    return () => {
      const existingButton = document.getElementById('floating-edit-calendars-button')
      if (existingButton) {
        document.body.removeChild(existingButton)
      }
    }
  }, [isEditMode, onClick, onLogout])

  return null
}
