import styles from './Contact.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import earth from '../../assets/earth-imgur.png'
import Whats from '../../assets/whatsapp-icon.png'
import { useToast } from '@/hooks/use-toast'

export function Contact() {
  const phoneNumber = '+55(71)3283-8531'
  const whatsappNumber = '5571328385531'
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá!')}`
  const { toast } = useToast()
  const copyWhatsAppLink = async () => {
    try {
      await navigator.clipboard.writeText(whatsappHref)
      toast({
        title: 'Link copiado',
        description: 'Abra uma nova guia e cole o link para iniciar a conversa.',
      })
    } catch (_) {
      alert('Não foi possível copiar automaticamente. Copie manualmente: ' + whatsappHref)
    }
  }

  return (
    <>
      <Header />
      <div className={styles.contact}>
        <ul> E-mail us at </ul>
        <p> secretaria.cpgg.ufba@gmail.com</p>

        <div className={styles.whatsappSection}>
          <button type="button" className={styles.whatsappLink} onClick={copyWhatsAppLink} aria-label="Copiar link do WhatsApp">
            <img src={Whats} alt="WhatsApp ícone" className={styles.whatsappIcon} />
            <span>Copiar link</span>
          </button>
        </div>

        <b> {phoneNumber}</b>
        <p className={styles.address}> Av. Anita Garibaldi, s/n -Acesso Portão 2. Ondina, Salvador - BA, 40170-290</p>
        <p className={styles.building}> Bloco E- Anexo ao Instituto de Geociências</p>

        <div className={styles.staticFigure}>
          <img src={earth} alt="Terra" />
        </div>
      </div>

      <Footer />
    </>
  )
}
