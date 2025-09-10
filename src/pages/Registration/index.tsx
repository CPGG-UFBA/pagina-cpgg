import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { researcherData, normalize } from '../../data/researchers'
import { useToast } from '@/hooks/use-toast'
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
    institution: '',
    phone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Função para validar se o primeiro nome existe nos pesquisadores
  const validateFirstName = (fullName: string) => {
    const firstName = fullName.trim().split(' ')[0]
    const normalizedFirstName = normalize(firstName)
    
    // Busca em todos os programas
    const allResearchers = Object.values(researcherData).flat()
    
    return allResearchers.some(researcher => {
      const researcherFirstName = researcher.name.trim().split(' ')[0]
      const normalizedResearcherName = normalize(researcherFirstName)
      return normalizedResearcherName === normalizedFirstName
    })
  }

  // Função para encontrar a rota do pesquisador baseada no primeiro nome
  const findResearcherRoute = (fullName: string) => {
    const firstName = fullName.trim().split(' ')[0]
    const normalizedFirstName = normalize(firstName)
    
    const allResearchers = Object.values(researcherData).flat()
    
    const researcher = allResearchers.find(researcher => {
      const researcherFirstName = researcher.name.trim().split(' ')[0]
      const normalizedResearcherName = normalize(researcherFirstName)
      return normalizedResearcherName === normalizedFirstName
    })
    
    return researcher?.route || null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Valida se o primeiro nome existe
      if (!validateFirstName(formData.fullName)) {
        toast({
          title: 'Nome errado do usuário',
          description: 'O primeiro nome não corresponde a nenhum pesquisador cadastrado.',
          variant: 'destructive'
        })
        setIsLoading(false)
        return
      }

      // Cria conta no Supabase Auth se email e senha foram fornecidos
      if (email && password) {
        const firstName = formData.fullName.trim().split(' ')[0]
        const researcherRoute = findResearcherRoute(formData.fullName)

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.fullName,
              institution: formData.institution,
              phone: formData.phone,
              researcher_route: researcherRoute
            }
          }
        })

        if (authError) throw authError

        setSuccess(true)
      }
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
                onClick={() => navigate('/login')}
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
              type="text"
              name="institution"
              placeholder="Instituição"
              value={formData.institution}
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