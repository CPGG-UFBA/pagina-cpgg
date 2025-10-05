import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { supabase } from '@/integrations/supabase/client'
import { DynamicResearcherProfile } from '../../../components/DynamicResearcherProfile'
import { ResearcherEditButton } from '../../../components/ResearcherEditButton'
import { BackButton } from '../../../components/BackButton'
import { getResearcherPhoto } from '../../../data/researcher-photos'
import styles from '../Personal_pages/Landim/Landim.module.css'

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
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    if (id) {
      fetchResearcher(id)
    }
  }, [id])

  useEffect(() => {
    checkEditPermission()
  }, [researcher])

  const checkEditPermission = async () => {
    if (!researcher) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setCanEdit(false)
        return
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .maybeSingle()

      if (profile && profile.full_name.toLowerCase() === researcher.name.toLowerCase()) {
        setCanEdit(true)
      } else {
        setCanEdit(false)
      }
    } catch (error) {
      console.error('Erro ao verificar permissão:', error)
      setCanEdit(false)
    }
  }

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

  const photoUrl = getResearcherPhoto(researcher.name)

  return (
    <div className={styles.Container}>
      <Header />
      <div>
        <div className={styles.Professor}>
          <BackButton />
          {photoUrl && (
            <>
              <div 
                style={{
                  position: 'absolute',
                  width: '180px',
                  height: '180px',
                  top: '3%',
                  left: '2%',
                  border: '2px solid rgba(255,255,255,.2)',
                  borderRadius: '20px',
                  padding: '10px',
                  backgroundColor: 'rgba(255,255,255, 0.2)',
                  zIndex: 10
                }}
              >
                <img 
                  src={photoUrl} 
                  alt={`Foto de ${researcher.name}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                  loading="lazy"
                />
              </div>
              {canEdit && (
                <div 
                  style={{
                    position: 'absolute',
                    width: '180px',
                    top: 'calc(3% + 200px)',
                    left: '2%',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 10
                  }}
                >
                  <ResearcherEditButton researcherName={researcher.name} inline />
                </div>
              )}
            </>
          )}
          <p>{researcher.name}</p>
          <div className={styles.box1}>
            <DynamicResearcherProfile 
              researcherName={researcher.name}
              staticDescription={researcher.description}
              staticPhotoUrl={photoUrl}
            />
            <ul>Link para Currículo Lattes</ul>
            <nav>
              {researcher.lattes_link && (
                <a href={researcher.lattes_link} target="_blank" rel="noopener noreferrer">
                  Currículo
                </a>
              )}
            </nav>
            <b>e-mail</b>
            <p>{researcher.email}</p>
            <div 
              className={styles.box2}
              style={{
                background: photoUrl 
                  ? `linear-gradient(90deg, rgba(2,0,36,0.1) 0%, rgba(63,9,121,0.1)), url('${photoUrl}') center/cover`
                  : undefined
              }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}