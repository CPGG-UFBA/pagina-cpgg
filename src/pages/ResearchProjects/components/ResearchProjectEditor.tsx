import { useState } from 'react'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'

interface ResearchProject {
  id: string
  title: string
  funding_agency: string
  validity_period: string
  coordinator: string
  vice_coordinator: string | null
  created_at: string
}

interface ResearchProjectEditorProps {
  projects: ResearchProject[]
  onProjectsUpdate: () => void
}

export function ResearchProjectEditor({ projects, onProjectsUpdate }: ResearchProjectEditorProps) {
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    funding_agency: '',
    validity_period: '',
    coordinator: '',
    vice_coordinator: ''
  })
  const { toast } = useToast()

  const handleAddProject = async () => {
    try {
      const { error } = await supabase
        .from('research_projects')
        .insert([{
          title: formData.title,
          funding_agency: formData.funding_agency,
          validity_period: formData.validity_period,
          coordinator: formData.coordinator,
          vice_coordinator: formData.vice_coordinator || null
        }])

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Projeto adicionado com sucesso!"
      })
      
      setShowAddDialog(false)
      setFormData({
        title: '',
        funding_agency: '',
        validity_period: '',
        coordinator: '',
        vice_coordinator: ''
      })
      onProjectsUpdate()
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error)
      toast({
        title: "Erro",
        description: "Erro ao adicionar projeto",
        variant: "destructive"
      })
    }
  }

  const handleUpdateProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('research_projects')
        .update({
          title: formData.title,
          funding_agency: formData.funding_agency,
          validity_period: formData.validity_period,
          coordinator: formData.coordinator,
          vice_coordinator: formData.vice_coordinator || null
        })
        .eq('id', projectId)

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Projeto atualizado com sucesso!"
      })
      
      setEditingProject(null)
      onProjectsUpdate()
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar projeto",
        variant: "destructive"
      })
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('research_projects')
        .delete()
        .eq('id', projectId)

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Projeto removido com sucesso!"
      })
      
      setShowDeleteDialog(null)
      onProjectsUpdate()
    } catch (error) {
      console.error('Erro ao remover projeto:', error)
      toast({
        title: "Erro",
        description: "Erro ao remover projeto",
        variant: "destructive"
      })
    }
  }

  const startEditing = (project: ResearchProject) => {
    setEditingProject(project.id)
    setFormData({
      title: project.title,
      funding_agency: project.funding_agency,
      validity_period: project.validity_period,
      coordinator: project.coordinator,
      vice_coordinator: project.vice_coordinator || ''
    })
  }

  const cancelEditing = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      funding_agency: '',
      validity_period: '',
      coordinator: '',
      vice_coordinator: ''
    })
  }

  return (
    <div className="space-y-4">
      {/* Add Project Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gerenciar Projetos de Pesquisa</h2>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Projeto
        </Button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">
                {editingProject === project.id ? (
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Título do projeto"
                    className="font-semibold"
                  />
                ) : (
                  project.title
                )}
              </CardTitle>
              <div className="flex gap-2">
                {editingProject === project.id ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateProject(project.id)}
                      className="w-8 h-8 p-0"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelEditing}
                      className="w-8 h-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditing(project)}
                      className="w-8 h-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setShowDeleteDialog(project.id)}
                      className="w-8 h-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Agência Financiadora:</label>
                {editingProject === project.id ? (
                  <Input
                    value={formData.funding_agency}
                    onChange={(e) => setFormData({ ...formData, funding_agency: e.target.value })}
                    placeholder="Agência financiadora"
                  />
                ) : (
                  <p className="text-sm">{project.funding_agency}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Vigência:</label>
                {editingProject === project.id ? (
                  <Input
                    value={formData.validity_period}
                    onChange={(e) => setFormData({ ...formData, validity_period: e.target.value })}
                    placeholder="Ex: 2024-2026"
                  />
                ) : (
                  <Badge variant="secondary">{project.validity_period}</Badge>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Coordenador:</label>
                {editingProject === project.id ? (
                  <Input
                    value={formData.coordinator}
                    onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
                    placeholder="Nome do coordenador"
                  />
                ) : (
                  <p className="text-sm">{project.coordinator}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Vice-coordenador:</label>
                {editingProject === project.id ? (
                  <Input
                    value={formData.vice_coordinator}
                    onChange={(e) => setFormData({ ...formData, vice_coordinator: e.target.value })}
                    placeholder="Nome do vice-coordenador (opcional)"
                  />
                ) : (
                  <p className="text-sm">{project.vice_coordinator || 'Não informado'}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Project Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Projeto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Título do projeto"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input
              placeholder="Agência financiadora"
              value={formData.funding_agency}
              onChange={(e) => setFormData({ ...formData, funding_agency: e.target.value })}
            />
            <Input
              placeholder="Vigência (ex: 2024-2026)"
              value={formData.validity_period}
              onChange={(e) => setFormData({ ...formData, validity_period: e.target.value })}
            />
            <Input
              placeholder="Coordenador"
              value={formData.coordinator}
              onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
            />
            <Input
              placeholder="Vice-coordenador (opcional)"
              value={formData.vice_coordinator}
              onChange={(e) => setFormData({ ...formData, vice_coordinator: e.target.value })}
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleAddProject} className="flex-1">
                Adicionar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja remover este projeto? Esta ação não pode ser desfeita.</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(null)} className="flex-1">
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => showDeleteDialog && handleDeleteProject(showDeleteDialog)}
              className="flex-1"
            >
              Remover
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}