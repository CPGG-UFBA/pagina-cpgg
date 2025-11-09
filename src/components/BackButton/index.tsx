import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './BackButton.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export function BackButton() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <button 
      className={styles.backButton}
      onClick={() => navigate('/researchers')}
      aria-label={t('button.backToResearchers')}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{t('button.back')}</span>
    </button>
  )
}