import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import styles from '../Researchers/Personal_pages/researcher.module.css'

interface UserProfile {
  id: string
  user_id: string
  full_name: string
  email: string
  institution: string
  phone: string
  first_name: string
  researcher_route: string | null
  photo_url: string | null
}

export function EditableProfile() {
  const { name } = useParams<{ name: string }>()
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({})
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (authLoading) return
    
    if (!user) {
      navigate('/auth', { state: { from: location } })
      return
    }

    if (name) {
      fetchUserProfile()
    }
  }, [name, user, authLoading, navigate])

  const fetchUserProfile = async () => {
    if (!name) return

    try {
      // Converte o nome da URL para buscar o perfil correspondente
      const searchName = decodeURIComponent(name).replace(/-/g, ' ')
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .ilike('full_name', `%${searchName}%`)
        .single()

      if (error) throw error

      // Verifica se o perfil encontrado pertence ao usuário logado
      if (data.user_id !== user?.id) {
        toast({
          title: 'Acesso negado',
          description: 'Você só pode editar seu próprio perfil.',
          variant: 'destructive',
        })
        navigate('/researchers')
        return
      }

      setProfile(data)
      setEditedProfile(data)
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      toast({
        title: 'Erro',
        description: 'Perfil não encontrado ou você não tem permissão para editá-lo.',
        variant: 'destructive',
      })
      navigate('/researchers')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile || !editedProfile) return

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: editedProfile.full_name,
          email: editedProfile.email,
          institution: editedProfile.institution,
          phone: editedProfile.phone,
        })
        .eq('id', profile.id)

      if (error) throw error

      setProfile({ ...profile, ...editedProfile })
      setIsEditing(false)
      
      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram salvas com sucesso.',
      })
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !profile) return

    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.user_id}.${fileExt}`
      const filePath = `profiles/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('laboratory-photos')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('laboratory-photos')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ photo_url: data.publicUrl })
        .eq('id', profile.id)

      if (updateError) throw updateError

      setProfile({ ...profile, photo_url: data.publicUrl })
      
      toast({
        title: 'Foto atualizada',
        description: 'Sua foto de perfil foi atualizada com sucesso.',
      })
    } catch (error: any) {
      toast({
        title: 'Erro no upload',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  if (authLoading || loading) {
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

  if (!profile) {
    return (
      <>
        <Header />
        <div className={styles.researcher}>
          <div className={styles.notFound}>Perfil não encontrado</div>
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
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Meu Perfil</CardTitle>
              <div className="space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm">
                      Salvar
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsEditing(false)
                        setEditedProfile(profile)
                      }} 
                      variant="outline" 
                      size="sm"
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} size="sm">
                    Editar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="text-center">
                    <div className="relative inline-block">
                      {profile.photo_url ? (
                        <img
                          src={profile.photo_url}
                          alt={profile.full_name}
                          className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-border"
                        />
                      ) : (
                        <div className="w-48 h-48 rounded-full bg-muted flex items-center justify-center mx-auto border-4 border-border">
                          <span className="text-muted-foreground">Sem foto</span>
                        </div>
                      )}
                      
                      {isEditing && (
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 rounded-full w-12 h-12"
                          size="sm"
                          disabled={uploading}
                        >
                          📷
                        </Button>
                      )}
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    
                    {uploading && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Enviando foto...
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nome Completo</Label>
                    {isEditing ? (
                      <Input
                        id="full_name"
                        value={editedProfile.full_name || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          full_name: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded">{profile.full_name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          email: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded">{profile.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="institution">Instituição</Label>
                    {isEditing ? (
                      <Input
                        id="institution"
                        value={editedProfile.institution || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          institution: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded">{profile.institution}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedProfile.phone || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          phone: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded">{profile.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}