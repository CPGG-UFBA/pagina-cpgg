import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { UserPlus, LogOut } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

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

  const handleRegisterSecretaria = async (e: React.FormEvent) => {
    e.preventDefault()
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

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao cadastrar usuário da secretária.",
          variant: "destructive"
        })
        return
      }

      toast({
        title: "Sucesso!",
        description: "Usuário da secretária cadastrado com sucesso.",
      })
      setSecretariaEmail('')
      setSecretariaPassword('')
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar usuário.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterTI = async (e: React.FormEvent) => {
    e.preventDefault()
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

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao cadastrar usuário de TI.",
          variant: "destructive"
        })
        return
      }

      toast({
        title: "Sucesso!",
        description: "Usuário de TI cadastrado com sucesso.",
      })
      setTiEmail('')
      setTiPassword('')
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar usuário.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
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
          <p>Cadastre os usuários do sistema</p>
        </div>

        <div className={styles.formsContainer}>
          <form onSubmit={handleRegisterSecretaria} className={styles.formCard}>
            <div className={styles.formHeader}>
              <UserPlus size={24} />
              <h2>Cadastrar Secretária</h2>
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="secretaria-email">Email da Secretária:</Label>
              <Input
                id="secretaria-email"
                type="email"
                placeholder="Digite o email da secretária"
                value={secretariaEmail}
                onChange={(e) => setSecretariaEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="secretaria-password">Senha:</Label>
              <Input
                id="secretaria-password"
                type="password"
                placeholder="Digite a senha"
                value={secretariaPassword}
                onChange={(e) => setSecretariaPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar Secretária'}
            </Button>
          </form>

          <form onSubmit={handleRegisterTI} className={styles.formCard}>
            <div className={styles.formHeader}>
              <UserPlus size={24} />
              <h2>Cadastrar Técnico em TI</h2>
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="ti-email">Email do Técnico em TI:</Label>
              <Input
                id="ti-email"
                type="email"
                placeholder="Digite o email do técnico"
                value={tiEmail}
                onChange={(e) => setTiEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="ti-password">Senha:</Label>
              <Input
                id="ti-password"
                type="password"
                placeholder="Digite a senha"
                value={tiPassword}
                onChange={(e) => setTiPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar Técnico TI'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}