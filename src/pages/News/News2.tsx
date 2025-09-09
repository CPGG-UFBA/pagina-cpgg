import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { supabase } from '@/integrations/supabase/client'
import styles from './News.module.css'

interface NewsArticle {
  id: string
  title: string
  content: string
  photo1_url: string | null
  photo2_url: string | null
  photo3_url: string | null
  cover_photo_number: number
}

export function News2() {
  const [news, setNews] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('news_position', 'News2')
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setNews(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loading}>Carregando notícia...</div>
        <Footer />
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          <div className={styles.error}>
            <h1 className={styles.errorTitle}>Notícia não encontrada</h1>
            <p className={styles.errorMessage}>
              Esta notícia ainda não foi publicada ou ocorreu um erro ao carregá-la.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const photos = [news.photo1_url, news.photo2_url, news.photo3_url].filter(Boolean)

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h1 className={styles.title}>{news.title}</h1>
            <div className={styles.text}>{news.content}</div>
          </div>
          
          {photos.length > 0 && (
            <div className={styles.sidebar}>
              {photos.map((photo, index) => (
                <div key={index} className={styles.photoContainer}>
                  <img 
                    src={photo!} 
                    alt={`Foto ${index + 1} da notícia`} 
                    className={styles.photo}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}