import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import styles from './ti.module.css'
const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

export function TI() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .eq('role', 'ti')
        .single()

      if (error || !data) {
        toast({
          title: "Erro de login",
          description: "Email ou senha incorretos, ou usuário não cadastrado.",
          variant: "destructive"
        })
        return
      }

      // Login bem-sucedido
      sessionStorage.setItem('admin_user', JSON.stringify(data))
      toast({
        title: "Login realizado!",
        description: "Bem-vindo à área de T.I.",
      })
      // Aqui poderia navegar para uma dashboard específica do TI se necessário
      console.log('Login TI bem-sucedido:', data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao realizar login. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('email, password')
        .eq('email', resetEmail)
        .eq('role', 'ti')
        .single()

      if (error || !data) {
        toast({
          title: "Erro",
          description: "Email não encontrado. Verifique o email digitado.",
          variant: "destructive"
        })
        return
      }

      // Simular envio de email com a senha
      console.log(`Enviando senha para ${resetEmail}: ${data.password}`)
      
      toast({
        title: "Email enviado!",
        description: "Sua senha foi enviada para o email cadastrado.",
      })
      
      setResetEmail('')
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao enviar email. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className={styles.ti}>
      <form className={styles.box} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>
        <div className={styles.upper}>
          <p>Login - TI</p>
        </div>
        <div className={styles.back}>
          <NavLink to='/adm'>← Voltar</NavLink>
        </div>
        
        <div className={styles.form}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"
            placeholder="Digite seu email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            disabled={isLoading}
          />
          
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password"
            placeholder="Digite sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            disabled={isLoading}
          />
        </div>
        
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button type="button" className={styles.forgotPassword}>
              Esqueci minha senha
            </button>
          </DialogTrigger>
          <DialogContent className={styles.dialogContent}>
            <DialogHeader>
              <DialogTitle>Recuperar Senha</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePasswordReset} className={styles.resetForm}>
              <div className={styles.formGroup}>
                <Label htmlFor="resetEmail">Email cadastrado:</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="Digite seu email cadastrado"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className={styles.resetButton}>
                Enviar senha por email
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  )
}