import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './BackButton.module.css'

export function BackButton() {
  const navigate = useNavigate()

  return (
    <button 
      className={styles.backButton}
      onClick={() => navigate('/researchers')}
      aria-label="Voltar para lista de pesquisadores"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Voltar</span>
    </button>
  )
}