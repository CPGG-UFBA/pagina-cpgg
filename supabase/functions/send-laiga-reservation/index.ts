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
  applicantEmail?: string
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
        email: reservationData.applicantEmail || 'laiga@reservation.temp', // Usar email fornecido ou temporário
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
      from: 'LAIGA - CPGG <noreply@resend.dev>',
      to: ['marcos.vasconcelos@ufba.br'],
      subject: `Nova Solicitação de Equipamentos LAIGA - ${reservationData.applicantName}`,
      html: emailContent,
    })

    if (emailResponse.error) {
      console.error('Erro ao enviar email:', emailResponse.error)
      throw new Error(`Falha no envio do email: ${emailResponse.error.message}`)
    }

    console.log('Email enviado com sucesso:', emailResponse.data)

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