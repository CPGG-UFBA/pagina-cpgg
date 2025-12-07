import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ReservationMeetingRoom.module.css'
import '../reservations-no-scroll.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { supabase } from '../../../integrations/supabase/client'

export function MR() {
  const navigate = useNavigate()
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
          tipoReserva: 'sala_reuniao'
        }
      });

      if (error) throw error;

      console.log('Reserva enviada com sucesso:', data);
      // Redirecionar para página de sucesso usando React Router
      navigate('/reservations/success')
    } catch (error) {
      console.error('Erro ao enviar reserva:', error);
      alert('Erro ao enviar reserva. Tente novamente.');
    }
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={`${styles.MR} reservationMeetingRoomPage`}>
          <form className={styles.box} onSubmit={handleSubmit}>
            <ul> Reserva da Sala de Reuniões do CPGG </ul>

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
    </div>
  )
}
