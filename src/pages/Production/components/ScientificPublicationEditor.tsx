import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash, Edit, Save, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface ScientificPublication {
  id: string
  authors: string
  year: string
  journal_name: string
  article_title: string
  pages: string
  volume: string
  created_at: string
}

interface ScientificPublicationEditorProps {
  publications: ScientificPublication[]
  onPublicationsUpdate: () => void
}

export function ScientificPublicationEditor({ publications, onPublicationsUpdate }: ScientificPublicationEditorProps) {
  const [editingPublication, setEditingPublication] = useState<string | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    authors: '',
    year: '',
    journal_name: '',
    article_title: '',
    pages: '',
    volume: ''
  })

  const handleAddPublication = async () => {
    if (!formData.authors || !formData.year || !formData.journal_name || 
        !formData.article_title || !formData.pages || !formData.volume) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('scientific_publications')
        .insert([formData])

      if (error) throw error

      toast({
        title: "Publicação adicionada",
        description: "A publicação foi adicionada com sucesso."
      })

      setShowAddDialog(false)
      setFormData({
        authors: '',
        year: '',
        journal_name: '',
        article_title: '',
        pages: '',
        volume: ''
      })
      onPublicationsUpdate()
    } catch (error) {
      console.error('Erro ao adicionar publicação:', error)
      toast({
        title: "Erro",
        description: "Erro ao adicionar publicação.",
        variant: "destructive"
      })
    }
  }

  const handleUpdatePublication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scientific_publications')
        .update(formData)
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Publicação atualizada",
        description: "A publicação foi atualizada com sucesso."
      })

      setEditingPublication(null)
      setFormData({
        authors: '',
        year: '',
        journal_name: '',
        article_title: '',
        pages: '',
        volume: ''
      })
      onPublicationsUpdate()
    } catch (error) {
      console.error('Erro ao atualizar publicação:', error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar publicação.",
        variant: "destructive"
      })
    }
  }

  const handleDeletePublication = async () => {
    if (!deletingId) return

    try {
      const { error } = await supabase
        .from('scientific_publications')
        .delete()
        .eq('id', deletingId)

      if (error) throw error

      toast({
        title: "Publicação excluída",
        description: "A publicação foi excluída com sucesso."
      })

      setShowDeleteDialog(false)
      setDeletingId(null)
      onPublicationsUpdate()
    } catch (error) {
      console.error('Erro ao excluir publicação:', error)
      toast({
        title: "Erro",
        description: "Erro ao excluir publicação.",
        variant: "destructive"
      })
    }
  }

  const startEditing = (publication: ScientificPublication) => {
    setEditingPublication(publication.id)
    setFormData({
      authors: publication.authors,
      year: publication.year,
      journal_name: publication.journal_name,
      article_title: publication.article_title,
      pages: publication.pages,
      volume: publication.volume
    })
  }

  const cancelEditing = () => {
    setEditingPublication(null)
    setFormData({
      authors: '',
      year: '',
      journal_name: '',
      article_title: '',
      pages: '',
      volume: ''
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gerenciar Publicações</h2>
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus size={16} />
          Adicionar Publicação
        </Button>
      </div>

      <div className="space-y-4">
        {publications.map((publication) => (
          <Card key={publication.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {editingPublication === publication.id ? (
                  <Input
                    value={formData.article_title}
                    onChange={(e) => setFormData({ ...formData, article_title: e.target.value })}
                    placeholder="Título do artigo"
                  />
                ) : (
                  publication.article_title
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {editingPublication === publication.id ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Autores:</label>
                    <Input
                      value={formData.authors}
                      onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                      placeholder="Nome dos autores"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ano:</label>
                      <Input
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="Ano"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Volume:</label>
                      <Input
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        placeholder="Volume"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Periódico:</label>
                    <Input
                      value={formData.journal_name}
                      onChange={(e) => setFormData({ ...formData, journal_name: e.target.value })}
                      placeholder="Nome do periódico"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Páginas:</label>
                    <Input
                      value={formData.pages}
                      onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                      placeholder="Páginas"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={cancelEditing}>
                      <X size={16} className="mr-1" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={() => handleUpdatePublication(publication.id)}>
                      <Save size={16} className="mr-1" />
                      Salvar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm">
                    {publication.authors} ({publication.year}) - {publication.article_title}. {publication.journal_name}, volume {publication.volume}, página {publication.pages}.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => startEditing(publication)}>
                      <Edit size={16} className="mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setDeletingId(publication.id)
                        setShowDeleteDialog(true)
                      }}
                    >
                      <Trash size={16} className="mr-1" />
                      Excluir
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Publicação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome dos autores:</label>
              <Input
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                placeholder="Ex: PORSANI, M.J.; MELO, P.E.M.; ULRYCH, T.J."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ano:</label>
                <Input
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="Ex: 2003"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Volume:</label>
                <Input
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  placeholder="Ex: 12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Título do periódico:</label>
              <Input
                value={formData.journal_name}
                onChange={(e) => setFormData({ ...formData, journal_name: e.target.value })}
                placeholder="Ex: Journal of Seismic Exploration"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do artigo:</label>
              <Input
                value={formData.article_title}
                onChange={(e) => setFormData({ ...formData, article_title: e.target.value })}
                placeholder="Ex: Highly resolved deconvoluton via a sparsity norm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Páginas:</label>
              <Input
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                placeholder="Ex: 127-140"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddPublication}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir esta publicação?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeletePublication}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
