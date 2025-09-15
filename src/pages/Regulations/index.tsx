import { useState, useEffect } from 'react';
import styles from './Regulations.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EditButton } from './components/EditButton';
import { AdminLogin } from './components/AdminLogin';
import { EditableRegulation } from './components/EditableRegulation';
import earthImage from '../../assets/earth-regulations.jpg'

interface Regulation {
  id: string;
  name: string;
  pdf_url: string;
}

export function Regulations() {
  const [dynamicRegulations, setDynamicRegulations] = useState<Regulation[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRegulations();
  }, []);

  const fetchRegulations = async () => {
    try {
      const { data, error } = await supabase
        .from('regulations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      setDynamicRegulations(data || []);
    } catch (error) {
      console.error('Erro ao buscar normas:', error);
    }
  };

  const handleUpdateRegulation = async (id: string, name: string, pdfUrl: string) => {
    try {
      const { error } = await supabase
        .from('regulations')
        .update({ name, pdf_url: pdfUrl })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Norma atualizada com sucesso!",
      });

      await fetchRegulations();
    } catch (error: any) {
      console.error('Erro ao atualizar norma:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar norma",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRegulation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('regulations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Norma excluída com sucesso!",
      });

      await fetchRegulations();
    } catch (error: any) {
      console.error('Erro ao excluir norma:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir norma",
        variant: "destructive",
      });
    }
  };

  const handleLoginSuccess = () => {
    setIsEditMode(true);
  };

  const handleLogout = () => {
    setIsEditMode(false);
    toast({
      title: "Logout",
      description: "Saindo do modo de edição",
    });
  };

  return (
      <>
      <Header/>
          <div className={styles.regulations}>
              <h1 className={styles.title}>Regimento e Normas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="https://drive.google.com/file/d/1lKeG0fAc_HzBDP-C8WaaBIM5vOhVurBB/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.regulation}>
                          <h2>Regimento</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="https://drive.google.com/file/d/1gYKCWZw-1Io5FCGRtjPKBZNoWDKnMAmE/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.accreditation}>
                          <h2> Deliberação Normativa para (re)credenciamento</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/1lNFAxiARsoaADdfVeagH3Dcn3DpYR0w2/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.senior}>
                          <h2> Deliberação Normativa para pesquisadores seniores</h2>
                      </div>
                  </a>

                  {/* Normas dinâmicas do banco de dados */}
                  {dynamicRegulations.map((regulation) => (
                    <EditableRegulation
                      key={regulation.id}
                      regulation={regulation}
                      isEditMode={isEditMode}
                      onUpdate={handleUpdateRegulation}
                      onDelete={handleDeleteRegulation}
                    />
                  ))}

              </div>
          </div>

          <EditButton 
            onClick={() => setShowLogin(true)}
            isEditMode={isEditMode}
            onLogout={handleLogout}
          />
          
          <AdminLogin
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onSuccess={handleLoginSuccess}
          />

          <Footer/>
      </>
  )
}
