import { useState, useEffect } from 'react';
import styles from './Regulations.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import earthImage from '../../assets/earth-regulations.jpg'

interface Regulation {
  id: string;
  name: string;
  pdf_url: string;
}

export function Regulations() {
  const [dynamicRegulations, setDynamicRegulations] = useState<Regulation[]>([]);

  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const { data, error } = await supabase
          .from('regulations')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        
        setDynamicRegulations(data || []);
      } catch (error) {
        console.error('Erro ao buscar normas:', error);
      }
    };

    fetchRegulations();
  }, []);

  return (
      <>
      <Header/>
          <div className={styles.regulations}>
              <h1 className={styles.title}>Regimento e Normas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="https://drive.google.com/file/d/1lKeG0fAc_HzBDP-C8WaaBIM5vOhVurBB/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.regulation}>
                          <h2>Regimento</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="https://drive.google.com/file/d/1gYKCWZw-1Io5FCGRtjPKBZNoWDKnMAmE/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.accreditation}>
                          <h2> Deliberação Normativa para (re)credenciamento</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/1lNFAxiARsoaADdfVeagH3Dcn3DpYR0w2/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.senior}>
                          <h2> Deliberação Normativa para pesquisadores seniores</h2>
                      </div>
                  </a>

                  {/* Normas dinâmicas do banco de dados */}
                  {dynamicRegulations.map((regulation) => (
                    <a 
                      key={regulation.id} 
                      className={styles.card} 
                      href={regulation.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <div className={styles.dynamicRegulation}>
                        <h2>{regulation.name}</h2>
                      </div>
                    </a>
                  ))}

              </div>
              <div className={styles.earthFigure}>
                  <img src={earthImage} alt='Figura da Terra do CPGG' />
              </div>
          </div>
          <Footer/>
      </>
  )
}
