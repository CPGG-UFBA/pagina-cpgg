import { useState, useEffect } from 'react'
import { Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface ResearcherEditButtonProps {
  researcherName: string
  inline?: boolean
}

export function ResearcherEditButton({ researcherName, inline = false }: ResearcherEditButtonProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [profileEmail, setProfileEmail] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const { toast } = useToast()

  // Função para extrair primeiro nome do nome completo
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0].toLowerCase()
  }

  // Verifica se o usuário pode editar baseado no nome
  const canUserEdit = (userFirstName: string, researcherName: string) => {
    const researcherFirstName = getFirstName(researcherName)
    return userFirstName === researcherFirstName
  }

  // Carrega perfil existente do pesquisador
  useEffect(() => {
    const loadResearcherProfile = async () => {
      const firstName = getFirstName(researcherName)
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .ilike('first_name', firstName)
        .maybeSingle()

      if (data) {
        setDescription(data.description || '')
        setProfileEmail(data.email || '')
        setCurrentPhotoUrl(data.photo_url)
      }
    }

    loadResearcherProfile()
  }, [researcherName])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          title: "Erro",
          description: "Email ou senha inválidos",
          variant: "destructive",
        })
        return
      }

      // Busca o perfil do usuário para verificar o primeiro nome
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .maybeSingle()

      if (profileError || !profile) {
        toast({
          title: "Erro",
          description: "Perfil não encontrado",
          variant: "destructive",
        })
        await supabase.auth.signOut()
        return
      }

      const userFirstName = getFirstName(profile.full_name)
      
      if (!canUserEdit(userFirstName, researcherName)) {
        toast({
          title: "Acesso negado",
          description: "Você só pode editar seu próprio perfil",
          variant: "destructive",
        })
        await supabase.auth.signOut()
        return
      }

      setUserProfile(profile)
      // Preserve existing description and email if they were already loaded
      if (!description && profile.description) {
        setDescription(profile.description)
      }
      if (!profileEmail && profile.email) {
        setProfileEmail(profile.email)
      }
      if (!currentPhotoUrl && profile.photo_url) {
        setCurrentPhotoUrl(profile.photo_url)
      }
      setIsAuthenticated(true)
      setIsLoginOpen(false)
      setIsEditOpen(true)
      
      toast({
        title: "Acesso autorizado",
        description: "Agora você pode editar seu perfil",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer login",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!userProfile) return
    
    setLoading(true)
    
    try {
      let photoUrl = currentPhotoUrl

      // Upload da foto se houver uma nova
      if (photo) {
        const fileExt = photo.name.split('.').pop()
        const fileName = `${userProfile.id}-${Date.now()}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('laboratory-photos')
          .upload(fileName, photo)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('laboratory-photos')
          .getPublicUrl(fileName)

        photoUrl = publicUrl
      }

      // Atualiza o perfil
      const { error } = await supabase
        .from('user_profiles')
        .update({
          description,
          email: profileEmail,
          photo_url: photoUrl,
        })
        .eq('user_id', userProfile.user_id)

      if (error) throw error

      setCurrentPhotoUrl(photoUrl)
      setIsEditOpen(false)
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso",
      })
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setUserProfile(null)
    setEmail('')
    setPassword('')
    setDescription('')
    setProfileEmail('')
    setCurrentPhotoUrl(null)
    setPhoto(null)
    setIsEditOpen(false)
  }

  return (
    <>
      {/* Botão discreto de edição */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsLoginOpen(true)}
        className={inline ? "mt-2 self-start opacity-70 hover:opacity-100 transition-opacity" : "fixed top-20 right-4 opacity-70 hover:opacity-100 transition-opacity z-50 bg-background/80 backdrop-blur-sm border"}
        title="Editar perfil"
      >
        <Edit3 className="w-4 h-4" />
      </Button>

      {/* Dialog de Login */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login do Pesquisador</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Faça login com suas credenciais para editar seu perfil
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsLoginOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Perfil - {researcherName}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Edite sua descrição e foto do perfil
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Digite sua descrição profissional..."
              />
            </div>
            <div>
              <Label htmlFor="profileEmail">Email</Label>
              <Input
                id="profileEmail"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                placeholder="Digite seu email..."
              />
            </div>
            <div>
              <Label htmlFor="photo">Foto do Perfil</Label>
              {currentPhotoUrl && (
                <div className="mb-2">
                  <img 
                    src={currentPhotoUrl} 
                    alt="Foto atual" 
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}