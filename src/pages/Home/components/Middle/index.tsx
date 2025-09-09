import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import styles from './middle.module.css'
import earth from '../../../../assets/earth-photos.jpg'

interface NewsArticle {
  id: string
  title: string
  content: string
  photo1_url: string | null
  photo2_url: string | null
  photo3_url: string | null
  cover_photo_number: number
  news_position: string
}

export function Middle() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .in('news_position', ['News1', 'News2', 'News3'])
        .order('news_position')

      if (error) throw error

      setNewsArticles(data || [])
    } catch (error) {
      console.error('Erro ao carregar notícias:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCoverImageUrl = (article: NewsArticle) => {
    switch (article.cover_photo_number) {
      case 2:
        return article.photo2_url
      case 3:
        return article.photo3_url
      default:
        return article.photo1_url
    }
  }

  const getNewsRoute = (position: string) => {
    switch (position) {
      case 'News1':
        return '/News/News1'
      case 'News2':
        return '/News/News2'
      case 'News3':
        return '/News/News3'
      default:
        return '/News/News1'
    }
  }

  // Fallback images for default behavior
  const fallbackImages = [
    '../../../../components/Figures/news1.png',
    '../../../../components/Figures/news2.png',
    '../../../../components/Figures/news3.png'
  ]

  return (
    <main className={styles.middle}>
      <ul> Clique sobre a notícia para mais detalhes</ul>
      <div className={styles.News}>
        <div className={styles.NewsTrack}>
          {!loading && newsArticles.map((article, index) => {
            const coverImage = getCoverImageUrl(article)
            const route = getNewsRoute(article.news_position)
            
            return (
              <div key={article.id} className={styles.slide}>
                <a href={route}>
                  <img 
                    src={coverImage || fallbackImages[index]} 
                    alt={article.title || `Notícia ${index + 1}`}
                  />
                </a> 
              </div>
            )
          })}

          {/* Duplicate slides for infinite scroll effect */}
          {!loading && newsArticles.map((article, index) => {
            const coverImage = getCoverImageUrl(article)
            const route = getNewsRoute(article.news_position)
            
            return (
              <div key={`duplicate-${article.id}`} className={styles.slide}>
                <a href={route}>
                  <img 
                    src={coverImage || fallbackImages[index]} 
                    alt={article.title || `Notícia ${index + 1}`}
                  />
                </a> 
              </div>
            )
          })}

          {/* Show default slides if no news articles are found */}
          {!loading && newsArticles.length === 0 && (
            <>
              <div className={styles.slide}>
                <a href='/News/News1'>
                  <img src={fallbackImages[0]} alt="Notícia 1" />
                </a> 
              </div>
              <div className={styles.slide}>
                <a href='/News/News2'>
                  <img src={fallbackImages[1]} alt="Notícia 2" />
                </a> 
              </div>
              <div className={styles.slide}>
                <a href='/News/News3'>
                  <img src={fallbackImages[2]} alt="Notícia 3" />
                </a> 
              </div>
              <div className={styles.slide}>
                <a href='/News/News1'>
                  <img src={fallbackImages[0]} alt="Notícia 1" />
                </a> 
              </div>
              <div className={styles.slide}>
                <a href='/News/News2'>
                  <img src={fallbackImages[1]} alt="Notícia 2" />
                </a> 
              </div>
              <div className={styles.slide}>
                <a href='/News/News3'>
                  <img src={fallbackImages[2]} alt="Notícia 3" />
                </a> 
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.static}>
        <strong>Earth</strong>
        <h1>is our Goal</h1>
        <div className={styles.enjoy}>
          <h1>Enjoy our best solutions for </h1>
          <strong>scientific</strong>
          <h1>and trade proposals</h1>
        </div>
      </div>

      <div className={styles.staticFigure}>
        <img src={earth} alt='Terra' />
      </div>
    </main>
  )
}