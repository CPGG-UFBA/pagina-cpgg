import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Building, Calendar, Users } from 'lucide-react'
import { Header } from '../../components/Header/'
import { Footer } from '../../components/Footer/'
import styles from './ResearchProjects.module.css'

interface ResearchProject {
  id: string
  title: string
  funding_agency: string
  validity_period: string
  coordinator: string
  vice_coordinator: string | null
  created_at: string
}

export function ResearchProjects() {
  const [projects, setProjects] = useState<ResearchProject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('research_projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProjects(data || [])
    } catch (error) {
      console.error('Erro ao buscar projetos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className={styles.loading}>Carregando projetos...</div>
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <BookOpen size={32} />
          <h1>Projetos de Pesquisa que dão suporte ao CPGG</h1>
          <p>Conheça os principais projetos de pesquisa desenvolvidos pelo nosso centro</p>
        </div>

        {projects.length === 0 ? (
          <div className={styles.emptyState}>
            <BookOpen size={48} />
            <p>Nenhum projeto de pesquisa cadastrado ainda.</p>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <Card key={project.id} className={styles.projectCard}>
                <CardHeader>
                  <CardTitle className={styles.projectTitle}>
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className={styles.projectContent}>
                  <div className={styles.projectInfo}>
                    <div className={styles.infoItem}>
                      <Building size={16} />
                      <span className={styles.label}>Agência Financiadora:</span>
                      <span className={styles.value}>{project.funding_agency}</span>
                    </div>

                    <div className={styles.infoItem}>
                      <Calendar size={16} />
                      <span className={styles.label}>Vigência:</span>
                      <Badge variant="secondary" className={styles.validityBadge}>
                        {project.validity_period}
                      </Badge>
                    </div>

                    <div className={styles.infoItem}>
                      <Users size={16} />
                      <span className={styles.label}>Coordenador:</span>
                      <span className={styles.value}>{project.coordinator}</span>
                    </div>

                    {project.vice_coordinator && (
                      <div className={styles.infoItem}>
                        <Users size={16} />
                        <span className={styles.label}>Vice-coordenador:</span>
                        <span className={styles.value}>{project.vice_coordinator}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}