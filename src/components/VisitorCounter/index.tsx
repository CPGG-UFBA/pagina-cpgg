import { useEffect, useState } from 'react';
import styles from './VisitorCounter.module.css';

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Função para gerar um hash simples do IP (simulado com fingerprint do browser)
    const generateVisitorId = (): string => {
      // Usa informações do browser para criar um ID único aproximado
      const navigator = window.navigator;
      const screen = window.screen;
      
      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        screen.colorDepth,
        new Date().getTimezoneOffset(),
        navigator.platform
      ].join('|');
      
      // Hash simples
      let hash = 0;
      for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      
      return Math.abs(hash).toString();
    };

    const trackVisitor = () => {
      const visitorId = generateVisitorId();
      const storageKey = 'cpgg_unique_visitors';
      const sessionKey = `cpgg_session_${visitorId}`;
      
      // Verifica se já visitou nesta sessão
      if (!sessionStorage.getItem(sessionKey)) {
        // Marca como visitou nesta sessão
        sessionStorage.setItem(sessionKey, 'true');
        
        // Recupera visitantes únicos do localStorage
        const existingVisitors = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        // Adiciona se não existir
        if (!existingVisitors.includes(visitorId)) {
          existingVisitors.push(visitorId);
          localStorage.setItem(storageKey, JSON.stringify(existingVisitors));
        }
        
        setVisitorCount(existingVisitors.length);
      } else {
        // Apenas mostra o count atual
        const existingVisitors = JSON.parse(localStorage.getItem(storageKey) || '[]');
        setVisitorCount(existingVisitors.length);
      }
    };

    trackVisitor();
  }, []);

  return (
    <div className={styles.counter}>
      <span className={styles.text}>
        Visitantes: {visitorCount.toLocaleString()}
      </span>
    </div>
  );
}