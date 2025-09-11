import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../../../integrations/supabase/client'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import styles from './LaigaReceipt.module.css'
import laigaLogo from '../../../../assets/earth-labs.png'

interface LaigaReservation {
  id: string
  nome: string
  uso: string
  inicio: string
  termino: string
  status: string
  created_at: string
}

export function LaigaReceipt() {
  const [searchParams] = useSearchParams()
  const reservationId = searchParams.get('id')
  const [reservation, setReservation] = useState<LaigaReservation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (reservationId) {
      fetchReservation()
    }
  }, [reservationId])

  const fetchReservation = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('id', reservationId)
        .single()

      if (error) throw error
      setReservation(data)
    } catch (error) {
      console.error('Erro ao buscar reserva:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <p>Carregando comprovante...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (!reservation) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <h1>Comprovante não encontrado</h1>
          <p>Não foi possível encontrar os dados da reserva.</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.receipt}>
          <div className={styles.header}>
            <img src={laigaLogo} alt="Logo LAIGA" className={styles.logo} />
            <h1>COMPROVANTE DE SOLICITAÇÃO</h1>
            <h2>Laboratório Integrado de Geofísica Aplicada - LAIGA</h2>
            <h3>Centro de Pesquisa em Geofísica e Geologia - CPGG/UFBA</h3>
          </div>

          <div className={styles.content}>
            <div className={styles.section}>
              <h3>Dados do Solicitante</h3>
              <p><strong>Nome:</strong> {reservation.nome}</p>
            </div>

            <div className={styles.section}>
              <h3>Dados da Reserva</h3>
              <p><strong>Equipamentos/Finalidade:</strong> {reservation.uso}</p>
              <p><strong>Data de Retirada:</strong> {formatDate(reservation.inicio)}</p>
              <p><strong>Data de Devolução:</strong> {formatDate(reservation.termino)}</p>
              <p><strong>Status:</strong> {reservation.status === 'pendente' ? 'Aguardando aprovação' : reservation.status}</p>
            </div>

            <div className={styles.section}>
              <h3>Informações Adicionais</h3>
              <p><strong>Protocolo:</strong> {reservation.id}</p>
              <p><strong>Data da Solicitação:</strong> {formatDate(reservation.created_at)}</p>
            </div>

            <div className={styles.section}>
              <h3>Reporte de Problemas ou Avarias</h3>
              <p><strong>Reporte problemas ou avarias que o equipamento reservado sofreu na devolução:</strong></p>
              <div style={{ 
                border: '1px solid #ddd', 
                minHeight: '80px', 
                marginTop: '10px',
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '10px'
              }}>
                <div style={{ borderBottom: '1px solid #ccc', height: '20px', marginBottom: '8px' }}></div>
                <div style={{ borderBottom: '1px solid #ccc', height: '20px', marginBottom: '8px' }}></div>
                <div style={{ borderBottom: '1px solid #ccc', height: '20px', marginBottom: '8px' }}></div>
                <div style={{ borderBottom: '1px solid #ccc', height: '20px', marginBottom: '8px' }}></div>
              </div>
            </div>

            <div className={styles.signatures}>
              <div className={styles.signatureBox}>
                <div className={styles.signatureLine}></div>
                <p>Assinatura do Solicitante</p>
                <p>{reservation.nome}</p>
              </div>
              
              <div className={styles.signatureBox}>
                <div className={styles.signatureLine}></div>
                <p>Assinatura do Técnico do LAIGA</p>
                <p>Michel Nascimento</p>
              </div>
            </div>

            <div className={styles.footer}>
              <p><strong>Data da Solicitação:</strong> {formatDate(reservation.created_at)}</p>
              <p><strong>Importante:</strong> Esta solicitação foi enviada para análise do coordenador do LAIGA. 
              Você receberá um retorno por e-mail sobre a aprovação da sua reserva.</p>
              <p><strong>Coordenador do LAIGA:</strong> Prof. Marcos Alberto Rodrigues Vasconcelos</p>
              <p><em>Laboratório Integrado de Geofísica Aplicada - LAIGA/CPGG/UFBA<br/>
              Campus Universitário de Ondina - Salvador/BA</em></p>
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={handlePrint} className={styles.printButton}>
              🖨️ Imprimir Comprovante
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}