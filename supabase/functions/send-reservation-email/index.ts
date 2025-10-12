import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey || apiKey.trim() === "") {
    console.error("RESEND_API_KEY ausente ou inválida (vazia)");
    return new Response(
      JSON.stringify({ success: false, error: "RESEND_API_KEY não configurada nas Secrets do Supabase" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { nome, sobrenome, email, uso, inicio, termino, tipoReserva }: ReservationRequest = await req.json();

    console.log("Received reservation request", { nome, sobrenome, email, uso, inicio, termino, tipoReserva });

    // Salvar reserva no banco de dados
    const { data: reservationData, error: dbError } = await supabase
      .from('reservations')
      .insert({
        nome,
        sobrenome,
        email,
        uso,
        inicio: new Date(inicio).toISOString(),
        termino: new Date(termino).toISOString(),
        tipo_reserva: tipoReserva
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Erro ao salvar reserva no banco: ${dbError.message}`);
    }

    // Email da secretária (configurável)
    const secretariaEmail = "secretaria.cpgg.ufba@gmail.com";

    // Formatar datas
    const inicioFormatado = new Date(inicio).toLocaleString('pt-BR');
    const terminoFormatado = new Date(termino).toLocaleString('pt-BR');

    // Tipo de espaço
    const espacoNome = tipoReserva === 'auditorio' ? 'Auditório' : 'Sala de Reuniões';

    // Email para a secretária
    const emailSecretaria = await resend.emails.send({
      from: "CPGG <noreply@resend.dev>",
      to: [secretariaEmail],
      subject: `Nova Solicitação de Reserva - ${espacoNome}`,
      html: `
        <h2>Nova Solicitação de Reserva - ${espacoNome}</h2>
        <ul>
          <li><strong>Nome:</strong> ${nome} ${sobrenome}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>Espaço:</strong> ${espacoNome} do CPGG</li>
          <li><strong>Finalidade:</strong> ${uso}</li>
          <li><strong>Data/Hora de Início:</strong> ${inicioFormatado}</li>
          <li><strong>Data/Hora de Término:</strong> ${terminoFormatado}</li>
          <li><strong>Protocolo:</strong> ${reservationData.id}</li>
        </ul>
        <p>Entre em contato com o solicitante para confirmar a disponibilidade.</p>
      `,
    });

    if (emailSecretaria?.error) {
      console.error("Resend error (secretaria):", emailSecretaria.error);
      throw new Error(`Falha ao enviar email para secretaria: ${emailSecretaria.error.message ?? emailSecretaria.error}`);
    }

    console.log("Email sent to secretary and reservation saved:", { emailSecretaria, reservationId: reservationData.id });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Reserva salva e email enviado para secretaria",
        reservationId: reservationData.id
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
        error: error?.message ?? "Erro desconhecido ao processar reserva",
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