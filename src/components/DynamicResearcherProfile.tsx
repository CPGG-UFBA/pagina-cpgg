import { useState, useEffect } from 'react'
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
    if (photoUrl) {
      // Find the box2 sibling
      const boxes = document.querySelectorAll('[class*="box2"]')
      boxes.forEach(box => {
        const htmlBox = box as HTMLElement
        const parent = htmlBox.parentElement
        const box1 = parent?.querySelector('[class*="box1"]')
        if (box1 && box1.querySelector('[data-researcher-profile]')) {
          htmlBox.style.display = 'none'
        }
      })
    }
  }, [photoUrl])

  if (isLoading) {
    return <div>Carregando perfil...</div>
  }

  return (
    <ResearcherProfileProvider value={{ staticDescription }}>
      <div data-researcher-profile>
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
                alt={`Foto de ${researcherName}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
                loading="lazy"
              />
            </div>
            {belowPhoto && (
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
              top: 'calc(3% + 200px)',
              left: '2%',
              display: 'flex',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            {belowPhoto}
          </div>
        )}
        <p style={{ 
          whiteSpace: 'pre-line',
          textAlign: 'justify',
          lineHeight: '35px',
          margin: 0
        }}>
          {description}
        </p>
      </div>
    </ResearcherProfileProvider>
  )
}
