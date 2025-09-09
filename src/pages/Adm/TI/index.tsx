import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import styles from './ti.module.css'
const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

// Simulando emails cadastrados
const registeredEmails = ['ti@cpgg.ufba.br', 'tech@cpgg.ufba.br'];
const passwords = { 'ti@cpgg.ufba.br': 'ti123', 'tech@cpgg.ufba.br': 'tech456' };

export function TI() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de login aqui
    console.log('Login TI:', { email, password })
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!registeredEmails.includes(resetEmail)) {
      toast({
        title: "Erro",
        description: "Email não encontrado. Verifique o email digitado.",
        variant: "destructive"
      })
      return
    }

    // Simular envio de email
    const userPassword = passwords[resetEmail as keyof typeof passwords]
    
    try {
      // Aqui seria a integração real com serviço de email
      console.log(`Enviando senha para ${resetEmail}: ${userPassword}`)
      
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
          />
          
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password"
            placeholder="Digite sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        
        <button type="submit" className={styles.button}>
          Entrar
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