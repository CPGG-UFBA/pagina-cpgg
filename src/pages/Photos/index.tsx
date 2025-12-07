import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { supabase } from '../../integrations/supabase/client'
import styles from './Photos.module.css'

interface Event {
  id: string
  name: string
  event_date: string
  created_at: string
}

export function Photos() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<Event[]>([])
  const [showAdminButton, setShowAdminButton] = useState(false)

  useEffect(() => {
    fetchEvents()
    console.log('Photos component mounted')
    const savedAuth = localStorage.getItem('eventManagerAuth') || localStorage.getItem('eventPhotosAuth')
    if (savedAuth === 'true') {
      setShowAdminButton(true)
    }
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false })

      if (error) throw error

      console.log('Events fetched:', data)
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  return (
    <div className={styles.pageContainer}>
      <Header/>
      <main className={`${styles.photos} photos`}>
        <h1 className={styles.title}>Fotos de eventos</h1>
        
        <div className={styles.mainContent}>
          <div className={styles.buttonsGrid}>
            <Link to="/Photos/HistoricalPhotos" className={styles.historical}>
              <h2>Históricas</h2>
            </Link>

            <Link to="/Photos/Years" className={styles.fifthy}>
              <h2>50 anos - Pós-Graduação em Geofísica</h2>
            </Link>

            <Link to="/Photos/FirstMeeting" className={styles.reopen}>
              <h2>Primeira reunião geral- retorno das atividades do CPGG</h2>
            </Link>

            {events.map((event) => (
              <Link key={event.id} to={`/Photos/Event/${event.id}`} className={styles.eventCard}>
                <div>
                  <h2>{event.name}</h2>
                  <p>Evento realizado em {new Date(event.event_date).toLocaleDateString('pt-BR')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
