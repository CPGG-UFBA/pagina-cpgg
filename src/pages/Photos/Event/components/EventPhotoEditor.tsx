import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { Trash2, Plus, GripVertical } from 'lucide-react'

interface EventPhoto {
  id: string
  photo_url: string
  photo_order: number
}

interface EventPhotoEditorProps {
  eventId: string
  photos: EventPhoto[]
  onPhotosChange: (photos: EventPhoto[]) => void
  onClose: () => void
}

export function EventPhotoEditor({ eventId, photos, onPhotosChange, onClose }: EventPhotoEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === dropIndex) return

    const newPhotos = [...photos]
    const draggedPhoto = newPhotos[draggedIndex]
    newPhotos.splice(draggedIndex, 1)
    newPhotos.splice(dropIndex, 0, draggedPhoto)

    // Update photo_order for all photos
    const updatedPhotos = newPhotos.map((photo, index) => ({
      ...photo,
      photo_order: index + 1
    }))

    try {
      // Update order in database
      const updates = updatedPhotos.map(photo => 
        supabase
          .from('event_photos')
          .update({ photo_order: photo.photo_order })
          .eq('id', photo.id)
      )

      await Promise.all(updates)
      onPhotosChange(updatedPhotos)
      toast({
        title: "Sucesso!",
        description: "Ordem das fotos atualizada.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reordenar fotos.",
        variant: "destructive",
      })
    }

    setDraggedIndex(null)
  }

  const handleDeletePhoto = async (photoId: string, photoUrl: string) => {
    try {
      // Extract file path from URL for storage deletion
      const urlParts = photoUrl.split('/')
      const fileName = urlParts[urlParts.length - 1]
      
      // Delete from storage
      await supabase.storage
        .from('event-photos')
        .remove([fileName])

      // Delete from database
      await supabase
        .from('event_photos')
        .delete()
        .eq('id', photoId)

      const updatedPhotos = photos.filter(photo => photo.id !== photoId)
      onPhotosChange(updatedPhotos)
      
      toast({
        title: "Sucesso!",
        description: "Foto removida com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao remover foto.",
        variant: "destructive",
      })
    }
  }

  const handleAddPhoto = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const fileName = `${eventId}_${Date.now()}_${file.name}`
      
      // Upload to storage
      const { error: storageError } = await supabase.storage
        .from('event-photos')
        .upload(fileName, file)

      if (storageError) throw storageError

      // Get public URL
      const { data } = supabase.storage
        .from('event-photos')
        .getPublicUrl(fileName)

      // Insert into database
      const newPhotoOrder = Math.max(...photos.map(p => p.photo_order), 0) + 1
      
      const { data: newPhoto, error: dbError } = await supabase
        .from('event_photos')
        .insert([{
          event_id: eventId,
          photo_url: data.publicUrl,
          photo_order: newPhotoOrder
        }])
        .select()
        .single()

      if (dbError) throw dbError

      onPhotosChange([...photos, newPhoto])
      
      toast({
        title: "Sucesso!",
        description: "Foto adicionada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar foto.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Editar Fotos do Evento</h2>
            <div className="flex items-center gap-2">
              <Button onClick={handleAddPhoto} disabled={isUploading}>
                <Plus className="w-4 h-4 mr-2" />
                {isUploading ? 'Enviando...' : 'Adicionar Foto'}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="relative group border rounded-lg overflow-hidden cursor-move hover:shadow-lg transition-shadow"
              >
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-1 rounded z-10">
                  <GripVertical size={16} />
                </div>
                <img
                  src={photo.photo_url}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeletePhoto(photo.id, photo.photo_url)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <div className="p-2 text-sm text-gray-600 text-center">
                  Posição: {photo.photo_order}
                </div>
              </div>
            ))}
            
            {/* Add new photo button */}
            <div
              onClick={handleAddPhoto}
              className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              <div className="text-center">
                <Plus size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">
                  {isUploading ? 'Enviando...' : 'Adicionar Foto'}
                </p>
              </div>
            </div>
          </div>
          
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  )
}