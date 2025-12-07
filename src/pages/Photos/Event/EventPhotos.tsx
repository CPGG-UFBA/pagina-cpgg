import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { AdminLoginEventPhotos } from './components/AdminLoginEventPhotos'
import { EventPhotoEditor } from './components/EventPhotoEditor'
import { Edit3 } from 'lucide-react'
import { BackButtonPhotos } from '@/components/BackButtonPhotos'
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
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (id) {
      fetchEventData()
    }
    // Check for persisted authentication
    const savedAuth = localStorage.getItem('eventPhotosAuth')
    if (savedAuth === 'true') {
      console.log('Found persisted authentication, setting isAuthenticated to true')
      setIsAuthenticated(true)
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
    console.log('Login successful, setting isAuthenticated to true')
    setIsAuthenticated(true)
    setShowLoginDialog(false)
    // Persist authentication in localStorage
    localStorage.setItem('eventPhotosAuth', 'true')
  }

  const handleEditClick = () => {
    console.log('Edit button clicked, isAuthenticated:', isAuthenticated)
    if (isAuthenticated) {
      console.log('User is authenticated, showing editor')
      setShowEditor(true)
    } else {
      console.log('User not authenticated, showing login dialog')
      setShowLoginDialog(true)
    }
  }

  const handlePhotosChange = (updatedPhotos: EventPhoto[]) => {
    setPhotos(updatedPhotos)
  }

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div style={{ padding: '150px 20px', textAlign: 'center' }}>
          Carregando...
        </div>
        <Footer />
      </div>
    )
  }

  if (!event) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div style={{ padding: '150px 20px', textAlign: 'center' }}>
          Evento não encontrado
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.Years}>
        <BackButtonPhotos />
        <ul>{event.name}</ul>
        <div 
          className="absolute top-4 right-4 z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button
            onClick={handleEditClick}
            size="sm"
            variant="secondary"
            className="w-10 h-10 p-0 bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90 shadow-md"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg border">
              Editar Fotos
            </div>
          )}
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
    </div>
  )
}