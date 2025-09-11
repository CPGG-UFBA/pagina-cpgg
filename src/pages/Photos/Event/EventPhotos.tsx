import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { AdminLoginEventPhotos } from './components/AdminLoginEventPhotos'
import { EventPhotoEditor } from './components/EventPhotoEditor'
import { Edit } from 'lucide-react'
import styles from './EventPhotos.module.css'

interface EventPhoto {
  id: string
  photo_url: string
  photo_order: number
}

interface Event {
  id: string
  name: string
  event_date: string
}

export function EventPhotos() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [photos, setPhotos] = useState<EventPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    if (id) {
      fetchEventData()
    }
  }, [id])

  const fetchEventData = async () => {
    try {
      // Fetch event details
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

      if (eventError) throw eventError

      // Fetch event photos
      const { data: photosData, error: photosError } = await supabase
        .from('event_photos')
        .select('*')
        .eq('event_id', id)
        .order('photo_order')

      if (photosError) throw photosError

      setEvent(eventData)
      setPhotos(photosData || [])
    } catch (error) {
      console.error('Error fetching event data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setShowLoginDialog(false)
  }

  const handleEditClick = () => {
    if (isAuthenticated) {
      setShowEditor(true)
    } else {
      setShowLoginDialog(true)
    }
  }

  const handlePhotosChange = (updatedPhotos: EventPhoto[]) => {
    setPhotos(updatedPhotos)
  }

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: '150px 20px', textAlign: 'center' }}>
          Carregando...
        </div>
        <Footer />
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Header />
        <div style={{ padding: '150px 20px', textAlign: 'center' }}>
          Evento não encontrado
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.Years}>
        <div className={styles.yearHeader}>
          <ul>{event.name}</ul>
          <Button
            onClick={handleEditClick}
            variant="outline"
            size="sm"
            className={`${styles.editButton} flex items-center gap-2`}
          >
            <Edit size={16} />
            Editar Fotos
          </Button>
        </div>
        <div className={styles.box}>
          <div className={styles.gallery}>
            {photos.map((photo, index) => (
              <img 
                key={photo.id}
                src={photo.photo_url} 
                alt={`Foto ${index + 1} do evento ${event.name}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <AdminLoginEventPhotos
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
      
      {showEditor && id && (
        <EventPhotoEditor
          eventId={id}
          photos={photos}
          onPhotosChange={handlePhotosChange}
          onClose={() => setShowEditor(false)}
        />
      )}
      
      <Footer />
    </>
  )
}