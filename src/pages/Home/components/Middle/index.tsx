import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import styles from './middle.module.css'

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

  const fallbackImages = [
    '../../../../components/Figures/news1.png',
    '../../../../components/Figures/news2.png',
    '../../../../components/Figures/news3.png'
  ]

  if (loading) {
    return (
      <main className={styles.middle}>
        <div className={styles.loading}>Carregando notícias...</div>
      </main>
    )
  }

  return (
    <main className={styles.middle}>
      <div className={styles.carouselContainer}>
        {newsArticles.map((article, index) => (
          <a 
            key={article.id} 
            href={getNewsRoute(article.news_position)} 
            className={styles.newsLink}
          >
            <div className={styles.newsCard}>
              <div className={styles.imageWrapper}>
                <img 
                  src={getCoverImageUrl(article) || fallbackImages[index % 3]} 
                  alt={article.title}
                  className={styles.newsImage}
                />
              </div>
              <div className={styles.newsContent}>
                <h2 className={styles.newsTitle}>{article.title}</h2>
                <p className={styles.newsDescription}>
                  {article.content.substring(0, 150)}...
                </p>
              </div>
            </div>
          </a>
        ))}
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
    </main>
  )
}
