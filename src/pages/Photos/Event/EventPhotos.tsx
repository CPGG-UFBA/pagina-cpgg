import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
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
        <ul>{event.name}</ul>
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
      <Footer />
    </>
  )
}