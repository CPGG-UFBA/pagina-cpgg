import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
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

  const cardStyle = {
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'white',
    textAlign: 'center' as const,
    width: '350px',
    minHeight: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
    textDecoration: 'none',
    marginBottom: '2rem'
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Header/>
      <main className="photos" style={{flex: 1, padding: '2rem', paddingTop: '155px', overflowY: 'auto'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '2rem'}}>
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

        <div style={{display: 'flex', gap: '3rem', justifyContent: 'center', alignItems: 'flex-start', width: '100%', maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem', flexWrap: 'wrap'}}>
          <div style={{display: 'grid', gridTemplateColumns: '350px 350px', gap: '2rem', flexShrink: 0}}>
            <Link to="/Photos/HistoricalPhotos" style={{...cardStyle, background: 'linear-gradient(90deg, rgba(2,0,36,0.85) 0%, rgba(63,9,121,0.85)), url(/src/components/Figures/sky.jpg) center/cover'}}>
              <h2>Históricas</h2>
            </Link>

            <Link to="/Photos/Years" style={{...cardStyle, background: 'linear-gradient(135deg, rgba(2,0,36,0.85), rgba(9,94,121,0.85)), url(/src/components/Figures/congrats.png) center/cover'}}>
              <h2>50 anos - Pós-Graduação em Geofísica</h2>
            </Link>

            <Link to="/Photos/FirstMeeting" style={{...cardStyle, background: 'linear-gradient(135deg, rgba(2,0,36,0.85), rgba(9,94,121,0.85)), url(/src/components/Figures/meeting.jpg) center/cover'}}>
              <h2>Primeira reunião geral- retorno das atividades do CPGG</h2>
            </Link>

            {events.map((event) => (
              <Link 
                key={event.id} 
                to={`/Photos/Event/${event.id}`} 
                style={{...cardStyle, background: 'linear-gradient(135deg, rgba(2,0,36,0.85), rgba(63,9,121,0.85)), url(/src/assets/earth-regulations.jpg) center/cover'}}
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
