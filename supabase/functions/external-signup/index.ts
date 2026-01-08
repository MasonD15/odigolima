import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ExternalSignupRequest {
  name: string;
  email: string;
  inviteCode: string;
  plan?: "free" | "tier_1" | "tier_2" | "tier_3" | "enterprise";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, inviteCode, plan = "free" }: ExternalSignupRequest = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!inviteCode) {
      return new Response(JSON.stringify({ error: "Invite code is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify invite code
    const betaInviteCode = Deno.env.get("BETA_INVITE_CODE");
    if (!betaInviteCode) {
      console.error("BETA_INVITE_CODE is not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (inviteCode.trim() !== betaInviteCode.trim()) {
      console.log(`Invalid invite code attempt for: ${email}`);
      return new Response(JSON.stringify({ error: "Invalid invite code" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("EXTERNAL_SIGNUP_API_KEY");
    const anonKey = Deno.env.get("ADORCH_SUPABASE_ANON_KEY");

    if (!apiKey) {
      console.error("EXTERNAL_SIGNUP_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!anonKey) {
      console.error("ADORCH_SUPABASE_ANON_KEY is not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Calling external signup API for: ${email}`);

    const response = await fetch("https://tnxdhrjfpmrvajvlejjv.supabase.co/functions/v1/external-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": anonKey,
        "Authorization": `Bearer ${anonKey}`,
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ name, email, plan }),
    });

    const data = await response.json();
    console.log(`External signup response for ${email}:`, data);

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in external-signup function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);
