import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.3'
import { Resend } from 'npm:resend@4.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LaigaReservationRequest {
  selectedEquipments: string[]
  otherEquipment: string
  peripherals: string
  withdrawalDate: string
  returnDate: string
  purpose: string
  applicantName: string
  applicantEmail: string
  agreementAccepted: boolean
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  try {
    console.log('Iniciando processamento da solicitação LAIGA...')
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const resendApiKey = Deno.env.get('RESEND_API_KEY')!

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY não configurado')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
    const resend = new Resend(resendApiKey)

    const reservationData: LaigaReservationRequest = await req.json()
    console.log('Dados recebidos:', JSON.stringify(reservationData, null, 2))

    // Salvar no banco de dados (adaptando a tabela existente)
    console.log('Salvando no banco de dados...')
    const { data: reservation, error: dbError } = await supabase
      .from('reservations')
      .insert({
        nome: reservationData.applicantName,
        sobrenome: '', // Campo obrigatório mas não usado neste formulário
        email: reservationData.applicantEmail,
        uso: `${reservationData.purpose} - Equipamentos: ${reservationData.selectedEquipments.join(', ')}${reservationData.otherEquipment ? `, ${reservationData.otherEquipment}` : ''}`,
        inicio: new Date(reservationData.withdrawalDate).toISOString(),
        termino: new Date(reservationData.returnDate).toISOString(),
        tipo_reserva: 'laiga_equipments'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Erro no banco de dados:', dbError)
      throw new Error(`Erro no banco de dados: ${dbError.message}`)
    }

    console.log('Reserva salva com sucesso:', reservation.id)

    // Preparar conteúdo do email
    const equipmentsList = reservationData.selectedEquipments.length > 0 
      ? reservationData.selectedEquipments.join(', ')
      : 'Nenhum equipamento da lista selecionado'

    const emailContent = `
      <h2>Nova Solicitação de Reserva de Equipamentos - LAIGA</h2>
      
      <h3>Dados do Solicitante:</h3>
      <p><strong>Nome:</strong> ${reservationData.applicantName}</p>
      <p><strong>Email:</strong> ${reservationData.applicantEmail}</p>
      
      <h3>Equipamentos Solicitados:</h3>
      <p><strong>Da lista:</strong> ${equipmentsList}</p>
      ${reservationData.otherEquipment ? `<p><strong>Outros equipamentos:</strong> ${reservationData.otherEquipment}</p>` : ''}
      ${reservationData.peripherals ? `<p><strong>Periféricos adicionais:</strong> ${reservationData.peripherals}</p>` : ''}
      
      <h3>Período de Uso:</h3>
      <p><strong>Data de Retirada:</strong> ${new Date(reservationData.withdrawalDate).toLocaleDateString('pt-BR')}</p>
      <p><strong>Data de Devolução:</strong> ${new Date(reservationData.returnDate).toLocaleDateString('pt-BR')}</p>
      
      <h3>Finalidade:</h3>
      <p>${reservationData.purpose}</p>
      
      <h3>Termo de Agradecimentos:</h3>
      <p>✅ O solicitante concordou em expressar agradecimentos ao LAIGA/CPGG nos trabalhos apresentados.</p>
      
      <hr>
      <p><strong>Protocolo:</strong> ${reservation.id}</p>
      <p><strong>Data da Solicitação:</strong> ${new Date().toLocaleString('pt-BR')}</p>
    `

    // Enviar email para o coordenador
    console.log('Enviando email para marcos.vasconcelos@ufba.br...')
    const emailResponse = await resend.emails.send({
      from: 'CPGG <noreply@resend.dev>',
      to: ['marcos.vasconcelos@ufba.br'],
      subject: `Nova Solicitação de Equipamentos LAIGA - ${reservationData.applicantName}`,
      html: emailContent,
    })

    if (emailResponse.error) {
      console.error('Erro ao enviar email:', emailResponse.error)
      // Fallback: Resend bloqueia envios para outros destinatários sem domínio verificado (403)
      // Envia para o e-mail permitido da conta para que a Secretaria encaminhe ao coordenador
      // Mensagem de erro típica: "You can only send testing emails to your own email address (...)."
      if ((emailResponse.error as any).statusCode === 403) {
        console.log('Tentando fallback para secretaria.cpgg.ufba@gmail.com devido a domínio não verificado...')
        const fallback = await resend.emails.send({
          from: 'CPGG <noreply@resend.dev>',
          to: ['secretaria.cpgg.ufba@gmail.com'],
          subject: 'FWD: Nova Solicitação de Equipamentos LAIGA (destinatário original: marcos.vasconcelos@ufba.br)',
          html: `
            <p><strong>Aviso:</strong> O domínio do remetente ainda não está verificado na Resend, por isso o email foi redirecionado para este endereço.</p>
            <p><strong>Destinatário pretendido:</strong> marcos.vasconcelos@ufba.br</p>
            ${emailContent}
          `,
          reply_to: reservationData.applicantEmail,
        })
        if (fallback.error) {
          console.error('Falha também no fallback:', fallback.error)
        } else {
          console.log('Fallback enviado com sucesso:', fallback.data)
        }
      }
      // Não falhar a requisição por causa do email
    } else {
      console.log('Email enviado com sucesso:', emailResponse.data)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        reservationId: reservation.id,
        message: 'Solicitação enviada com sucesso!' 
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    )

  } catch (error) {
    console.error('Erro na função send-laiga-reservation:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    )
  }
}

serve(handler)