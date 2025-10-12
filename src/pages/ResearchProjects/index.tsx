import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BookOpen, Building, Calendar, Users } from 'lucide-react'
import { Header } from '../../components/Header/'
import { Footer } from '../../components/Footer/'
import { AdminLoginProjects } from './components/AdminLoginProjects'
import { EditButtonProjects } from './components/EditButtonProjects'
import { ResearchProjectEditor } from './components/ResearchProjectEditor'
import { useToast } from '@/hooks/use-toast'
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
    // Check if user is already authenticated
    const savedAuth = localStorage.getItem('researchProjectsAuth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
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

  const handleLogin = async (email: string, password: string) => {
    setLoginLoading(true)
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .in('role', ['secretaria', 'coordenacao'])
        .single()

      if (error || !data) {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos, ou usuário sem permissão.",
          variant: "destructive"
        })
        return
      }

      setIsAuthenticated(true)
      setShowLoginDialog(false)
      localStorage.setItem('researchProjectsAuth', 'true')
      toast({
        title: "Login realizado com sucesso",
        description: "Agora você pode gerenciar os projetos de pesquisa."
      })
    } catch (error) {
      console.error('Erro no login:', error)
      toast({
        title: "Erro",
        description: "Erro interno do servidor.",
        variant: "destructive"
      })
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('researchProjectsAuth')
    toast({
      title: "Logout realizado",
      description: "Você saiu do modo de edição."
    })
  }

  if (isLoading) {
    return <div className={styles.loading}>Carregando projetos...</div>
  }

  return (
    <div className={styles.Container}>
      <Header />
      <div className={`${styles.container} research-projects-page`}>
        <div className={styles.header}>
          <BookOpen size={32} />
          <h1>Projetos de Pesquisa que dão suporte ao CPGG</h1>
          <p>Conheça os principais projetos de pesquisa que dão suporte ao nosso centro</p>
        </div>

        {isAuthenticated ? (
          <ResearchProjectEditor 
            projects={projects} 
            onProjectsUpdate={fetchProjects}
          />
        ) : (
          <>
            {projects.length === 0 ? (
              <div className={styles.emptyState}>
                <BookOpen size={48} />
                <p>Nenhum projeto de pesquisa cadastrado ainda.</p>
              </div>
            ) : (
              <ScrollArea className={styles.scrollArea}>
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
              </ScrollArea>
            )}
          </>
        )}

        <EditButtonProjects
          onClick={() => setShowLoginDialog(true)}
          isEditMode={isAuthenticated}
          onLogout={handleLogout}
        />

        <AdminLoginProjects
          isOpen={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          onLogin={handleLogin}
          isLoading={loginLoading}
        />
      </div>
      <Footer />
    </div>
  )
}