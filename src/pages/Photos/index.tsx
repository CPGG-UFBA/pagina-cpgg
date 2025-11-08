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
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Header/>
      <main style={{flex: 1, padding: '2rem', paddingTop: '155px', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div className={styles.titleContainer} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '2rem', transform: 'translateX(-200px)'}}>
          <h1 style={{margin: 0, fontSize: '28px', fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
            Fotos de eventos
          </h1>
          {showAdminButton && (
            <Button
              onClick={() => navigate('/Photos/EventManager')}
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Gerenciar Eventos
            </Button>
          )}
        </div>

        <div className={styles.mainContent} style={{
          display: 'flex', 
          gap: '3rem', 
          justifyContent: 'center', 
          alignItems: 'flex-start', 
          width: '100%', 
          maxWidth: '1400px', 
          margin: '0 auto', 
          paddingBottom: '2rem', 
          flexWrap: 'wrap',
          transform: 'translateX(-200px)'
        }}>
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 350px))', 
            gap: '2rem', 
            justifyContent: 'center',
            width: '100%',
            maxWidth: '750px'
          }}>
            <Link 
              to="/Photos/HistoricalPhotos" 
              className={styles.historical} 
              style={{textDecoration: 'none'}}
            >
              <h2>Históricas</h2>
            </Link>

            <Link 
              to="/Photos/Years" 
              className={styles.fifthy} 
              style={{textDecoration: 'none'}}
            >
              <h2>50 anos - Pós-Graduação em Geofísica</h2>
            </Link>

            <Link 
              to="/Photos/FirstMeeting" 
              className={styles.reopen} 
              style={{textDecoration: 'none'}}
            >
              <h2>Primeira reunião geral- retorno das atividades do CPGG</h2>
            </Link>

            {events.map((event) => (
              <Link 
                key={event.id} 
                to={`/Photos/Event/${event.id}`} 
                className={styles.eventCard}
                style={{textDecoration: 'none'}}
              >
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
