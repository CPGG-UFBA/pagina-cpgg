import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import { HomeButton } from '../../components/HomeButton';
import styles from './email-confirmed.module.css';

const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

export function EmailConfirmed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Force remove scroll
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    // Handle the auth callback if there's a token
    const handleAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If there's a session, the email was confirmed successfully
      if (session) {
        console.log('Email confirmed, user logged in:', session.user.email);
      }
    };

    handleAuthCallback();
  }, []);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <HomeButton />
      
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>
        
        <div className={styles.messageBox}>
          <div className={styles.iconSuccess}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          
          <h1 className={styles.title}>Cadastro Confirmado!</h1>
          
          <p className={styles.message}>
            Seu email foi verificado com sucesso e seu cadastro está completo.
          </p>
          
          <p className={styles.submessage}>
            Agora você pode fazer login na plataforma e editar suas informações pessoais.
          </p>
          
          <div className={styles.buttons}>
            <button 
              onClick={handleGoToLogin}
              className={styles.loginButton}
            >
              Ir para Login
            </button>
            
            <button 
              onClick={handleGoHome}
              className={styles.homeButton}
            >
              Ir para Página Inicial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmed;
