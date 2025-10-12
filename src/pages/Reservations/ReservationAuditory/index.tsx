import { useState } from 'react'
import styles from './ReservationAuditory.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { supabase } from '../../../integrations/supabase/client'

export function RA() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    uso: '',
    inicio: '',
    termino: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar se todos os campos estão preenchidos
    if (!formData.nome || !formData.sobrenome || !formData.email || !formData.uso || !formData.inicio || !formData.termino) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('send-reservation-email', {
        body: {
          ...formData,
          tipoReserva: 'auditorio'
        }
      });

      if (error) throw error;

      console.log('Reserva enviada com sucesso:', data);
      // Redirecionar para página de sucesso
      window.location.href = '/Reservations/Success'
    } catch (error) {
      console.error('Erro ao enviar reserva:', error);
      alert('Erro ao enviar reserva. Tente novamente.');
    }
  }

  return (
    <>
      <Header />
      <div className={styles.RA}>
          <ul> Reserva do Auditório do CPGG </ul>
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
            <input 
              type="text" 
              placeholder="Uso para...?" 
              value={formData.uso}
              onChange={(e) => handleInputChange('uso', e.target.value)}
              required 
            />
          </div>

          <div className={styles.container}> 
            <div className={styles.dateField}>
               <label>Início</label>
              <input 
                type="datetime-local" 
                value={formData.inicio}
                onChange={(e) => handleInputChange('inicio', e.target.value)}
                required 
              />
            </div> 
            <div className={styles.dateField}>
               <label>Término</label>
              <input 
                type="datetime-local" 
                value={formData.termino}
                onChange={(e) => handleInputChange('termino', e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className={styles.button}>
              Enviar   
          </button> 

          </form>
        </div>
        
      <Footer />
    </>
  )
}
