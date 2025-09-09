import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReservationRequest {
  nome: string;
  sobrenome: string;
  email: string;
  uso: string;
  inicio: string;
  termino: string;
  tipoReserva: string; // 'auditorio' ou 'sala_reuniao'
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, sobrenome, email, uso, inicio, termino, tipoReserva }: ReservationRequest = await req.json();

    // Email da secretária (configurável)
    const secretariaEmail = "secretaria@cpgg.com.br"; // Substituir pelo email real

    // Formatar datas
    const inicioFormatado = new Date(inicio).toLocaleString('pt-BR');
    const terminoFormatado = new Date(termino).toLocaleString('pt-BR');

    // Tipo de espaço
    const espacoNome = tipoReserva === 'auditorio' ? 'Auditório' : 'Sala de Reuniões';

    // Email para a secretária
    const emailSecretaria = await resend.emails.send({
      from: "CPGG <onboarding@resend.dev>",
      to: [secretariaEmail],
      subject: "Solicitação ao CPGG",
      html: `
        <h2>Nova Solicitação de Reserva - ${espacoNome}</h2>
        <ul>
          <li><strong>Nome:</strong> ${nome} ${sobrenome}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>Espaço:</strong> ${espacoNome} do CPGG</li>
          <li><strong>Finalidade:</strong> ${uso}</li>
          <li><strong>Data/Hora de Início:</strong> ${inicioFormatado}</li>
          <li><strong>Data/Hora de Término:</strong> ${terminoFormatado}</li>
        </ul>
        <p>Entre em contato com o solicitante para confirmar a disponibilidade.</p>
      `,
    });

    // Email de confirmação para o solicitante
    const emailSolicitante = await resend.emails.send({
      from: "CPGG <onboarding@resend.dev>",
      to: [email],
      subject: "Solicitação ao CPGG",
      html: `
        <p>Prezado ${nome},</p>
        <br>
        <p>Sua requisição foi enviada com sucesso. Em breve retornaremos o contato informando sobre a disponibilidade da reserva e seus respectivos detalhes.</p>
        <br>
        <p>Atenciosamente,</p>
        <br>
        <p>Secretaria do CPGG</p>
      `,
    });

    console.log("Emails sent successfully:", { emailSecretaria, emailSolicitante });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails enviados com sucesso" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error sending reservation emails:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);