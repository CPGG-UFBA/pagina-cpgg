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

  if (isLoading) {
    return <p>Carregando perfil...</p>
  }

  return (
    <ResearcherProfileProvider value={{ staticDescription, photoUrl, belowPhoto }}>
      <p style={{ fontSize: '10pt', textAlign: 'justify' }}>{description}</p>
    </ResearcherProfileProvider>
  )
}
