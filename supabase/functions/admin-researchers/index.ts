import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...corsHeaders,
      ...(init.headers || {}),
    },
  });
}

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, action, id, name, data } = await req.json();

    if (!email || !password) {
      return json({ error: "Credenciais ausentes" }, { status: 400 });
    }

    // Validação de admin (secretaria ou coordenacao)
    const { data: admin, error: adminErr } = await supabase
      .from("admin_users")
      .select("id, role")
      .eq("email", email)
      .eq("password", password)
      .in("role", ["secretaria", "coordenacao"]) // papéis válidos
      .maybeSingle();

    if (adminErr || !admin) {
      return json({ error: "Não autorizado" }, { status: 401 });
    }

    if (action === "delete") {
      if (!id) return json({ error: "ID obrigatório" }, { status: 400 });

      const { error: delErr } = await supabase
        .from("researchers")
        .delete()
        .eq("id", id);

      if (delErr) return json({ error: delErr.message }, { status: 400 });
      return json({ ok: true });
    }

    if (action === "update") {
      if (!id || !name) return json({ error: "ID e nome são obrigatórios" }, { status: 400 });

      const { error: updErr } = await supabase
        .from("researchers")
        .update({ name })
        .eq("id", id);

      if (updErr) return json({ error: updErr.message }, { status: 400 });
      return json({ ok: true });
    }

    if (action === "restore") {
      if (!data) return json({ error: "Dados obrigatórios" }, { status: 400 });

      const researcherData = data;
      const { error: insertErr } = await supabase
        .from("researchers")
        .insert({
          id: researcherData.id,
          name: researcherData.name,
          email: researcherData.email,
          program: researcherData.program,
          description: researcherData.description,
          lattes_link: researcherData.lattes_link
        });

      if (insertErr) return json({ error: insertErr.message }, { status: 400 });
      return json({ ok: true });
    }

    return json({ error: "Ação inválida" }, { status: 400 });
  } catch (e) {
    return json({ error: String(e) }, { status: 500 });
  }
});
