import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LogOut, UserCheck, Settings, Users, Building } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { PhotoDropZone } from '@/components/PhotoDropZone'
import styles from './dashboard.module.css'

const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

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
  
  // Estados para cadastro de laboratório
  const [labName, setLabName] = useState('')
  const [labAcronym, setLabAcronym] = useState('')
  const [labChief, setLabChief] = useState('')
  const [labDescription, setLabDescription] = useState('')
  const [labPnipe, setLabPnipe] = useState('')
  const [labPhotos, setLabPhotos] = useState<File[]>([])
  const [labPhoto1, setLabPhoto1] = useState<File | null>(null)
  const [labPhoto2, setLabPhoto2] = useState<File | null>(null)
  const [labPhoto3, setLabPhoto3] = useState<File | null>(null)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
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
              <h2>Cadastrar Novo Pesquisador</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="researcher-name">Nome:</label>
              <Input
                id="researcher-name"
                type="text"
                value={researcherName}
                onChange={(e) => setResearcherName(e.target.value)}
                placeholder="Digite o nome completo"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="researcher-program">Programa:</label>
              <Select value={researcherProgram} onValueChange={setResearcherProgram}>
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue placeholder="Selecione o programa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oil">Exploração de Petróleo</SelectItem>
                  <SelectItem value="environment">Recursos Hidricos e Ambientais</SelectItem>
                  <SelectItem value="mineral">Petrologia, Metalogênese e Exp. Mineral</SelectItem>
                  <SelectItem value="oceanography">Oceanografia Física</SelectItem>
                  <SelectItem value="coast">Geologia Marinha e Costeira</SelectItem>
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
                placeholder="Digite a descrição do pesquisador"
                rows={3}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="researcher-lattes">Link Lattes:</label>
              <Input
                id="researcher-lattes"
                type="url"
                value={researcherLattes}
                onChange={(e) => setResearcherLattes(e.target.value)}
                placeholder="Digite o link do Lattes"
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
              <Building size={24} />
              <h2>Cadastrar Novo Laboratório</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lab-name">Nome do Laboratório:</label>
              <Input
                id="lab-name"
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                placeholder="Digite o nome completo do laboratório"
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
              <label htmlFor="lab-description">Texto Descritivo:</label>
              <Textarea
                id="lab-description"
                value={labDescription}
                onChange={(e) => setLabDescription(e.target.value)}
                placeholder="Digite a descrição do laboratório"
                rows={3}
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
        </div>
      </div>
    </div>
  )
}