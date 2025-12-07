import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './BackButtonPhotos.module.css'

interface BackButtonPhotosProps {
  to?: string
}

export function BackButtonPhotos({ to = '/Photos' }: BackButtonPhotosProps) {
  const navigate = useNavigate()

  return (
    <button 
      className={styles.backButton}
      onClick={() => navigate(to)}
      aria-label="Voltar"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Voltar</span>
    </button>
  )
}