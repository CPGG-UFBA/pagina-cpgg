import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { ResearcherProfileProvider } from './ResearcherProfileContext'

interface DynamicResearcherProfileProps {
  researcherName: string
  staticDescription: string
  staticPhotoUrl?: string
  belowPhoto?: React.ReactNode
}

export function DynamicResearcherProfile({ 
  researcherName, 
  staticDescription,
  staticPhotoUrl,
  belowPhoto
}: DynamicResearcherProfileProps) {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchUserProfile()
  }, [researcherName])

  const fetchUserProfile = async () => {
    try {
      const firstName = researcherName.split(' ')[0].toLowerCase()
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .ilike('first_name', firstName)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setUserProfile(data)
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Usa dados do usuário se disponível, senão usa dados estáticos
  const description = userProfile?.description || staticDescription
  const photoUrl = userProfile?.photo_url || staticPhotoUrl

  // Hide box2 if we have a custom photo
  useEffect(() => {
    if (!containerRef.current) return
    
    const box1 = containerRef.current.closest('[class*="box1"]')
    if (!box1) return
    
    const box2 = box1.parentElement?.querySelector('[class*="box2"]') as HTMLElement
    if (box2 && photoUrl) {
      box2.style.display = 'none'
    } else if (box2 && !photoUrl) {
      box2.style.display = ''
    }
  }, [photoUrl])

  if (isLoading) {
    return <div>Carregando perfil...</div>
  }

  return (
    <ResearcherProfileProvider value={{ staticDescription }}>
      <div ref={containerRef} style={{ position: 'relative' }}>
        {photoUrl && (
          <>
            <div 
              style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                top: '-90px',
                left: '-210px',
                zIndex: 10
              }}
            >
              <img 
                src={photoUrl} 
                alt={`Foto de ${researcherName}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '2px solid rgba(255,255,255,.2)',
                  borderRadius: '20px',
                  padding: '10px',
                  backgroundColor: 'rgba(255,255,255, 0.2)'
                }}
                loading="lazy"
              />
            </div>
            {belowPhoto && (
              <div 
                style={{
                  position: 'absolute',
                  width: '180px',
                  top: '100px',
                  left: '-210px',
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {belowPhoto}
              </div>
            )}
          </>
        )}
        {!photoUrl && belowPhoto && (
          <div 
            style={{
              position: 'absolute',
              width: '180px',
              top: '100px',
              left: '-210px',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {belowPhoto}
          </div>
        )}
        <p style={{ 
          whiteSpace: 'pre-line',
          textAlign: 'justify',
          lineHeight: '35px',
          margin: 0,
          padding: 0
        }}>
          {description}
        </p>
      </div>
    </ResearcherProfileProvider>
  )
}
