import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.3'
import { Resend } from 'npm:resend@4.0.0'
import React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { ReservationEmail } from './_templates/reservation-email.tsx'

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

    // Buscar email do chefe do LAIGA
    console.log('Buscando informações do laboratório LAIGA...')
    const { data: labData, error: labError } = await supabase
      .from('laboratories')
      .select('chief_alternative_email, chief_name')
      .eq('acronym', 'LAIGA')
      .single()

    if (labError) {
      console.error('Erro ao buscar dados do laboratório:', labError)
    }

    const chiefEmail = labData?.chief_alternative_email || 'marquinhos.arv@gmail.com'
    const chiefName = labData?.chief_name || 'Prof. Marcos Alberto Rodrigues Vasconcelos'
    
    console.log('Email do chefe encontrado:', chiefEmail)

    // Preparar conteúdo do email
    const equipmentsList = reservationData.selectedEquipments.length > 0 
      ? reservationData.selectedEquipments.join(', ')
      : 'Nenhum equipamento da lista selecionado'

    const formattedWithdrawalDate = new Date(reservationData.withdrawalDate).toLocaleDateString('pt-BR')
    const formattedReturnDate = new Date(reservationData.returnDate).toLocaleDateString('pt-BR')

    // Gerar HTML do email usando React Email
    const emailHtml = await renderAsync(
      React.createElement(ReservationEmail, {
        applicantName: reservationData.applicantName,
        applicantEmail: reservationData.applicantEmail,
        equipmentsList,
        otherEquipment: reservationData.otherEquipment,
        peripherals: reservationData.peripherals,
        withdrawalDate: formattedWithdrawalDate,
        returnDate: formattedReturnDate,
        purpose: reservationData.purpose,
        reservationId: reservation.id,
      })
    )

    // Gerar PDF do comprovante
    const pdfContent = generatePDFContent(
      reservationData,
      reservation.id,
      equipmentsList,
      formattedWithdrawalDate,
      formattedReturnDate
    )

    // Enviar email para o chefe do laboratório LAIGA
    console.log(`Enviando email para o chefe do LAIGA: ${chiefEmail}...`)
    
    try {
      const emailResponse = await resend.emails.send({
        from: 'CPGG LAIGA <onboarding@resend.dev>',
        to: [chiefEmail],
        subject: `Nova Solicitação de Equipamentos LAIGA - ${reservationData.applicantName}`,
        html: emailHtml,
        reply_to: reservationData.applicantEmail,
        attachments: [
          {
            filename: `Comprovante_LAIGA_${reservation.id.substring(0, 8)}.pdf`,
            content: pdfContent,
          },
        ],
      })

      if (emailResponse.error) {
        console.error('Erro ao enviar email para o chefe:', emailResponse.error)
        throw emailResponse.error
      } else {
        console.log('Email enviado com sucesso para o chefe do LAIGA:', emailResponse.data)
      }
    } catch (emailError: any) {
      console.error('Falha no envio do email principal, tentando alternativas...', emailError)
      
      // Tentar enviar para a secretaria como backup
      try {
        console.log('Tentando enviar para secretaria.cpgg.ufba@gmail.com como backup...')
        const backupEmail = await resend.emails.send({
          from: 'CPGG LAIGA <onboarding@resend.dev>',
          to: ['secretaria.cpgg.ufba@gmail.com'],
          subject: `[BACKUP] Nova Solicitação LAIGA - Encaminhar para Prof. Marcos Vasconcelos`,
          html: `
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
              <strong>⚠️ AVISO:</strong> Este email foi redirecionado para a secretaria pois houve problema no envio direto para o chefe do laboratório.
              <br><strong>Destinatário original:</strong> ${chiefEmail} (${chiefName})
              <br><strong>Ação necessária:</strong> Por favor, encaminhe este email para o chefe do LAIGA.
            </div>
            ${emailHtml}
          `,
          reply_to: reservationData.applicantEmail,
          attachments: [
            {
              filename: `Comprovante_LAIGA_${reservation.id.substring(0, 8)}.pdf`,
              content: pdfContent,
            },
          ],
        })
        
        if (backupEmail.error) {
          console.error('Falha também no email de backup:', backupEmail.error)
        } else {
          console.log('Email de backup enviado com sucesso:', backupEmail.data)
        }
      } catch (backupError) {
        console.error('Erro total no envio de emails:', backupError)
      }
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

// Função auxiliar para gerar o PDF em base64
function generatePDFContent(
  reservationData: LaigaReservationRequest,
  reservationId: string,
  equipmentsList: string,
  withdrawalDate: string,
  returnDate: string
): string {
  // Conteúdo do PDF em HTML simples (será convertido pelo Resend)
  const pdfHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #592cbb; padding-bottom: 20px; }
    .header h1 { color: #592cbb; margin: 10px 0; font-size: 24px; }
    .header h2 { color: #666; margin: 5px 0; font-size: 16px; font-weight: normal; }
    .section { margin: 25px 0; }
    .section h3 { color: #592cbb; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px; }
    .section p { margin: 8px 0; line-height: 1.6; }
    .signatures { display: flex; justify-content: space-between; margin-top: 60px; }
    .signature-box { width: 45%; text-align: center; }
    .signature-line { border-top: 1px solid #333; margin: 80px 0 10px; }
    .report-area { border: 1px solid #ddd; min-height: 100px; padding: 10px; margin-top: 10px; background: #fafafa; }
    .report-lines { margin-top: 10px; }
    .report-lines div { border-bottom: 1px solid #ccc; height: 20px; margin-bottom: 8px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>COMPROVANTE DE SOLICITAÇÃO</h1>
    <h2>Laboratório Integrado de Geofísica Aplicada - LAIGA</h2>
    <h2>Centro de Pesquisa em Geofísica e Geologia - CPGG/UFBA</h2>
  </div>

  <div class="section">
    <h3>Dados do Solicitante</h3>
    <p><strong>Nome:</strong> ${reservationData.applicantName}</p>
    <p><strong>Email:</strong> ${reservationData.applicantEmail}</p>
  </div>

  <div class="section">
    <h3>Dados da Reserva</h3>
    <p><strong>Equipamentos da lista:</strong> ${equipmentsList}</p>
    ${reservationData.otherEquipment ? `<p><strong>Outros equipamentos:</strong> ${reservationData.otherEquipment}</p>` : ''}
    ${reservationData.peripherals ? `<p><strong>Periféricos:</strong> ${reservationData.peripherals}</p>` : ''}
    <p><strong>Data de Retirada:</strong> ${withdrawalDate}</p>
    <p><strong>Data de Devolução:</strong> ${returnDate}</p>
    <p><strong>Finalidade:</strong> ${reservationData.purpose}</p>
    <p><strong>Status:</strong> Aguardando aprovação</p>
  </div>

  <div class="section">
    <h3>Informações Adicionais</h3>
    <p><strong>Protocolo:</strong> ${reservationId}</p>
    <p><strong>Data da Solicitação:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
  </div>

  <div class="section">
    <h3>Reporte de Problemas ou Avarias</h3>
    <p><strong>Reporte problemas ou avarias que o equipamento reservado sofreu na devolução:</strong></p>
    <div class="report-area">
      <div class="report-lines">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>

  <div class="signatures">
    <div class="signature-box">
      <div class="signature-line"></div>
      <p>Assinatura do Solicitante</p>
      <p>${reservationData.applicantName}</p>
    </div>
    <div class="signature-box">
      <div class="signature-line"></div>
      <p>Assinatura do Técnico do LAIGA</p>
      <p>Michel Nascimento</p>
    </div>
  </div>

  <div class="footer">
    <p><strong>Importante:</strong> Esta solicitação foi enviada para análise do coordenador do LAIGA.</p>
    <p>Você receberá um retorno por e-mail sobre a aprovação da sua reserva.</p>
    <p><strong>Coordenador do LAIGA:</strong> Prof. Marcos Alberto Rodrigues Vasconcelos</p>
    <p><em>Laboratório Integrado de Geofísica Aplicada - LAIGA/CPGG/UFBA<br/>
    Campus Universitário de Ondina - Salvador/BA</em></p>
  </div>
</body>
</html>
  `
  
  // Converter HTML para base64 para anexar ao email
  return btoa(unescape(encodeURIComponent(pdfHtml)))
}

serve(handler)