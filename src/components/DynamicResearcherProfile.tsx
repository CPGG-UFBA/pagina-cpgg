import { useState, useEffect } from 'react'
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
        .single()

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

  if (isLoading) {
    return <div>Carregando perfil...</div>
  }

  // Usa dados do usuário se disponível, senão usa dados estáticos
  const description = userProfile?.description || staticDescription
  const photoUrl = userProfile?.photo_url || staticPhotoUrl

  return (
    <div className="w-full relative">
      {photoUrl && (
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
          <div className="flex flex-col items-center gap-2">
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
            <div className="absolute bottom-[-30px]">
              {belowPhoto}
            </div>
          </div>
        </div>
      )}
      {!photoUrl && belowPhoto && (
        <div 
          className="absolute"
          style={{
            width: '180px',
            height: '180px',
            top: '3%', 
            left: '2%',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
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