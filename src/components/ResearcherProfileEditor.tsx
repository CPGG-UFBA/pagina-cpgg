import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit, Save, X } from 'lucide-react'

interface ResearcherProfileEditorProps {
  researcherName: string
  currentDescription?: string
  onUpdate?: () => void
}

export function ResearcherProfileEditor({ 
  researcherName, 
  currentDescription = '',
  onUpdate 
}: ResearcherProfileEditorProps) {
  const [user, setUser] = useState<any>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [description, setDescription] = useState(currentDescription)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // Verifica se o usuário tem autorização para editar este pesquisador
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('first_name, researcher_route')
          .eq('user_id', user.id)
          .single()

        if (profile) {
          // Verifica se o primeiro nome corresponde ao nome do pesquisador atual
          const profileFirstName = profile.first_name.toLowerCase()
          const researcherFirstName = researcherName.split(' ')[0].toLowerCase()
          
          if (profileFirstName === researcherFirstName) {
            setIsAuthorized(true)
          }
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autorização:', error)
    }
  }

  const handleSave = async () => {
    if (!user || !isAuthorized) return
    
    setIsLoading(true)
    
    try {
      let photoUrl = null
      
      // Upload da foto se fornecida
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `${user.id}_${Date.now()}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('laboratory-photos')
          .upload(`researchers/${fileName}`, photoFile)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('laboratory-photos')
          .getPublicUrl(`researchers/${fileName}`)
        
        photoUrl = publicUrl
      }
      
      // Atualiza o perfil do usuário
      const updateData: any = {
        description: description
      }
      
      if (photoUrl) {
        updateData.photo_url = photoUrl
      }
      
      const { error } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('user_id', user.id)
      
      if (error) throw error
      
      toast({
        title: 'Perfil atualizado',
        description: 'Suas alterações foram salvas com sucesso.'
      })
      
      setIsEditing(false)
      setIsDialogOpen(false)
      setPhotoFile(null)
      
      if (onUpdate) {
        onUpdate()
      }
      
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Verifica se é uma imagem
      if (file.type.startsWith('image/')) {
        setPhotoFile(file)
      } else {
        toast({
          title: 'Arquivo inválido',
          description: 'Por favor, selecione uma imagem.',
          variant: 'destructive'
        })
      }
    }
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90 shadow-lg"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar Perfil
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Foto do Perfil
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            {photoFile && (
              <p className="text-xs text-muted-foreground mt-1">
                Arquivo selecionado: {photoFile.name}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Descrição
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva sua experiência, formação e áreas de pesquisa..."
              rows={8}
              className="resize-none"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>Salvando...</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false)
                setDescription(currentDescription)
                setPhotoFile(null)
              }}
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}