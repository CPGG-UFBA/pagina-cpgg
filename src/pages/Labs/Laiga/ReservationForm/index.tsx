import { useState } from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { supabase } from '../../../../integrations/supabase/client'
import styles from './LaigaReservation.module.css'
import { toast } from '@/hooks/use-toast'

const equipments = [
  'Elrec Pro',
  'Gamaespectrômetro RS125',
  'Gerador Honda EG5500',
  'GPR SIR 3000',
  'GPR SIR 4000',
  'GPR SIR 20',
  'GPS diferencial SP60',
  'GPS Etrex10',
  'Gravímetro CG5',
  'Magnetômetro Marinho G882',
  'Magnetômetro Terrestre GSN19',
  'Simsógrafo Geode48',
  'Susceptibilímetro KT10',
  'Syscal Pro',
  'VLF T-VLF',
  'V8 Phoenix'
].sort()

export function RF() {
  const [formData, setFormData] = useState({
    selectedEquipments: [] as string[],
    otherEquipment: '',
    peripherals: '',
    withdrawalDate: '',
    returnDate: '',
    purpose: '',
    applicantName: '',
    agreementAccepted: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        selectedEquipments: [...prev.selectedEquipments, equipment]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        selectedEquipments: prev.selectedEquipments.filter(eq => eq !== equipment)
      }))
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    if (formData.selectedEquipments.length === 0 && !formData.otherEquipment) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um equipamento",
        variant: "destructive"
      })
      return
    }

    if (!formData.withdrawalDate || !formData.returnDate) {
      toast({
        title: "Erro", 
        description: "Preencha as datas de retirada e devolução",
        variant: "destructive"
      })
      return
    }

    if (!formData.purpose || !formData.applicantName) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    if (!formData.agreementAccepted) {
      toast({
        title: "Erro",
        description: "Você deve aceitar o termo de agradecimentos",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const { data, error } = await supabase.functions.invoke('send-laiga-reservation', {
        body: formData
      })

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Solicitação enviada com sucesso!"
      })

      // Redirecionar para comprovante
      window.open(`/Labs/Laiga/Receipt?id=${data.reservationId}`, '_blank')
      
      // Resetar formulário
      setFormData({
        selectedEquipments: [],
        otherEquipment: '',
        peripherals: '',
        withdrawalDate: '',
        returnDate: '',
        purpose: '',
        applicantName: '',
        agreementAccepted: false
      })
      
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
      toast({
        title: "Erro",
        description: "Erro ao enviar solicitação. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Formulário de Reserva de Equipamentos - LAIGA</h1>
        
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <label>Equipamentos Disponíveis:</label>
              <div className={styles.equipmentList}>
                {equipments.map((equipment) => (
                  <div key={equipment} className={styles.equipmentItem}>
                    <input
                      type="checkbox"
                      id={equipment}
                      checked={formData.selectedEquipments.includes(equipment)}
                      onChange={(e) => handleEquipmentChange(equipment, e.target.checked)}
                    />
                    <label htmlFor={equipment}>{equipment}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.form}>
              <label htmlFor="otherEquipment">Outro equipamento não listado acima?</label>
              <input
                type="text"
                id="otherEquipment"
                value={formData.otherEquipment}
                onChange={(e) => handleInputChange('otherEquipment', e.target.value)}
                placeholder="Digite outros equipamentos necessários"
              />
            </div>

            <div className={styles.form}>
              <label htmlFor="peripherals">Algum periférico adicional? (ex: rolo de cabos, tenda, garra d'água, eletrodos, etc)</label>
              <textarea
                id="peripherals"
                value={formData.peripherals}
                onChange={(e) => handleInputChange('peripherals', e.target.value)}
                placeholder="Descreva os periféricos necessários"
                rows={3}
              />
            </div>

            <div className={styles.dateContainer}>
              <div className={styles.form}>
                <label htmlFor="withdrawalDate">Data de Retirada *</label>
                <input
                  type="date"
                  id="withdrawalDate"
                  value={formData.withdrawalDate}
                  onChange={(e) => handleInputChange('withdrawalDate', e.target.value)}
                  required
                />
              </div>

              <div className={styles.form}>
                <label htmlFor="returnDate">Data de Devolução *</label>
                <input
                  type="date"
                  id="returnDate"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.form}>
              <label htmlFor="purpose">Utilidade *</label>
              <select
                id="purpose"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                required
              >
                <option value="">Selecione a finalidade</option>
                <option value="TCC">TCC</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
                <option value="Projeto de Pesquisa">Projeto de Pesquisa</option>
                <option value="Uso em disciplina">Uso em disciplina</option>
                <option value="Consultoria/Serviços">Consultoria/Serviços</option>
                <option value="Curso">Curso</option>
              </select>
            </div>

            <div className={styles.form}>
              <label htmlFor="applicantName">Nome do Solicitante *</label>
              <input
                type="text"
                id="applicantName"
                value={formData.applicantName}
                onChange={(e) => handleInputChange('applicantName', e.target.value)}
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="agreement"
                checked={formData.agreementAccepted}
                onChange={(e) => handleInputChange('agreementAccepted', e.target.checked)}
                required
              />
              <label htmlFor="agreement">
                <strong>Estou de acordo em expressar agradecimentos ao LAIGA/CPGG pelo uso do(s) equipamento(s) utilizado(s) nos trabalhos apresentados *</strong>
              </label>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}