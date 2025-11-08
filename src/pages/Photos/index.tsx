import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import styles from './Photos.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { supabase } from '../../integrations/supabase/client'

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
    // Check if user has admin access
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
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Fotos de eventos</h1>
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

            <div className={styles.mainContent} style={{display: 'flex', gap: '3rem'}}>
              <div className={styles.container} style={{display: 'grid', gridTemplateColumns: '350px 350px', gap: '2rem'}}>
                  <Link className={styles.card} to="/Photos/HistoricalPhotos" style={{display: 'block', textDecoration: 'none'}}>
                      <div className={styles.historical} style={{minHeight: '120px', width: '350px', display: 'flex'}}>
                          <h2>Históricas</h2>
                      </div>
                  </Link>

                  <Link className={styles.card} to="/Photos/Years" style={{display: 'block', textDecoration: 'none'}}>
                      <div className={styles.fifthy} style={{minHeight: '120px', width: '350px', display: 'flex'}}>
                          <h2> 50 anos - Pós-Graduação em Geofísica</h2>
                      </div>
                  </Link>
                  <Link className={styles.card} to="/Photos/FirstMeeting" style={{display: 'block', textDecoration: 'none'}}>
                      <div className={styles.reopen} style={{minHeight: '120px', width: '350px', display: 'flex'}}>
                          <h2> Primeira reunião geral- retorno das atividades do CPGG</h2>
                      </div>
                  </Link>

                  {/* Dynamic event cards */}
                  {events.map((event) => {
                    console.log('Rendering event card:', event.name)
                    return (
                      <Link key={event.id} className={styles.card} to={`/Photos/Event/${event.id}`} style={{display: 'block', textDecoration: 'none'}}>
                        <div className={styles.eventCard} style={{minHeight: '120px', width: '350px', display: 'flex'}}>
                          <h2>{event.name}</h2>
                          <p>Evento realizado em {new Date(event.event_date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </Link>
                    )
                  })}
              </div>

              <div className={styles.staticFigure}>
                <img src="/src/components/Figures/earth3.png" alt="Terra" />
              </div>
            </div>
        </main>
        <Footer/>
      </div>
  )
}