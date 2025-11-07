import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RepairRequest {
  nome: string;
  sobrenome: string;
  email: string;
  problemType: string;
  problemDescription: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, sobrenome, email, problemType, problemDescription }: RepairRequest = await req.json();
    
    console.log('Recebida solicitação de reparo:', { nome, sobrenome, email, problemType });

    // Determinar o email de destino baseado no tipo de problema
    const secretariaEmail = Deno.env.get("SECRETARIA_EMAIL");
    const tiEmail = Deno.env.get("TI_EMAIL");
    
    if (!secretariaEmail || !tiEmail) {
      console.error('Emails não configurados. SECRETARIA_EMAIL ou TI_EMAIL não encontrados.');
      throw new Error('Configuração de emails não encontrada');
    }

    const destinatario = problemType === 'infraestrutura' ? secretariaEmail : tiEmail;
    const departamento = problemType === 'infraestrutura' ? 'Secretaria' : 'T.I.';

    console.log(`Enviando email para ${departamento}: ${destinatario}`);

    const emailResponse = await resend.emails.send({
      from: "CPGG Reparos <onboarding@resend.dev>",
      to: [destinatario],
      subject: `Solicitação de Reparo - ${departamento}`,
      html: `
        <h2>Nova Solicitação de Reparo</h2>
        <p><strong>Solicitante:</strong> ${nome} ${sobrenome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo de Problema:</strong> ${problemType === 'infraestrutura' ? 'Problema de infraestrutura' : 'Problema de T.I.'}</p>
        <p><strong>Departamento:</strong> ${departamento}</p>
        <hr>
        <h3>Descrição do Problema:</h3>
        <p>${problemDescription}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Esta solicitação foi enviada automaticamente através do sistema de reservas do CPGG.</p>
      `,
    });

    console.log("Email enviado com sucesso:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erro ao enviar email de reparo:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
