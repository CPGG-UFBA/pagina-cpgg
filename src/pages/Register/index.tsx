import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import { useToast } from '../../hooks/use-toast';
import styles from './register.module.css';
import logocpgg from '../../components/Figures/cpgg.png';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validação básica
      if (!formData.name || !formData.email || !formData.password) {
        toast({
          title: "Campos obrigatórios",
          description: "Nome, email e senha são obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      if (formData.password.length < 6) {
        toast({
          title: "Senha muito curta",
          description: "A senha deve ter pelo menos 6 caracteres.",
          variant: "destructive",
        });
        return;
      }

      const redirectUrl = `${window.location.origin}/`;
      
      // Registro no Supabase Auth com metadados
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.name,
            institution: formData.institution,
            phone: formData.phone
          }
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Usuário já existe",
            description: "Este email já está cadastrado. Tente fazer login.",
            variant: "destructive",
          });
        } else if (error.message.includes('Password should be at least 6 characters')) {
          toast({
            title: "Senha muito curta",
            description: "A senha deve ter pelo menos 6 caracteres.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid email')) {
          toast({
            title: "Email inválido",
            description: "Por favor, insira um email válido.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao criar conta",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para confirmar o cadastro.",
        });
        
        // Limpar formulário
        setFormData({
          name: '',
          email: '',
          institution: '',
          phone: '',
          password: ''
        });
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>

        <div className={styles.upper}>
          <p>Registration</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.form}> 
            <input 
              type="text" 
              name="name"
              placeholder="Nome completo" 
              value={formData.name}
              onChange={handleInputChange}
              required 
              disabled={loading}
            />
          </div>

          <div className={styles.form}> 
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
              disabled={loading}
            />
          </div>

          <div className={styles.form}> 
            <input 
              type="text" 
              name="institution"
              placeholder="Instituição/Empresa" 
              value={formData.institution}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className={styles.form}> 
            <input 
              type="tel" 
              name="phone"
              placeholder="(xx)xxxxx-xxxx" 
              value={formData.phone}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className={styles.form}> 
            <input 
              type="password" 
              name="password"
              placeholder="Senha" 
              value={formData.password}
              onChange={handleInputChange}
              required 
              disabled={loading}
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <div className={styles.loginLink}>
          <p>
            Já tem uma conta?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/login')}
              className={styles.linkButton}
              disabled={loading}
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </div> 
  );
}