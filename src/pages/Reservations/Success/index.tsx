import styles from './Success.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { useLocation } from 'react-router-dom'

export function Success() {
  const { t } = useLanguage()
  const location = useLocation()
  const serviceType = location.state?.serviceType
  
  const getSuccessMessage = () => {
    if (serviceType === 'infraestrutura') {
      return {
        title: 'Solicitação Enviada com Sucesso!',
        message: 'A secretária do CPGG entrará em contato em breve por e-mail.'
      }
    } else if (serviceType === 'ti') {
      return {
        title: 'Solicitação Enviada com Sucesso!',
        message: 'Nosso(a) servidor(a) entrará em contato em breve por e-mail.'
      }
    } else {
      return {
        title: t('reservation.successTitle'),
        message: t('reservation.successMessage')
      }
    }
  }
  
  const { title, message } = getSuccessMessage()
  
  return (
    <div className={styles.successContainer}>
      <Header />
      <div className={styles.success}>
          <ul>{title}</ul>
          <p>{message}</p>
        </div>
        
      <Footer />
    </div>
  )
}
