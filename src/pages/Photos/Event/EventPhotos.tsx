import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { supabase } from '../../../integrations/supabase/client'
import styles from '../Photos.module.css'

interface Event {
  id: string
  name: string
  event_date: string
}

interface EventPhoto {
  id: string
  photo_url: string
  photo_order: number
}

export function EventPhotos() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [photos, setPhotos] = useState<EventPhoto[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.photos}>
          <div className={styles.container}>
            <p>Carregando...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Header />
        <div className={styles.photos}>
          <div className={styles.container}>
            <h1>Evento não encontrado</h1>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.photos}>
        <div className={styles.container}>
          <h1 className={styles.title}>{event.name}</h1>
          <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
            Evento realizado em {new Date(event.event_date).toLocaleDateString('pt-BR')}
          </p>
          
          <div className={styles.photoGrid}>
            {photos.map((photo) => (
              <div key={photo.id} className={styles.photoItem}>
                <img 
                  src={photo.photo_url} 
                  alt={`Foto do evento ${event.name}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}