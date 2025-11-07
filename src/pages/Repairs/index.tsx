import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RepairsServices.module.css'
import './repairs-no-scroll.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { supabase } from '../../integrations/supabase/client'

export function RepairsServices() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    problemType: '',
    problemDescription: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar se todos os campos estão preenchidos
    if (!formData.nome || !formData.sobrenome || !formData.email || !formData.problemType || !formData.problemDescription) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('send-repair-request', {
        body: formData
      });

      if (error) throw error;

      console.log('Solicitação enviada com sucesso:', data);
      // Redirecionar para página de sucesso
      navigate('/reservations/success')
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    }
  }

  return (
    <>
      <Header />
      <div className={styles.RS}>
          <ul> Solicitação de Reparos e Serviços Técnicos </ul>
          <form className={styles.box} onSubmit={handleSubmit}>

          <div className={styles.form}> 
             <input 
               type="text" 
               placeholder="Nome" 
               value={formData.nome}
               onChange={(e) => handleInputChange('nome', e.target.value)}
               required 
             />
          </div>

          <div className={styles.form}> 
            <input 
              type="text" 
              placeholder="Sobrenome" 
              value={formData.sobrenome}
              onChange={(e) => handleInputChange('sobrenome', e.target.value)}
              required 
            />
          </div>

          <div className={styles.form}> 
            <input 
              type="email" 
              placeholder="E-mail" 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required 
            />
          </div>

          <div className={styles.form}> 
            <label>Tipo de Problema</label>
            <select 
              value={formData.problemType}
              onChange={(e) => handleInputChange('problemType', e.target.value)}
              required 
            >
              <option value="">Selecione o tipo de problema</option>
              <option value="infraestrutura">1. Problema de infraestrutura</option>
              <option value="ti">2. Problema de T.I.</option>
            </select>
          </div>

          <div className={styles.form}> 
            <label>Descrição do Problema</label>
            <textarea 
              placeholder="Descreva detalhadamente o problema..." 
              value={formData.problemDescription}
              onChange={(e) => handleInputChange('problemDescription', e.target.value)}
              required 
            />
          </div>

          <button type="submit">
              Enviar Solicitação
          </button> 

          </form>
        </div>
        
      <Footer />
    </>
  )
}
