import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { PhotoDropZone } from '@/components/PhotoDropZone'
import { UserCheck, Settings, Users, FlaskConical, LogOut, Newspaper, FileText, BookOpen, UserMinus, Image } from 'lucide-react'
import logocpgg from '@/assets/cpgg-logo.jpg'
import styles from './dashboard.module.css'

interface AdminUser {
  id: string
  email: string
  role: string
}

export function CoordenacaoDashboard() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [secretariaEmail, setSecretariaEmail] = useState('')
  const [secretariaPassword, setSecretariaPassword] = useState('')
  const [tiEmail, setTiEmail] = useState('')
  const [tiPassword, setTiPassword] = useState('')
  
  // Estados para cadastro de pesquisador
  const [researcherName, setResearcherName] = useState('')
  const [researcherProgram, setResearcherProgram] = useState('')
  const [researcherEmail, setResearcherEmail] = useState('')
  const [researcherDescription, setResearcherDescription] = useState('')
  const [researcherLattes, setResearcherLattes] = useState('')
  
  // Estados para laboratórios
  const [labName, setLabName] = useState('')
  const [labAcronym, setLabAcronym] = useState('')
  const [labChief, setLabChief] = useState('')
  const [labDescription, setLabDescription] = useState('')
  const [labPnipe, setLabPnipe] = useState('')
  const [labPhoto1, setLabPhoto1] = useState<File | null>(null)
  const [labPhoto2, setLabPhoto2] = useState<File | null>(null)
  const [labPhoto3, setLabPhoto3] = useState<File | null>(null)
  
  // Estados para notícias
  const [newsTitle, setNewsTitle] = useState('')
  const [newsContent, setNewsContent] = useState('')
  const [newsPhoto1, setNewsPhoto1] = useState<File | null>(null)
  const [newsPhoto2, setNewsPhoto2] = useState<File | null>(null)
  const [newsPhoto3, setNewsPhoto3] = useState<File | null>(null)
  const [newsCoverPhoto, setNewsCoverPhoto] = useState<string>('1')
  const [newsPosition, setNewsPosition] = useState<string>('')

  // Estados para normas/regulamentos
  const [regulationName, setRegulationName] = useState('')
  const [regulationPdfUrl, setRegulationPdfUrl] = useState('')

  // Estados para projetos de pesquisa
  const [projectTitle, setProjectTitle] = useState('')
  const [fundingAgency, setFundingAgency] = useState('')
  const [validityPeriod, setValidityPeriod] = useState('')
  const [coordinator, setCoordinator] = useState('')
  const [viceCoordinator, setViceCoordinator] = useState('')
  
  // Estados para eventos
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventPhotos, setEventPhotos] = useState<File[]>([])
  
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  // Mapeamento dos programas
  const programMapping = {
    'oil': 'Exploração de Petróleo',
    'environment': 'Recursos Hidricos e Ambientais',
    'mineral': 'Petrologia, Metalogênese e Exp. Mineral',
    'oceanography': 'Oceanografia Física',
    'coast': 'Geologia Marinha e Costeira'
  }

  useEffect(() => {
    const userData = sessionStorage.getItem('admin_user')
    if (userData) {
      setAdminUser(JSON.parse(userData))
    } else {
      navigate('/adm/coordenacao')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_user')
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    })
    navigate('/adm')
  }

  const handleRegisterSecretaria = async () => {
    if (!secretariaEmail || !secretariaPassword) {
      toast({
        title: "Erro",
        description: "Email e senha são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('admin_users')
        .upsert({ 
          email: secretariaEmail, 
          password: secretariaPassword, 
          role: 'secretaria' 
        }, {
          onConflict: 'email'
        })

      if (error) throw error

      toast({
        title: "Sucesso!",
        description: "Usuário da secretária cadastrado com sucesso.",
      })
      setSecretariaEmail('')
      setSecretariaPassword('')
    } catch (error: any) {
      console.error('Erro ao cadastrar secretária:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao cadastrar secretária",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterTI = async () => {
    if (!tiEmail || !tiPassword) {
      toast({
        title: "Erro",
        description: "Email e senha são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('admin_users')
        .upsert({ 
          email: tiEmail, 
          password: tiPassword, 
          role: 'ti' 
        }, {
          onConflict: 'email'
        })

      if (error) throw error

      toast({
        title: "Sucesso!",
        description: "Usuário de TI cadastrado com sucesso.",
      })
      setTiEmail('')
      setTiPassword('')
    } catch (error: any) {
      console.error('Erro ao cadastrar técnico em TI:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao cadastrar técnico em TI",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterResearcher = async () => {
    if (!researcherName || !researcherProgram || !researcherEmail || !researcherDescription || !researcherLattes) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('researchers')
        .insert({
          name: researcherName,
          program: researcherProgram,
          email: researcherEmail,
          description: researcherDescription,
          lattes_link: researcherLattes,
        })

      if (error) throw error

      // Criar página pessoal do pesquisador
      await createResearcherPage(researcherName, researcherEmail, researcherDescription, researcherLattes)

      toast({
        title: "Sucesso",
        description: "Pesquisador cadastrado com sucesso!",
      })

      // Limpar formulário
      setResearcherName('')
      setResearcherProgram('')
      setResearcherEmail('')
      setResearcherDescription('')
      setResearcherLattes('')
    } catch (error: any) {
      console.error('Erro ao cadastrar pesquisador:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao cadastrar pesquisador",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterLaboratory = async () => {
    if (!labName || !labAcronym || !labChief || !labDescription || !labPnipe) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      let photo1_url = null
      let photo2_url = null
      let photo3_url = null

      // Upload das fotos se foram fornecidas
      if (labPhoto1 || labPhoto2 || labPhoto3) {
        setUploadingPhotos(true)
        
        if (labPhoto1) {
          const fileExt = labPhoto1.name.split('.').pop()
          const fileName = `${labAcronym.toLowerCase()}_photo_1_${Date.now()}.${fileExt}`
          
          const { error: uploadError } = await supabase.storage
            .from('laboratory-photos')
            .upload(fileName, labPhoto1)

          if (uploadError) throw uploadError

          const { data: { publicUrl } } = supabase.storage
            .from('laboratory-photos')
            .getPublicUrl(fileName)

          photo1_url = publicUrl
        }

        if (labPhoto2) {
          const fileExt = labPhoto2.name.split('.').pop()
          const fileName = `${labAcronym.toLowerCase()}_photo_2_${Date.now()}.${fileExt}`
          
          const { error: uploadError } = await supabase.storage
            .from('laboratory-photos')
            .upload(fileName, labPhoto2)

          if (uploadError) throw uploadError

          const { data: { publicUrl } } = supabase.storage
            .from('laboratory-photos')
            .getPublicUrl(fileName)

          photo2_url = publicUrl
        }

        if (labPhoto3) {
          const fileExt = labPhoto3.name.split('.').pop()
          const fileName = `${labAcronym.toLowerCase()}_photo_3_${Date.now()}.${fileExt}`
          
          const { error: uploadError } = await supabase.storage
            .from('laboratory-photos')
            .upload(fileName, labPhoto3)

          if (uploadError) throw uploadError

          const { data: { publicUrl } } = supabase.storage
            .from('laboratory-photos')
            .getPublicUrl(fileName)

          photo3_url = publicUrl
        }
      }

      const { error } = await supabase
        .from('laboratories')
        .insert({
          name: labName,
          acronym: labAcronym,
          chief_name: labChief,
          description: labDescription,
          pnipe_address: labPnipe,
          photo1_url,
          photo2_url,
          photo3_url,
        })

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Laboratório cadastrado com sucesso!",
      })

      // Limpar formulário
      setLabName('')
      setLabAcronym('')
      setLabChief('')
      setLabDescription('')
      setLabPnipe('')
      setLabPhoto1(null)
      setLabPhoto2(null)
      setLabPhoto3(null)
    } catch (error: any) {
      console.error('Erro ao cadastrar laboratório:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao cadastrar laboratório",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setUploadingPhotos(false)
    }
  }

  const handleRegisterNews = async () => {
    if (!newsTitle || !newsContent || !newsPosition) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios (Título, Conteúdo e Posição)",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setUploadingPhotos(true)

    try {
      const photos = [newsPhoto1, newsPhoto2, newsPhoto3]
      const photoUrls: (string | null)[] = [null, null, null]

      // Upload das fotos (sanitiza nome e define contentType)
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i]
        if (photo) {
          const originalName = photo.name || `foto-${i + 1}.jpg`
          const sanitizedName = originalName
            .toLowerCase()
            .replace(/[^a-z0-9._-]/g, '_')
            .replace(/_+/g, '_')
          const fileName = `${newsPosition || 'news'}/${Date.now()}-${i + 1}-${sanitizedName}`
          const { error: uploadError } = await supabase.storage
            .from('news-photos')
            .upload(fileName, photo, { contentType: photo.type || 'application/octet-stream', upsert: false })

          if (uploadError) {
            console.error('Erro upload storage:', uploadError)
            throw uploadError
          }

          const { data: { publicUrl } } = supabase.storage
            .from('news-photos')
            .getPublicUrl(fileName)

          photoUrls[i] = publicUrl
        }
      }

      // Verificar se já existe uma notícia na posição selecionada
      const { data: existingNews } = await supabase
        .from('news')
        .select('id')
        .eq('news_position', newsPosition)
        .maybeSingle()

      if (existingNews) {
        // Atualizar notícia existente
        const { error } = await supabase
          .from('news')
          .update({
            title: newsTitle,
            content: newsContent,
            photo1_url: photoUrls[0],
            photo2_url: photoUrls[1],
            photo3_url: photoUrls[2],
            cover_photo_number: parseInt(newsCoverPhoto),
          })
          .eq('id', existingNews.id)

        if (error) throw error
      } else {
        // Inserir nova notícia
        const { error } = await supabase
          .from('news')
          .insert({
            title: newsTitle,
            content: newsContent,
            photo1_url: photoUrls[0],
            photo2_url: photoUrls[1],
            photo3_url: photoUrls[2],
            cover_photo_number: parseInt(newsCoverPhoto),
            news_position: newsPosition
          })

        if (error) throw error
      }

      toast({
        title: "Sucesso",
        description: "Notícia publicada com sucesso!",
      })

      // Limpar formulário
      setNewsTitle('')
      setNewsContent('')
      setNewsPhoto1(null)
      setNewsPhoto2(null)
      setNewsPhoto3(null)
      setNewsCoverPhoto('1')
      setNewsPosition('')
    } catch (error: any) {
      console.error('Erro ao publicar notícia:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao publicar notícia",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setUploadingPhotos(false)
    }
  }

  const handleRegisterRegulation = async () => {
    if (!regulationName || !regulationPdfUrl) {
      toast({
        title: "Erro",
        description: "Nome da norma e endereço do PDF são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('regulations')
        .insert({
          name: regulationName,
          pdf_url: regulationPdfUrl,
        })

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Norma/regulamento cadastrado com sucesso!",
      })

      // Limpar formulário
      setRegulationName('')
      setRegulationPdfUrl('')
    } catch (error: any) {
      console.error('Erro ao cadastrar norma:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao cadastrar norma",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para registrar evento
  const handleRegisterEvent = async () => {
    if (!eventName || !eventDate || eventPhotos.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome do evento, data e pelo menos uma foto são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    if (eventPhotos.length > 30) {
      toast({
        title: "Muitas fotos",
        description: "Máximo de 30 fotos permitido por evento.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setUploadingPhotos(true)

    try {
      // Criar o evento primeiro
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .insert({
          name: eventName,
          event_date: eventDate
        })
        .select()
        .single()

      if (eventError) throw eventError

      // Upload das fotos
      for (let i = 0; i < eventPhotos.length; i++) {
        const photo = eventPhotos[i]
        const fileName = `${eventData.id}/${Date.now()}-${i}-${photo.name}`
        
        const { error: uploadError } = await supabase.storage
          .from('event-photos')
          .upload(fileName, photo)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('event-photos')
          .getPublicUrl(fileName)

        // Inserir referência da foto no banco
        const { error: photoError } = await supabase
          .from('event_photos')
          .insert({
            event_id: eventData.id,
            photo_url: publicUrl,
            photo_order: i + 1
          })

        if (photoError) throw photoError
      }

      toast({
        title: "Sucesso",
        description: `Evento "${eventName}" cadastrado com sucesso com ${eventPhotos.length} fotos!`,
      })

      // Limpar campos
      setEventName('')
      setEventDate('')
      setEventPhotos([])

    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar evento",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setUploadingPhotos(false)
    }
  }

  const handleRegisterProject = async () => {
    if (!projectTitle || !fundingAgency || !validityPeriod || !coordinator) {
      toast({
        title: "Erro",
        description: "Título, agência financiadora, vigência e coordenador são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('research_projects')
        .insert({
          title: projectTitle,
          funding_agency: fundingAgency,
          validity_period: validityPeriod,
          coordinator: coordinator,
          vice_coordinator: viceCoordinator || null,
        })

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Projeto de pesquisa cadastrado com sucesso!",
      })

      // Limpar formulário
      setProjectTitle('')
      setFundingAgency('')
      setValidityPeriod('')
      setCoordinator('')
      setViceCoordinator('')
    } catch (error: any) {
      console.error('Erro ao cadastrar projeto:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao cadastrar projeto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createResearcherPage = async (name: string, email: string, description: string, lattes: string) => {
    // Aqui será implementada a criação automática da página do pesquisador
    // Por enquanto, apenas um console.log para indicar que a função foi chamada
    console.log(`Criando página para ${name}`)
  }

  if (!adminUser) {
    return <div>Carregando...</div>
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logocpgg} alt="CPGG" />
          </div>
          <div className={styles.userInfo}>
            <span>Bem-vindo, {adminUser.email}</span>
            <Button onClick={handleLogout} variant="outline" className={styles.logoutButton}>
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
        
        <div className={styles.title}>
          <h1>Painel Administrativo - Coordenação</h1>
          <p>Cadastre os usuários do sistema e pesquisadores</p>
        </div>

        <div className={styles.formsContainer}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <UserCheck size={24} />
              <h2>Cadastrar Secretária</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="secretaria-email">E-mail:</label>
              <Input
                id="secretaria-email"
                type="email"
                value={secretariaEmail}
                onChange={(e) => setSecretariaEmail(e.target.value)}
                placeholder="Digite o e-mail da secretária"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="secretaria-password">Senha:</label>
              <Input
                id="secretaria-password"
                type="password"
                value={secretariaPassword}
                onChange={(e) => setSecretariaPassword(e.target.value)}
                placeholder="Digite a senha"
              />
            </div>
            <Button
              onClick={handleRegisterSecretaria}
              disabled={isLoading || !secretariaEmail || !secretariaPassword}
              className={styles.submitButton}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar Secretária'}
            </Button>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <Settings size={24} />
              <h2>Cadastrar Técnico em TI</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="ti-email">E-mail:</label>
              <Input
                id="ti-email"
                type="email"
                value={tiEmail}
                onChange={(e) => setTiEmail(e.target.value)}
                placeholder="Digite o e-mail do técnico"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="ti-password">Senha:</label>
              <Input
                id="ti-password"
                type="password"
                value={tiPassword}
                onChange={(e) => setTiPassword(e.target.value)}
                placeholder="Digite a senha"
              />
            </div>
            <Button
              onClick={handleRegisterTI}
              disabled={isLoading || !tiEmail || !tiPassword}
              className={styles.submitButton}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar Técnico em TI'}
            </Button>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <Users size={24} />
              <h2>Cadastrar Pesquisador</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="researcher-name">Nome:</label>
              <Input
                id="researcher-name"
                type="text"
                value={researcherName}
                onChange={(e) => setResearcherName(e.target.value)}
                placeholder="Digite o nome do pesquisador"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="researcher-program">Programa:</label>
              <Select value={researcherProgram} onValueChange={setResearcherProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o programa" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(programMapping).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="researcher-email">E-mail:</label>
              <Input
                id="researcher-email"
                type="email"
                value={researcherEmail}
                onChange={(e) => setResearcherEmail(e.target.value)}
                placeholder="Digite o e-mail do pesquisador"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="researcher-description">Descrição:</label>
              <Textarea
                id="researcher-description"
                value={researcherDescription}
                onChange={(e) => setResearcherDescription(e.target.value)}
                placeholder="Digite uma descrição sobre o pesquisador"
                rows={4}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="researcher-lattes">Link do Lattes:</label>
              <Input
                id="researcher-lattes"
                type="url"
                value={researcherLattes}
                onChange={(e) => setResearcherLattes(e.target.value)}
                placeholder="Digite o link do currículo Lattes"
              />
            </div>
            <Button
              onClick={handleRegisterResearcher}
              disabled={isLoading || !researcherName || !researcherProgram || !researcherEmail || !researcherDescription || !researcherLattes}
              className={styles.submitButton}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar Pesquisador'}
            </Button>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <FlaskConical size={24} />
              <h2>Cadastrar Laboratório</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lab-name">Nome:</label>
              <Input
                id="lab-name"
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                placeholder="Digite o nome do laboratório"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lab-acronym">Sigla:</label>
              <Input
                id="lab-acronym"
                type="text"
                value={labAcronym}
                onChange={(e) => setLabAcronym(e.target.value)}
                placeholder="Digite a sigla do laboratório"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lab-chief">Nome do Chefe:</label>
              <Input
                id="lab-chief"
                type="text"
                value={labChief}
                onChange={(e) => setLabChief(e.target.value)}
                placeholder="Digite o nome do chefe do laboratório"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lab-description">Descrição:</label>
              <Textarea
                id="lab-description"
                value={labDescription}
                onChange={(e) => setLabDescription(e.target.value)}
                placeholder="Digite uma descrição do laboratório"
                rows={4}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lab-pnipe">Endereço PNIPE:</label>
              <Input
                id="lab-pnipe"
                type="text"
                value={labPnipe}
                onChange={(e) => setLabPnipe(e.target.value)}
                placeholder="Digite o endereço PNIPE"
              />
            </div>
            <PhotoDropZone
              id="lab-photo1"
              label="Foto 1:"
              value={labPhoto1}
              onChange={setLabPhoto1}
              className={styles.photoDropZone}
            />
            <PhotoDropZone
              id="lab-photo2"
              label="Foto 2:"
              value={labPhoto2}
              onChange={setLabPhoto2}
              className={styles.photoDropZone}
            />
            <PhotoDropZone
              id="lab-photo3"
              label="Foto 3:"
              value={labPhoto3}
              onChange={setLabPhoto3}
              className={styles.photoDropZone}
            />
            <Button
              onClick={handleRegisterLaboratory}
              disabled={isLoading || uploadingPhotos || !labName || !labAcronym || !labChief || !labDescription || !labPnipe}
              className={styles.submitButton}
            >
              {uploadingPhotos ? 'Enviando fotos...' : isLoading ? 'Cadastrando...' : 'Cadastrar Laboratório'}
            </Button>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <Newspaper size={24} />
              <h2>Gerenciar Notícias</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="news-title">Título:</label>
              <Input
                id="news-title"
                type="text"
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                placeholder="Digite o título da notícia"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="news-content">Conteúdo:</label>
              <Textarea
                id="news-content"
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                placeholder="Digite o conteúdo da notícia"
                rows={8}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="news-position">Posição na Home:</label>
              <Select value={newsPosition} onValueChange={setNewsPosition}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a posição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="News1">Notícia 1</SelectItem>
                  <SelectItem value="News2">Notícia 2</SelectItem>
                  <SelectItem value="News3">Notícia 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <PhotoDropZone
              id="news-photo1"
              label="Foto 1:"
              value={newsPhoto1}
              onChange={setNewsPhoto1}
              className={styles.photoDropZone}
            />
            <PhotoDropZone
              id="news-photo2"
              label="Foto 2:"
              value={newsPhoto2}
              onChange={setNewsPhoto2}
              className={styles.photoDropZone}
            />
            <PhotoDropZone
              id="news-photo3"
              label="Foto 3:"
              value={newsPhoto3}
              onChange={setNewsPhoto3}
              className={styles.photoDropZone}
            />
            <div className={styles.formGroup}>
              <label htmlFor="news-cover">Foto de Capa:</label>
              <Select value={newsCoverPhoto} onValueChange={setNewsCoverPhoto}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Foto 1</SelectItem>
                  <SelectItem value="2">Foto 2</SelectItem>
                  <SelectItem value="3">Foto 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleRegisterNews}
              disabled={isLoading || uploadingPhotos || !newsTitle || !newsContent || !newsPosition}
              className={styles.submitButton}
            >
              {uploadingPhotos ? 'Enviando fotos...' : isLoading ? 'Publicando...' : 'Publicar Notícia'}
            </Button>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <BookOpen size={24} />
              <h2>Cadastrar Projeto de Pesquisa</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="project-title">Título do Projeto:</label>
              <Input
                id="project-title"
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Digite o título do projeto"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="project-funding">Agência Financiadora:</label>
              <Input
                id="project-funding"
                type="text"
                value={fundingAgency}
                onChange={(e) => setFundingAgency(e.target.value)}
                placeholder="Digite a agência financiadora"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="project-validity">Vigência do Projeto:</label>
              <Input
                id="project-validity"
                type="text"
                value={validityPeriod}
                onChange={(e) => setValidityPeriod(e.target.value)}
                placeholder="Ex: 2023-2026"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="project-coordinator">Coordenador do Projeto:</label>
              <Input
                id="project-coordinator"
                type="text"
                value={coordinator}
                onChange={(e) => setCoordinator(e.target.value)}
                placeholder="Digite o nome do coordenador"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="project-vice-coordinator">Vice-coordenador do Projeto:</label>
              <Input
                id="project-vice-coordinator"
                type="text"
                value={viceCoordinator}
                onChange={(e) => setViceCoordinator(e.target.value)}
                placeholder="Digite o nome do vice-coordenador (opcional)"
              />
            </div>
            <Button
              onClick={handleRegisterProject}
              disabled={isLoading || !projectTitle || !fundingAgency || !validityPeriod || !coordinator}
              className={styles.submitButton}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar Projeto'}
            </Button>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <FileText size={24} />
              <h2>Cadastrar Norma/Regulamento</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="regulation-name">Nome da Norma:</label>
              <Input
                id="regulation-name"
                type="text"
                value={regulationName}
                onChange={(e) => setRegulationName(e.target.value)}
                placeholder="Digite o nome da norma/regulamento"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="regulation-pdf">Endereço do PDF:</label>
              <Input
                id="regulation-pdf"
                type="url"
                value={regulationPdfUrl}
                onChange={(e) => setRegulationPdfUrl(e.target.value)}
                placeholder="Digite o link do PDF"
              />
            </div>
            <Button
              onClick={handleRegisterRegulation}
              disabled={isLoading || !regulationName || !regulationPdfUrl}
              className={styles.submitButton}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar Norma'}
            </Button>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <UserMinus size={24} />
              <h2>Administrar Usuários</h2>
            </div>
            <div className={styles.formGroup}>
              <p>Gerencie os usuários cadastrados no sistema</p>
            </div>
            <Button
              onClick={() => navigate('/adm/coordenacao/usuarios')}
              className={styles.submitButton}
            >
              Listar Usuários Cadastrados
            </Button>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <Image size={24} />
              <h2>Cadastrar Fotos de Eventos</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="event-name">Nome do Evento:</label>
              <Input
                id="event-name"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Digite o nome do evento"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="event-date">Data do Evento:</label>
              <Input
                id="event-date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="event-photos">Fotos do Evento (máximo 30):</label>
              <Input
                id="event-photos"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  if (files.length > 30) {
                    toast({
                      title: "Muitas fotos",
                      description: "Máximo de 30 fotos permitido por evento.",
                      variant: "destructive",
                    })
                    return
                  }
                  setEventPhotos(files)
                }}
                className={styles.photoInput}
              />
              {eventPhotos.length > 0 && (
                <p className={styles.photoCount}>
                  {eventPhotos.length} foto(s) selecionada(s)
                </p>
              )}
            </div>
            <Button
              onClick={handleRegisterEvent}
              disabled={isLoading || uploadingPhotos || !eventName || !eventDate || eventPhotos.length === 0}
              className={styles.submitButton}
            >
              {uploadingPhotos ? 'Enviando fotos...' : isLoading ? 'Cadastrando...' : 'Cadastrar Evento'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}