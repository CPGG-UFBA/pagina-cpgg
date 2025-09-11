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
    <div className="flex w-full items-start gap-6">
      <div className="flex flex-col items-center gap-3 min-w-[12rem]">
        {photoUrl && (
          <img 
            src={photoUrl} 
            alt={`Foto de ${researcherName}`}
            className="w-48 h-48 object-cover rounded-lg shadow-md"
            loading="lazy"
          />
        )}
        {belowPhoto}
      </div>
      <div className="flex-1 px-4">
        <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
      </div>
    </div>
  )
}