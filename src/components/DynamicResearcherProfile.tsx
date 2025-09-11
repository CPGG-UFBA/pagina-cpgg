import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/integrations/supabase/client'

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
  const rootRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    const root = rootRef.current
    const parent = root?.parentElement
    const box2 = parent?.querySelector('[class*="box2"]') as HTMLElement | null
    if (box2) {
      if (photoUrl) {
        box2.style.display = 'none'
      } else {
        box2.style.display = ''
      }
    }
  }, [photoUrl])

  if (isLoading) {
    return <div>Carregando perfil...</div>
  }

  return (
    <div className="w-full" ref={rootRef}>
      {photoUrl && (
        <>
          <div 
            className="absolute"
            style={{
              width: '180px',
              height: '180px',
              top: '3%', 
              left: '2%',
              zIndex: 10
            }}
          >
            <img 
              src={photoUrl} 
              alt={`Foto de ${researcherName}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
              style={{
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
              className="absolute"
              style={{
                width: '180px',
                top: 'calc(3% + 190px)', 
                left: '2%',
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
          className="absolute"
          style={{
            width: '180px',
            top: 'calc(3% + 190px)', 
            left: '2%',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {belowPhoto}
        </div>
      )}
      <div className="w-full" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div style={{ whiteSpace: 'pre-line', textAlign: 'justify', paddingLeft: 0, paddingRight: 0, margin: 0 }}>{description}</div>
      </div>
    </div>
  )
}