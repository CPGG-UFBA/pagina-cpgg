import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HomeButton } from '../../components/HomeButton';
import styles from './sign.module.css';
const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

export function Sign() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
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

    // Check for existing session but do NOT redirect;
    // keep forms visible even if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Erro ao fazer login",
            description: "Email ou senha incorretos.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao fazer login",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Login realizado",
          description: "Bem-vindo de volta!",
        });
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);

    try {
      // Redireciona para a página de registro com email e senha
      navigate('/registration', { 
        state: { 
          email: signupEmail, 
          password: signupPassword 
        } 
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSignupLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao enviar email de recuperação. Verifique o email digitado.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Link enviado com sucesso!",
        description: "Um link para redefinir sua senha foi enviado para o email cadastrado. Verifique sua caixa de entrada.",
      });
      
      setResetEmail('');
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao enviar email. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={styles.sign}>
      <HomeButton />
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>
        
        <div className={styles.formsContainer}>
          {/* Formulário de Login */}
          <div className={styles.formBox}>
            <div className={styles.formTitle}>
              <p>Fazer Login</p>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
              <input 
                type="email" 
                placeholder="Email" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                disabled={loginLoading}
              />
              <input 
                type="password" 
                placeholder="Senha" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                disabled={loginLoading}
                minLength={6}
              />
              <button type="submit" disabled={loginLoading}>
                {loginLoading ? 'Carregando...' : 'Entrar'}
              </button>
            </form>

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
                Enviar link de redefinição
              </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Formulário de Cadastro */}
          <div className={styles.formBox}>
            <div className={styles.formTitle}>
              <p>Criar Nova Conta</p>
            </div>

            <form onSubmit={handleSignUp} className={styles.form}>
              <input 
                type="email" 
                placeholder="Email" 
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                disabled={signupLoading}
              />
              <input 
                type="password" 
                placeholder="Senha (mín. 6 caracteres)" 
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                disabled={signupLoading}
                minLength={6}
              />
              <button type="submit" disabled={signupLoading}>
                {signupLoading ? 'Carregando...' : 'Criar Conta'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
