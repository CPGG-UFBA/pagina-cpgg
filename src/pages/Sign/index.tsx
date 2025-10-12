import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '../../hooks/use-toast';
import { HomeButton } from '../../components/HomeButton';
import { z } from 'zod';
import styles from './sign.module.css';
const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

// Schema de validação
const registrationSchema = z.object({
  fullName: z.string().trim().min(1, 'Nome completo é obrigatório').max(255),
  email: z.string().trim().email('Email inválido').max(255),
  phone: z.string().trim().min(1, 'Telefone é obrigatório').max(20),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

export function Sign() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect only after a successful sign in event
        if (event === 'SIGNED_IN' && session?.user) {
          navigate('/');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Função para verificar se o nome foi pré-cadastrado pelo administrador
  const checkPreRegisteredName = async (fullName: string) => {
    const { data, error } = await supabase
      .rpc('find_user_profile_by_name', {
        _search_name: fullName.trim()
      });
    
    if (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
    
    return data && data.length > 0 ? data[0] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validar dados do formulário
      const validationResult = registrationSchema.safeParse(formData);
      
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast({
          title: 'Erro de validação',
          description: firstError.message,
          variant: 'destructive'
        });
        setIsLoading(false);
        return;
      }

      // Verificar se o email já está em uso
      const { data: emailCheck } = await supabase
        .rpc('check_user_profile_duplicates', {
          _email: formData.email,
          _full_name: ''
        });

      if (emailCheck) {
        const { email_in_auth, email_exists } = emailCheck as { email_in_auth: boolean; email_exists: boolean; name_exists: boolean };
        
        if (email_in_auth || email_exists) {
          toast({
            title: 'Email já cadastrado',
            description: 'Este email já está sendo utilizado.',
            variant: 'destructive'
          });
          setIsLoading(false);
          return;
        }
      }

      // Verificar se o nome foi pré-cadastrado pelo administrador
      const preRegisteredProfile = await checkPreRegisteredName(formData.fullName);
      
      if (!preRegisteredProfile) {
        toast({
          title: 'Acesso não autorizado',
          description: 'Seu nome não foi encontrado no sistema. Entre em contato com o administrador para ser adicionado primeiro.',
          variant: 'destructive'
        });
        setIsLoading(false);
        return;
      }

      // Verificar se o perfil já tem user_id (já foi registrado)
      if (preRegisteredProfile.user_id) {
        toast({
          title: 'Usuário já registrado',
          description: 'Este pesquisador já completou o registro.',
          variant: 'destructive'
        });
        setIsLoading(false);
        return;
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
      });

      if (authError) {
        toast({
          title: 'Erro no registro',
          description: authError.message,
          variant: 'destructive'
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: 'Cadastro realizado!',
        description: 'Um email de confirmação foi enviado para ' + formData.email + '. Por favor, confirme seu email para poder fazer login e editar suas informações.',
        duration: 8000,
      });
      
      setRegisteredEmail(formData.email);
      setSuccess(true);
    } catch (error: any) {
      toast({
        title: 'Erro no registro',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: registeredEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast({
          title: 'Erro ao reenviar email',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Email reenviado!',
          description: 'Um novo email de confirmação foi enviado para ' + registeredEmail,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Não foi possível reenviar o email. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResettingPassword(true);

    try {
      // Validar email
      const emailSchema = z.string().trim().email('Email inválido');
      const validationResult = emailSchema.safeParse(resetEmail);
      
      if (!validationResult.success) {
        toast({
          title: 'Email inválido',
          description: 'Por favor, insira um email válido.',
          variant: 'destructive'
        });
        setIsResettingPassword(false);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: 'Erro ao enviar email',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Email enviado!',
          description: 'Verifique sua caixa de entrada para redefinir sua senha.',
        });
        setShowForgotPassword(false);
        setResetEmail('');
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar o email. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  if (success) {
    return (
      <div className={styles.sign}>
        <HomeButton />
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src={logocpgg} alt="CPGG" />
          </div>
          <div className={styles.formBox} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className={styles.formTitle}>
              <p>Cadastro Realizado!</p>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                <strong>Um email de confirmação foi enviado para o endereço cadastrado.</strong>
              </p>
              <p style={{ marginBottom: '10px' }}>
                Por favor, verifique sua caixa de entrada (e também a pasta de spam) e clique no link de confirmação.
              </p>
              <p style={{ marginBottom: '20px', color: '#666' }}>
                Após confirmar seu email, você poderá fazer login e editar suas informações pessoais na plataforma.
              </p>
              <button 
                onClick={handleResendEmail}
                disabled={isResending}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isResending ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: isResending ? 0.6 : 1,
                  transition: 'all 0.2s'
                }}
              >
                {isResending ? 'Reenviando...' : 'Reenviar email de confirmação'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className={styles.sign}>
        <HomeButton />
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src={logocpgg} alt="CPGG" />
          </div>
          
          <div className={styles.formBox} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className={styles.formTitle}>
              <p>Recuperar Senha</p>
            </div>

            <form onSubmit={handleForgotPassword} className={styles.form}>
              <p style={{ marginBottom: '20px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
                Digite seu email cadastrado para receber um link de redefinição de senha.
              </p>
              <input
                type="email"
                placeholder="Email cadastrado"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                disabled={isResettingPassword}
              />
              <button type="submit" disabled={isResettingPassword}>
                {isResettingPassword ? 'Enviando...' : 'Enviar link de recuperação'}
              </button>
              <button 
                type="button"
                onClick={() => setShowForgotPassword(false)}
                disabled={isResettingPassword}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#6b7280',
                  cursor: isResettingPassword ? 'not-allowed' : 'pointer',
                  opacity: isResettingPassword ? 0.6 : 1
                }}
              >
                Voltar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sign}>
      <HomeButton />
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>
        
        <div className={styles.formBox} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className={styles.formTitle}>
            <p>Criar Nova Conta</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="fullName"
              placeholder="Nome completo"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha (mínimo 6 caracteres)"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              minLength={6}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Criar Conta'}
            </button>
            <button 
              type="button"
              onClick={() => setShowForgotPassword(true)}
              disabled={isLoading}
              style={{
                marginTop: '10px',
                backgroundColor: '#059669',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              Esqueci minha senha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
