import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ADMIN_SECRET = Deno.env.get('ADMIN_SECRET') || '';
const OWNER_EMAIL = 'ahalyajena28@gmail.com';
const OWNER_NAME = 'Ayush Kumar Jena';
const SITE_URL = 'https://ayushkumarjena.in';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, topic, notes, guests, date, timeIST, timeLocal, timezone } = await req.json();

    const guestList = guests?.filter((g: string) => g.trim()).join(', ') || 'None';

    // ── Insert booking into Supabase using service role (bypasses RLS) ───
    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        name, email, topic,
        notes: notes || null,
        guests: guests?.filter((g: string) => g.trim()).length ? guests.filter((g: string) => g.trim()) : null,
        date,
        time_ist: timeIST,
        time_local: timeLocal,
        timezone,
        status: 'pending',
      }),
    });

    // Parse booking ID for action buttons
    let bookingId: string | null = null;
    if (dbRes.ok) {
      const inserted = await dbRes.json();
      bookingId = inserted[0]?.id || null;
    } else {
      const dbErr = await dbRes.text();
      console.error('DB insert failed:', dbErr);
    }

    // Build one-click action URLs
    const fnBase = `${SUPABASE_URL}/functions/v1/manage-booking`;
    const acceptUrl  = bookingId ? `${fnBase}?bookingId=${bookingId}&action=accepted&secret=${encodeURIComponent(ADMIN_SECRET)}` : '#';
    const rejectUrl  = bookingId ? `${fnBase}?bookingId=${bookingId}&action=rejected&secret=${encodeURIComponent(ADMIN_SECRET)}` : '#';
    const reschedUrl = `${SITE_URL}/book?panel=true`;

    // ── Email 1: Owner Notification (Template #1) ─────────────────────────
    const ownerEmailHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #030303; color: #e5e5e5; margin: 0; padding: 40px 16px; }
</style>
</head>
<body>
<div style="max-width:600px;margin:0 auto;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);box-shadow:0 0 0 1px #000,0 40px 100px rgba(0,0,0,.9);">
  <!-- HEADER -->
  <div style="background:#0b0b18;padding:56px 44px 48px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.05);">
    <div style="position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:360px;background:radial-gradient(ellipse,rgba(99,102,241,.22) 0%,transparent 65%);pointer-events:none;"></div>
    <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,.5),transparent);"></div>
    <div style="width:56px;height:56px;border-radius:50%;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.25);display:inline-flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:22px;">&#x1F4C5;</div>
    <div style="display:inline-block;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.22);color:#a5b4fc;font-size:9px;font-weight:900;letter-spacing:.45em;text-transform:uppercase;padding:7px 18px;border-radius:100px;margin-bottom:20px;">
      <span style="display:inline-block;width:5px;height:5px;background:#6366f1;border-radius:50%;margin-right:7px;vertical-align:middle;box-shadow:0 0 8px #6366f1;"></span>New Booking
    </div>
    <h1 style="font-size:34px;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;line-height:1.1;">New call request<br>just landed.</h1>
    <p style="font-size:13px;color:rgba(255,255,255,.28);margin:0;">Someone wants to connect — review below</p>
  </div>
  <!-- BODY -->
  <div style="padding:40px 44px;background:#111;">
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Requester<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px 24px;margin-bottom:16px;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">From</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${name}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Email</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${email}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Topic</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${topic}</span></div>
      ${notes ? `<div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Notes</span><span style="font-size:14px;font-weight:600;color:rgba(255,255,255,.4);line-height:1.45;font-size:13px;">${notes}</span></div>` : ''}
      ${guests?.filter((g: string) => g.trim()).length ? `<div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Guests</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${guestList}</span></div>` : ''}
    </div>
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Schedule<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(99,102,241,.05);border:1px solid rgba(99,102,241,.14);border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(99,102,241,.08);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Date</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${date}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(99,102,241,.08);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">IST</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${timeIST} — India Standard Time</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Their Time</span><span style="font-size:14px;font-weight:600;color:rgba(255,255,255,.4);line-height:1.45;">${timeLocal} — ${timezone}</span></div>
    </div>
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Quick Actions<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td style="padding:0 5px 0 0;width:50%"><a href="${acceptUrl}" style="display:block;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.22em;padding:16px 0;border-radius:12px;text-decoration:none;text-align:center;">&#x2713;&nbsp; Accept</a></td>
        <td style="padding:0 0 0 5px;width:50%"><a href="${rejectUrl}" style="display:block;background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.22em;padding:16px 0;border-radius:12px;text-decoration:none;text-align:center;">&#x2717;&nbsp; Reject</a></td>
      </tr>
    </table>
    <a href="${reschedUrl}" style="display:block;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.45);font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.22em;padding:15px 0;border-radius:12px;text-decoration:none;text-align:center;">&#x21BB;&nbsp; Suggest Different Time</a>
    <p style="font-size:11px;color:rgba(255,255,255,.15);margin-top:18px;line-height:1.7;">Accept / Reject update status instantly &middot; Submitted <span style="background:rgba(255,255,255,.05);padding:2px 6px;border-radius:4px;font-size:10px;">${new Date().toUTCString()}</span></p>
  </div>
  <div style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,.05);padding:22px 44px;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-size:11px;color:rgba(255,255,255,.16);display:flex;align-items:center;gap:8px;"><div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.6);"></div>${OWNER_NAME} &middot; Booking System</div>
    <div style="font-size:10px;"><a href="${SITE_URL}" style="color:rgba(255,255,255,.1);text-decoration:none;">ayushkumarjena.in</a></div>
  </div>
</div>
</body></html>`;

    // ── Email 2: Guest Confirmation (Template #2) ──────────────────────────
    const guestEmailHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #030303; color: #e5e5e5; margin: 0; padding: 40px 16px; }
</style>
</head>
<body>
<div style="max-width:600px;margin:0 auto;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);box-shadow:0 0 0 1px #000,0 40px 100px rgba(0,0,0,.9);">
  <!-- HEADER -->
  <div style="background:#080f0b;padding:56px 44px 48px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.05);">
    <div style="position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:360px;background:radial-gradient(ellipse,rgba(16,185,129,.2) 0%,transparent 65%);pointer-events:none;"></div>
    <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(16,185,129,.5),transparent);"></div>
    <div style="position:relative;display:block;width:80px;margin:0 auto 24px;">
      <img src="${SITE_URL}/profile.jpg" alt="${OWNER_NAME}" style="width:80px;height:80px;border-radius:50%;border:2.5px solid rgba(16,185,129,.3);display:block;margin:0 auto;background:#0a1a12;" onerror="this.style.background='#0a1a12'" />
      <div style="position:absolute;bottom:-2px;right:-2px;width:26px;height:26px;background:#10b981;border-radius:50%;border:2.5px solid #080f0b;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;font-weight:900;">&#x2713;</div>
    </div>
    <div style="display:inline-block;background:rgba(16,185,129,.09);border:1px solid rgba(16,185,129,.2);color:#34d399;font-size:9px;font-weight:900;letter-spacing:.45em;text-transform:uppercase;padding:7px 18px;border-radius:100px;margin-bottom:20px;">&#x2713;&nbsp; Booking Received</div>
    <h1 style="font-size:34px;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;">You're all set!</h1>
    <p style="font-size:13px;color:rgba(255,255,255,.28);margin:0;">Request received — I'll confirm within 24 hours.</p>
  </div>
  <!-- BODY -->
  <div style="padding:40px 44px;background:#111;">
    <p style="font-size:18px;font-weight:700;color:#f0f0f0;margin:0 0 10px;">Hey ${name},</p>
    <p style="font-size:14px;color:rgba(255,255,255,.38);line-height:1.8;margin:0 0 28px;">Thanks for reaching out! I've received your booking request and will review it within 24 hours. Once confirmed, you'll get another email with the Google Meet link.</p>
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Your Booking<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px 24px;margin-bottom:16px;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Topic</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${topic}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Date</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${date}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Your Time</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${timeLocal} — ${timezone}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">IST</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${timeIST} — India Standard Time</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Duration</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">30 min &middot; Google Meet</span></div>
    </div>
    <div style="background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.15);border-radius:14px;padding:18px 22px;margin-bottom:24px;">
      <p style="font-size:10px;font-weight:900;color:rgba(251,191,36,.7);text-transform:uppercase;letter-spacing:.2em;margin:0 0 6px;">&#x23F3; Pending Confirmation</p>
      <p style="font-size:13px;color:rgba(255,255,255,.3);line-height:1.65;margin:0;">Not yet confirmed. I'll review within 24 hrs — if the slot doesn't work I'll suggest another.</p>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,.28);line-height:1.75;margin-top:8px;">Questions? Reply to this email or reach out at <a href="mailto:${OWNER_EMAIL}" style="color:#60a5fa;text-decoration:none;">${OWNER_EMAIL}</a></p>
  </div>
  <div style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,.05);padding:22px 44px;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-size:11px;color:rgba(255,255,255,.16);display:flex;align-items:center;gap:8px;"><div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:#10b981;"></div>${OWNER_NAME}</div>
    <div style="font-size:10px;"><a href="${SITE_URL}" style="color:rgba(255,255,255,.1);text-decoration:none;">ayushkumarjena.in</a></div>
  </div>
</div>
</body></html>`;

    // ── Send owner notification email via Resend ────────────────────────
    const ownerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${OWNER_NAME} <contact@ayushkumarjena.in>`,
        to: [OWNER_EMAIL],
        reply_to: email,
        subject: `📅 New Call Request from ${name} — ${date}`,
        html: ownerEmailHtml,
      }),
    });

    if (!ownerRes.ok) {
      const ownerErr = await ownerRes.text();
      throw new Error(`Resend owner email error: ${ownerErr}`);
    }

    // ── Send confirmation email to the guest ─────────────────────────────
    const guestRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${OWNER_NAME} <contact@ayushkumarjena.in>`,
        to: [email],
        reply_to: OWNER_EMAIL,
        subject: `✅ Booking Received — ${date} with ${OWNER_NAME}`,
        html: guestEmailHtml,
      }),
    });

    if (!guestRes.ok) {
      const guestErr = await guestRes.text();
      // Log but don't fail — owner was already notified
      console.error(`Resend guest email error: ${guestErr}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
