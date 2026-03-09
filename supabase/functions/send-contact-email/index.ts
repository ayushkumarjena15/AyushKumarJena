import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const OWNER_EMAIL = 'ahalyajena28@gmail.com';
const OWNER_NAME = 'Ayush Kumar Jena';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            throw new Error('Missing required fields: name, email, message');
        }

        // ── Email to Ayush: New message notification ─────────────────────────
        const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: 'Inter', -apple-system, sans-serif; background: #0c0a09; color: #e5e5e5; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .badge { display: inline-block; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); color: #60a5fa; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 20px; }
  .title { font-size: 28px; font-weight: 900; color: #ffffff; margin: 0; letter-spacing: -0.5px; }
  .body { padding: 36px 40px; }
  .row { display: flex; gap: 12px; margin-bottom: 14px; }
  .label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.25); min-width: 70px; padding-top: 3px; }
  .value { font-size: 15px; font-weight: 600; color: #e5e5e5; }
  .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 24px 0; }
  .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px 24px; margin-bottom: 16px; }
  .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; font-size: 14px; line-height: 1.8; color: #d4d4d4; white-space: pre-wrap; }
  .footer { background: #0f0f0f; padding: 24px 40px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.15); letter-spacing: 0.05em; }
  .dot { display: inline-block; width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-right: 8px; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <div class="badge">✉️ New Message</div>
    <h1 class="title">Someone reached out!</h1>
  </div>
  <div class="body">
    <div class="card">
      <div class="row"><span class="label">From</span><span class="value">${name}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
    </div>
    <hr class="divider">
    <p style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.2); margin-bottom: 12px;">Message</p>
    <div class="message-box">${message}</div>
    <p style="font-size:13px; color:rgba(255,255,255,0.3); margin-top:24px; line-height:1.6;">
      Submitted: <code style="font-size:11px; color:rgba(255,255,255,0.2);">${new Date().toUTCString()}</code><br>
      Reply directly to this email to respond to ${name}.
    </p>
  </div>
  <div class="footer"><span class="dot"></span>${OWNER_NAME}'s Portfolio — Contact System</div>
</div>
</body></html>`;

        // ── Send email via Resend ────────────────────────────────────────────
        // Using onboarding@resend.dev (no custom domain verified)
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: `Portfolio Contact <onboarding@resend.dev>`,
                to: [OWNER_EMAIL],
                reply_to: email,
                subject: `✉️ New Message from ${name}`,
                html: emailHtml,
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Resend error: ${err}`);
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
