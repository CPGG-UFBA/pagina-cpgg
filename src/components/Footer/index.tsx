import styles from './Footer.module.css'
import { Linkedin, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.image} />
      <div className={styles.bar}>
        <nav>
          <a href='http://www.cpgg.ufba.br' target="_blank" >Página Antiga-CPGG</a>
          <a href='https://www.linkedin.com/in/cpgg-centro-de-pesquisa-94768a304/' target="_blank" className={styles.socialLink} rel="noopener noreferrer">
            <Linkedin size={16} />
            Linkedin
          </a>
          <a
            href='https://instagram.com/cpgg.ufba/'
            target="_blank"
            rel="external noopener noreferrer"
            referrerPolicy="no-referrer"
            className={styles.socialLink}
            aria-label="Instagram do CPGG"
            title="Instagram do CPGG"
            onClick={(e) => {
              e.preventDefault();
              const url = 'https://instagram.com/cpgg.ufba/';
              const w = window.open(url, '_blank');
              if (!w) {
                try {
                  // Tenta navegar a janela principal (fora do iframe) por ativação do usuário
                  // Alguns ambientes de preview bloqueiam a navegação dentro do iframe
                  // isso evita o erro de conexão recusada no iframe
                  // @ts-ignore - window.top pode ser cross-origin
                  window.top.location.href = url;
                } catch (_) {
                  window.location.href = url;
                }
              }
            }}
          >
            <Instagram size={16} />
            Instagram
          </a>
          <a href='http://www.pggeofisica.ufba.br/' target="_blank">Pós-Graduação em Geofísica</a>
          <a href='https://pggeologia.ufba.br/' target="_blank" >Pós-Graduação em Geologia</a>
        </nav>
        <div className={styles.copyright}>
          © Todos os direitos reservados
        </div>
      </div>
    </footer>
  )
}
