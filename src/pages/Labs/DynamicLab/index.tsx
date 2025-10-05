import { useState, useEffect } from 'react';
import styles from '../Laiga/laiga.module.css';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Laboratory {
  id: string;
  name: string;
  acronym: string;
  chief_name: string;
  description: string | null;
  pnipe_address: string | null;
}

export function DynamicLab() {
  const { t } = useLanguage();
  const { acronym } = useParams<{ acronym: string }>();
  const navigate = useNavigate();
  const [laboratory, setLaboratory] = useState<Laboratory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaboratory = async () => {
      if (!acronym) return;

      try {
        const { data, error } = await supabase
          .from('laboratories')
          .select('*')
          .eq('acronym', acronym.toUpperCase())
          .single();

        if (error) throw error;
        setLaboratory(data);
      } catch (error) {
        console.error('Erro ao buscar laboratório:', error);
        navigate('/Spaces');
      } finally {
        setLoading(false);
      }
    };

    fetchLaboratory();
  }, [acronym, navigate]);

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.laiga}>
          <div className={styles.Title}>
            <ul>Carregando...</ul>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!laboratory) {
    return null;
  }

  return (
    <>
      <Header />
      <div className={styles.laiga}>
        <div className={styles.Title}>
          <ul>{laboratory.name}</ul>
          <a>{laboratory.acronym}</a>
          <div className={styles.box}>
            {laboratory.description && (
              <>
                <p>{laboratory.description}</p>
                <br />
              </>
            )}
            
            <p>
              Acesse o site da Plataforma Nacional de Infraestrutura de Pesquisa-PNIPE, 
              e veja as fotos e mais detalhes sobre os equipamentos disponíveis.
            </p>

            {laboratory.pnipe_address && (
              <nav>
                <a 
                  href={laboratory.pnipe_address} 
                  target="_blank" 
                  rel="noreferrer"
                  className={styles.purpleLink}
                >
                  {t('laiga.pnipeSite')}
                </a>
              </nav>
            )}

            <p>
              Para saber da disponibilidade dos equipamentos e solicitá-los para uso, 
              acesse nossa plataforma de requerimento.
            </p>
            <br />
            
            <b className={styles.purpleText}>
              Chefe do {laboratory.name}
            </b>
            <span>{laboratory.chief_name}</span>

            <div className={styles.requerimentoButton}>
              <a href="/Labs/Laiga/ReservationForm" className={styles.buttonLink}>
                {t('laiga.requestButton')}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
