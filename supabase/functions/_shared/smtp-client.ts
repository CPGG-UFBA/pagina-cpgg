import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string; // base64
    contentType?: string;
  }>;
}

interface EmailResult {
  success: boolean;
  error?: string;
}

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const smtpHost = Deno.env.get("SMTP_HOST");
  const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "587");
  const smtpUser = Deno.env.get("SMTP_USER");
  const smtpPassword = Deno.env.get("SMTP_PASSWORD");

  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.error("SMTP credentials not configured");
    return { success: false, error: "Credenciais SMTP não configuradas" };
  }

  console.log(`📧 Conectando ao servidor SMTP: ${smtpHost}:${smtpPort}`);

  try {
    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: smtpPort === 465,
        auth: {
          username: smtpUser,
          password: smtpPassword,
        },
      },
    });

    const toAddresses = Array.isArray(options.to) ? options.to : [options.to];

    console.log(`📧 Enviando email de ${smtpUser} para ${toAddresses.join(", ")}`);

    const emailConfig: any = {
      from: smtpUser,
      to: toAddresses,
      subject: options.subject,
      html: options.html,
    };

    if (options.replyTo) {
      emailConfig.replyTo = options.replyTo;
    }

    if (options.attachments && options.attachments.length > 0) {
      emailConfig.attachments = options.attachments.map((att) => ({
        filename: att.filename,
        content: Uint8Array.from(atob(att.content), (c) => c.charCodeAt(0)),
        contentType: att.contentType || "application/pdf",
      }));
    }

    await client.send(emailConfig);
    await client.close();

    console.log("✅ Email enviado com sucesso via SMTP");
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao enviar email via SMTP:", error);
    return { success: false, error: error.message };
  }
}
