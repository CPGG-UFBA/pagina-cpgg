import { useState, useEffect } from 'react'
import styles from './Photos.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { supabase } from '../../integrations/supabase/client'
import earth from '../../assets/earth-regulations.jpg'

interface Event {
  id: string
  name: string
  event_date: string
  created_at: string
}

export function Photos() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false })

      if (error) throw error

      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  return (
      <>
      <Header/>
          <div className={styles.photos}>
              <h1 className={styles.title}>Fotos de eventos </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="Photos/HistoricalPhotos">
                      <div className={styles.historical}>
                          <h2>Históricas</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="Photos/Years">
                      <div className={styles.fifthy}>
                          <h2> 50 anos - Pós-Graduação em Geofísica</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="Photos/FirstMeeting">
                      <div className={styles.reopen}>
                          <h2> Primeira reunião geral- retorno das atividades do CPGG</h2>
                      </div>
                  </a>

                  {/* Dynamic event cards */}
                  {events.map((event) => (
                    <a key={event.id} className={styles.card} href={`Photos/Event/${event.id}`}>
                      <div className={styles.eventCard}>
                        <h2>{event.name}</h2>
                        <p>Evento realizado em {new Date(event.event_date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </a>
                  ))}

                  <div className={styles.staticFigure}>
                    <img src={earth} alt='Figura da Terra - página Fotos, CPGG' />
                 </div>
              </div>
          </div>
          <div className={styles.photosFooter}>
            <Footer/>
          </div>
      </>
  )
}