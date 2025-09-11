import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../../integrations/supabase/client'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import styles from './Receipt.module.css'

interface Reservation {
  id: string
  nome: string
  sobrenome: string
  email: string
  uso: string
  inicio: string
  termino: string
  tipo_reserva: string
  status: string
  created_at: string
}

export function Receipt() {
  const [searchParams] = useSearchParams()
  const reservationId = searchParams.get('id')
  const [reservation, setReservation] = useState<Reservation | null>(null)
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSpaceName = (tipo: string) => {
    return tipo === 'auditorio' ? 'Auditório' : 'Sala de Reuniões'
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
            <h1>COMPROVANTE DE SOLICITAÇÃO</h1>
            <h2>Centro de Pesquisa em Geofísica e Geologia - CPGG/UFBA</h2>
          </div>

          <div className={styles.content}>
            <div className={styles.section}>
              <h3>Dados do Solicitante</h3>
              <p><strong>Nome:</strong> {reservation.nome} {reservation.sobrenome}</p>
              <p><strong>E-mail:</strong> {reservation.email}</p>
            </div>

            <div className={styles.section}>
              <h3>Dados da Reserva</h3>
              <p><strong>Espaço:</strong> {getSpaceName(reservation.tipo_reserva)} do CPGG</p>
              <p><strong>Finalidade:</strong> {reservation.uso}</p>
              <p><strong>Data/Hora Início:</strong> {formatDateTime(reservation.inicio)}</p>
              <p><strong>Data/Hora Término:</strong> {formatDateTime(reservation.termino)}</p>
              <p><strong>Status:</strong> {reservation.status === 'pendente' ? 'Aguardando aprovação' : reservation.status}</p>
            </div>

            <div className={styles.section}>
              <h3>Informações Adicionais</h3>
              <p><strong>Protocolo:</strong> {reservation.id}</p>
              <p><strong>Data da Solicitação:</strong> {formatDateTime(reservation.created_at)}</p>
            </div>

            <div className={styles.footer}>
              <p><strong>Importante:</strong> Esta solicitação foi enviada para análise da secretaria do CPGG. 
              Você receberá um retorno por e-mail sobre a aprovação da sua reserva.</p>
              <p><em>Centro de Pesquisa em Geofísica e Geologia - UFBA<br/>
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