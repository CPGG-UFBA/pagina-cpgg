import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { HomeButton } from '../../components/HomeButton'
import { z } from 'zod'
import styles from './registration.module.css'

const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

export function Registration() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  
  // Pega email e senha do estado da navegação
  const { email, password } = location.state || {}
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: email || '',
    phone: '',
    password: password || '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Schema de validação com zod
  const registrationSchema = z.object({
    fullName: z.string().trim().min(1, 'Nome completo é obrigatório').max(255),
    email: z.string().trim().email('Email inválido').max(255),
    phone: z.string().trim().min(1, 'Telefone é obrigatório').max(20),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

  // Função para verificar se o nome foi pré-cadastrado pelo administrador
  const checkPreRegisteredName = async (fullName: string) => {
    const { data, error } = await supabase
      .rpc('find_user_profile_by_name', {
        _search_name: fullName.trim()
      })
    
    if (error) {
      console.error('Erro ao buscar perfil:', error)
      return null
    }
    
    return data && data.length > 0 ? data[0] : null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validar dados do formulário
      const validationResult = registrationSchema.safeParse(formData)
      
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0]
        toast({
          title: 'Erro de validação',
          description: firstError.message,
          variant: 'destructive'
        })
        setIsLoading(false)
        return
      }

      // Verificar se o email já está em uso
      const { data: emailCheck } = await supabase
        .rpc('check_user_profile_duplicates', {
          _email: formData.email,
          _full_name: ''
        })

      if (emailCheck) {
        const { email_in_auth, email_exists } = emailCheck as { email_in_auth: boolean; email_exists: boolean; name_exists: boolean }
        
        if (email_in_auth || email_exists) {
          toast({
            title: 'Email já cadastrado',
            description: 'Este email já está sendo utilizado.',
            variant: 'destructive'
          })
          setIsLoading(false)
          return
        }
      }

      // Verificar se o nome foi pré-cadastrado pelo administrador
      const preRegisteredProfile = await checkPreRegisteredName(formData.fullName)
      
      if (!preRegisteredProfile) {
        toast({
          title: 'Acesso não autorizado',
          description: 'Seu nome não foi encontrado no sistema. Entre em contato com o administrador para ser adicionado primeiro.',
          variant: 'destructive'
        })
        setIsLoading(false)
        return
      }

      // Verificar se o perfil já tem user_id (já foi registrado)
      if (preRegisteredProfile.user_id) {
        toast({
          title: 'Usuário já registrado',
          description: 'Este pesquisador já completou o registro.',
          variant: 'destructive'
        })
        setIsLoading(false)
        return
      }

      // Criar conta no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.fullName,
            institution: 'UFBA',
            phone: formData.phone,
            researcher_route: preRegisteredProfile.researcher_route || 'pesquisador',
            profile_id: preRegisteredProfile.id
          }
        }
      })

      if (authError) {
        toast({
          title: 'Erro no registro',
          description: authError.message,
          variant: 'destructive'
        })
        setIsLoading(false)
        return
      }

      setSuccess(true)
    } catch (error: any) {
      toast({
        title: 'Erro no registro',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (success) {
    return (
      <div className={styles.registration}>
        <HomeButton />
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src={logocpgg} alt="CPGG" />
          </div>
          <div className={styles.successBox}>
            <h1>Registration</h1>
            <div className={styles.successMessage}>
              <h2>Registro completado com sucesso!</h2>
              <p>Acesse seu email para completar o registro</p>
              <p>Retorne para a página de Login</p>
              <button 
                onClick={() => { window.location.href = '/sign' }}
                className={styles.backButton}
              >
                Ir para Login
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.registration}>
      <HomeButton />
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>
        <div className={styles.formBox}>
          <h1>Registration</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="fullName"
              placeholder="Nome completo"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Senha (mínimo 6 caracteres)"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}