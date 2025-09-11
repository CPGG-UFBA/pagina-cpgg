import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { supabase } from '@/integrations/supabase/client'
import styles from '../Personal_pages/researcher.module.css'

interface Researcher {
  id: string
  name: string
  program: string
  email: string
  description: string
  lattes_link: string
}

export function DynamicResearcher() {
  const { id } = useParams<{ id: string }>()
  const [researcher, setResearcher] = useState<Researcher | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchResearcher(id)
    }
  }, [id])

  const fetchResearcher = async (researcherId: string) => {
    try {
      const { data, error } = await supabase
        .from('researchers')
        .select('*')
        .eq('id', researcherId)
        .single()

      if (error) throw error

      setResearcher(data)
    } catch (error) {
      console.error('Erro ao buscar pesquisador:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.researcher}>
          <div className={styles.loading}>Carregando...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (!researcher) {
    return (
      <>
        <Header />
        <div className={styles.researcher}>
          <div className={styles.notFound}>Pesquisador não encontrado</div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={`${styles.researcher} hide-earth`}>
        <div className={styles.container}>
          <div className={styles.profile}>
            <div className={styles.photoSection}>
              <div className={styles.photoPlaceholder}>
                <span>Foto não disponível</span>
              </div>
            </div>
            
            <div className={styles.info}>
              <h1>{researcher.name}</h1>
              <div className={styles.contact}>
                <p><strong>Email:</strong> <a href={`mailto:${researcher.email}`}>{researcher.email}</a></p>
                {researcher.lattes_link && (
                  <p>
                    <strong>Currículo Lattes:</strong> 
                    <a href={researcher.lattes_link} target="_blank" rel="noopener noreferrer">
                      Ver Currículo
                    </a>
                  </p>
                )}
              </div>
              
              <div className={`${styles.description} w-full px-4`}>
                <p style={{ whiteSpace: 'pre-line' }}>{researcher.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}