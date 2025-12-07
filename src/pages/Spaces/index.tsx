import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './spaces-no-scroll.css';
import styles from './Spaces.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earthImage from '../../assets/earth-imgur.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Laboratory {
  id: string;
  name: string;
  acronym: string;
  chief_name: string;
  description: string | null;
  pnipe_address: string | null;
  photo1_url: string | null;
}

export function Spaces() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const { data, error } = await supabase
          .from('laboratories')
          .select('id, name, acronym, chief_name, description, pnipe_address, photo1_url')
          .order('created_at', { ascending: true });

        if (error) throw error;
        
        setLaboratories(data || []);
      } catch (error) {
        console.error('Erro ao buscar laboratórios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaboratories();
  }, []);

  const handleLabClick = (acronym: string) => {
    // Navega para a página do laboratório baseado na sigla
    navigate(`/labs/${acronym.toLowerCase()}`);
  };
  
  return (
    <div className={`${styles.pageContainer} spaces-page`}>
      <Header/>
      <main className={`${styles.spaces} spaces`}>
        <h1 className={styles.title}>{t('spaces.title')}</h1>

        <div className={styles.container}>
          {/* Cards fixos: Auditório e Sala de Reuniões */}
          <Link className={styles.card} to="/spaces/auditory">
            <div className={styles.auditory}>
              <h2>{t('spaces.auditory')}</h2>
            </div>
          </Link>

          <Link className={styles.card} to="/spaces/meeting-room">
            <div className={styles.meetingroom}>
              <h2>{t('spaces.meetingRoom')}</h2>
            </div>
          </Link>

          {/* Cards dinâmicos de laboratórios - excluindo LAIGA */}
          {loading ? (
            <div className={styles.loadingMessage}>Carregando laboratórios...</div>
          ) : (
            laboratories
              .filter((lab) => lab.acronym.toUpperCase() !== 'LAIGA')
              .map((lab) => (
                <div 
                  key={lab.id} 
                  className={styles.card}
                  onClick={() => handleLabClick(lab.acronym)}
                  style={{ cursor: 'pointer' }}
                >
                  <div 
                    className={styles.laboratory}
                    style={{
                      backgroundImage: lab.photo1_url 
                        ? `linear-gradient(135deg, rgba(2,0,36,0.75), rgba(9,94,121,0.75)), url(${lab.photo1_url})`
                        : 'linear-gradient(135deg, rgba(2,0,36,0.85), rgba(9,94,121,0.85))'
                    }}
                  >
                    <h2>{lab.acronym}</h2>
                    <p className={styles.labName}>{lab.name}</p>
                  </div>
                </div>
              ))
          )}
        </div>
      </main>
      <Footer/>
    </div>
  )
}