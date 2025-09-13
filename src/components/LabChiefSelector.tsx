import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Settings } from 'lucide-react'

interface Laboratory {
  id: string
  name: string
  acronym: string
  chief_user_id: string | null
  chief_alternative_email: string | null
}

interface LabChiefSelectorProps {
  userId: string
  userName: string
}

export function LabChiefSelector({ userId, userName }: LabChiefSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [laboratories, setLaboratories] = useState<Laboratory[]>([])
  const [selectedLabs, setSelectedLabs] = useState<string[]>([])
  const [alternativeEmails, setAlternativeEmails] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const loadLaboratories = async () => {
    if (!isOpen) return
    
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('laboratories')
        .select('id, name, acronym, chief_user_id, chief_alternative_email')
        .order('name')

      if (error) throw error

      setLaboratories(data || [])
      
      // Carregar labs onde o usuário já é chefe
      const userLabs = data?.filter(lab => lab.chief_user_id === userId) || []
      setSelectedLabs(userLabs.map(lab => lab.id))
      
      // Carregar emails alternativos existentes
      const emails: { [key: string]: string } = {}
      userLabs.forEach(lab => {
        if (lab.chief_alternative_email) {
          emails[lab.id] = lab.chief_alternative_email
        }
      })
      setAlternativeEmails(emails)
    } catch (error: any) {
      console.error('Erro ao carregar laboratórios:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar laboratórios.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLaboratories()
  }, [isOpen])

  const handleLabSelection = (labId: string, checked: boolean) => {
    if (checked) {
      setSelectedLabs(prev => [...prev, labId])
    } else {
      setSelectedLabs(prev => prev.filter(id => id !== labId))
      // Remove o email alternativo se o lab foi desmarcado
      setAlternativeEmails(prev => {
        const updated = { ...prev }
        delete updated[labId]
        return updated
      })
    }
  }

  const handleEmailChange = (labId: string, email: string) => {
    setAlternativeEmails(prev => ({
      ...prev,
      [labId]: email
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Primeiro, remove o usuário como chefe de todos os labs
      await supabase
        .from('laboratories')
        .update({ 
          chief_user_id: null,
          chief_alternative_email: null 
        })
        .eq('chief_user_id', userId)

      // Depois, define o usuário como chefe dos labs selecionados
      if (selectedLabs.length > 0) {
        const updates = selectedLabs.map(labId => ({
          id: labId,
          chief_user_id: userId,
          chief_alternative_email: alternativeEmails[labId] || null
        }))

        for (const update of updates) {
          const { error } = await supabase
            .from('laboratories')
            .update({
              chief_user_id: update.chief_user_id,
              chief_alternative_email: update.chief_alternative_email
            })
            .eq('id', update.id)

          if (error) throw error
        }
      }

      toast({
        title: 'Sucesso',
        description: `${userName} foi designado como chefe dos laboratórios selecionados.`,
      })

      setIsOpen(false)
    } catch (error: any) {
      console.error('Erro ao salvar designações:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar designações. Tente novamente.',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="ml-2"
      >
        <Settings className="w-4 h-4 mr-1" />
        Labs
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Designar como Chefe de Laboratórios - {userName}
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="p-4 text-center">Carregando laboratórios...</div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selecione os laboratórios onde {userName} será chefe. As reservas destes laboratórios serão enviadas para o email do usuário ou para o email alternativo, se fornecido.
              </p>

              {laboratories.map(lab => (
                <div key={lab.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`lab-${lab.id}`}
                      checked={selectedLabs.includes(lab.id)}
                      onCheckedChange={(checked) => 
                        handleLabSelection(lab.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={`lab-${lab.id}`} className="font-medium">
                      {lab.name} ({lab.acronym})
                    </Label>
                  </div>

                  {selectedLabs.includes(lab.id) && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor={`email-${lab.id}`} className="text-sm">
                        Email alternativo (opcional):
                      </Label>
                      <Input
                        id={`email-${lab.id}`}
                        type="email"
                        placeholder="Email alternativo para este laboratório"
                        value={alternativeEmails[lab.id] || ''}
                        onChange={(e) => handleEmailChange(lab.id, e.target.value)}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Se não fornecido, as reservas serão enviadas para o email principal do usuário.
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {laboratories.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  Nenhum laboratório cadastrado encontrado.
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || isLoading}
            >
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}