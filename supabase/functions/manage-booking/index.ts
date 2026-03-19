import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const ADMIN_SECRET = Deno.env.get('ADMIN_SECRET')!;
const GUEST_SECRET = Deno.env.get('GUEST_SECRET') || '';
const OWNER_EMAIL = 'ahalyajena28@gmail.com';
const OWNER_NAME = 'Ayush Kumar Jena';
const SITE_URL = 'https://ayushkumarjena.in';

async function verifyOwnerToken(token: string): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { 'Authorization': `Bearer ${token}`, 'apikey': SUPABASE_ANON_KEY },
  });
  if (!res.ok) return false;
  const user = await res.json();
  return user?.email === OWNER_EMAIL;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Returns a simple HTML confirmation page for email button clicks
function htmlPage(badge: string, heading: string, description: string, color: string, emoji: string) {
  return new Response(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${badge}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #030303; color: #e5e5e5; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .container { position: relative; max-width: 480px; width: 100%; }
    .glow { position: absolute; inset: 0; background: radial-gradient(circle at center, ${color}33 0%, transparent 70%); filter: blur(40px); opacity: 0.6; z-index: 0; }
    .card { position: relative; z-index: 1; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 56px 40px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05); overflow: hidden; }
    .icon-wrapper { width: 80px; height: 80px; border-radius: 50%; background: ${color}15; border: 1px solid ${color}30; display: inline-flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto 32px; box-shadow: 0 0 30px ${color}20; }
    .badge { display: inline-block; background: ${color}15; border: 1px solid ${color}30; color: ${color}; font-size: 10px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 24px; }
    h1 { font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 16px; letter-spacing: -0.5px; line-height: 1.2; }
    p { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 8px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-size: 13px; font-weight: 700; transition: all 0.2s; margin-top: 32px; letter-spacing: 0.5px; }
    .btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
  </style>
</head>
<body>
  <div class="container">
    <div class="glow"></div>
    <div class="card">
      <div class="icon-wrapper">${emoji}</div>
      <div class="badge">${badge}</div>
      <h1>${heading}</h1>
      <p>${description}</p>
      <a href="${SITE_URL}/book?panel=true" class="btn">← View all bookings</a>
    </div>
  </div>
</body>
</html>`, { headers: { 'Content-Type': 'text/html' } });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // ── Handle GET requests from email action buttons ──────────────────────
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const bookingId = url.searchParams.get('bookingId');
    const action    = url.searchParams.get('action');
    const secret    = url.searchParams.get('secret');

    if (!secret || secret !== ADMIN_SECRET) {
      return htmlPage('Unauthorized', 'Action Denied', 'Invalid or expired secure link.', '#ef4444', '🔒');
    }
    if (!bookingId || !action || !['accepted', 'rejected', 'rescheduled'].includes(action)) {
      return htmlPage('Error', 'Invalid Request', 'The request could not be processed.', '#ef4444', '⚠️');
    }

    // Check if booking was already actioned
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/bookings?id=eq.${bookingId}&select=status`, {
      headers: { 'apikey': SUPABASE_SERVICE_ROLE_KEY, 'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` },
    });
    if (checkRes.ok) {
      const rows = await checkRes.json();
      const status = rows[0]?.status;
      if (status && status !== 'pending') {
        const statusLabels: Record<string, string> = { accepted: 'Confirmed', rejected: 'Declined', rescheduled: 'Rescheduled' };
        const statusColors: Record<string, string> = { accepted: '#22c55e', rejected: '#ef4444', rescheduled: '#3b82f6' };
        const statusEmojis: Record<string, string> = { accepted: '✅', rejected: '❌', rescheduled: '📅' };
        return htmlPage(
          'Already Responded',
          'Response Already Recorded',
          `Booking already ${statusLabels[status] ?? status}. No further action needed.`,
          statusColors[status] ?? '#888',
          statusEmojis[status] ?? 'ℹ️'
        );
      }
    }

    // Reuse the POST handler by forwarding as JSON internally
    const syntheticReq = new Request(req.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, action, adminSecret: secret }),
    });

    const result = await handleAction(syntheticReq);
    if (!result.ok) {
      return htmlPage('Error', 'Action Failed', 'Something went wrong processing your response. Try the admin panel.', '#ef4444', '⚠️');
    }

    const labels: Record<string, [string, string, string, string, string]> = {
      accepted:    ['Confirmed', 'Response Recorded!', 'Thank you! The booking has been successfully accepted and the guest has been notified via email.', '#22c55e', '✅'],
      rejected:    ['Declined',  'Response Recorded.', 'Thank you! The booking was declined and the guest has been notified.', '#ef4444', '❌'],
      rescheduled: ['Rescheduled', 'Response Recorded!', 'Thank you! The new time proposal has been sent to the guest.', '#3b82f6', '📅'],
    };
    const [badge, heading, desc, color, emoji] = labels[action];
    return htmlPage(badge, heading, desc, color, emoji);
  }

  return handleAction(req);
});

async function handleAction(req: Request): Promise<Response> {
  try {
    const { bookingId, action, adminSecret, ownerToken, rescheduleDate, rescheduleTime, ownerNotes } = await req.json();

    // Validate auth: accept either ADMIN_SECRET (email buttons) or ownerToken JWT (admin panel)
    let authorized = false;
    if (adminSecret && adminSecret === ADMIN_SECRET) authorized = true;
    if (!authorized && ownerToken) authorized = await verifyOwnerToken(ownerToken);
    if (!authorized) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!bookingId || !action) {
      return new Response(JSON.stringify({ error: 'Missing bookingId or action' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!['accepted', 'rejected', 'rescheduled'].includes(action)) {
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch the booking from Supabase
    const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/bookings?id=eq.${bookingId}`, {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!fetchRes.ok) {
      const err = await fetchRes.text();
      throw new Error(`Failed to fetch booking: ${err}`);
    }

    const bookings = await fetchRes.json();
    if (!bookings || bookings.length === 0) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const booking = bookings[0];

    // Build update payload
    const updatePayload: Record<string, unknown> = {
      status: action,
      updated_at: new Date().toISOString(),
    };
    if (ownerNotes) updatePayload.owner_notes = ownerNotes;
    if (action === 'rescheduled') {
      if (rescheduleDate) updatePayload.reschedule_date = rescheduleDate;
      if (rescheduleTime) updatePayload.reschedule_time_ist = rescheduleTime;
    }

    // Update booking in DB
    const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/bookings?id=eq.${bookingId}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(updatePayload),
    });

    if (!updateRes.ok) {
      const updateErr = await updateRes.text();
      throw new Error(`Failed to update booking: ${updateErr}`);
    }

    // Build guest email based on action
    let emailSubject = '';
    let emailHtml = '';
    const guestName = booking.name;
    const guestEmail = booking.email;

    if (action === 'accepted') {
      // ── Template #3: Accepted — Confirmed ──────────────────────────────
      emailSubject = `✅ Your call is confirmed! — ${booking.date} with ${OWNER_NAME}`;
      emailHtml = `<!DOCTYPE html>
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
  <div style="background:#071a0e;padding:56px 44px 48px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.05);">
    <div style="position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:360px;background:radial-gradient(ellipse,rgba(34,197,94,.22) 0%,transparent 65%);pointer-events:none;"></div>
    <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(34,197,94,.5),transparent);"></div>
    <div style="position:relative;display:block;width:80px;margin:0 auto 24px;">
      <img src="https://github.com/ayushkumarjena15.png" alt="${OWNER_NAME}" style="width:80px;height:80px;border-radius:50%;border:2.5px solid rgba(34,197,94,.35);display:block;margin:0 auto;background:#0a1a0e;" onerror="this.style.background='#0a1a0e'" />
      <div style="position:absolute;bottom:-2px;right:-2px;width:26px;height:26px;background:#22c55e;border-radius:50%;border:2.5px solid #071a0e;display:flex;align-items:center;justify-content:center;font-size:13px;color:#000;font-weight:900;">&#x2713;</div>
    </div>
    <div style="display:inline-block;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.22);color:#4ade80;font-size:9px;font-weight:900;letter-spacing:.45em;text-transform:uppercase;padding:7px 18px;border-radius:100px;margin-bottom:20px;">
      <span style="display:inline-block;width:5px;height:5px;background:#22c55e;border-radius:50%;margin-right:7px;vertical-align:middle;box-shadow:0 0 8px rgba(34,197,94,.9);"></span>Confirmed
    </div>
    <h1 style="font-size:34px;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;">Your call is confirmed!</h1>
    <p style="font-size:13px;color:rgba(255,255,255,.28);margin:0;">See you soon — this is going to be great.</p>
  </div>
  <!-- BODY -->
  <div style="padding:40px 44px;background:#111;">
    <p style="font-size:18px;font-weight:700;color:#f0f0f0;margin:0 0 10px;">Hey ${guestName},</p>
    <p style="font-size:14px;color:rgba(255,255,255,.38);line-height:1.8;margin:0 0 28px;">Great news! I've confirmed your booking. Looking forward to connecting. I'll send the Google Meet link closer to the time — keep an eye on your inbox.</p>
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Confirmed Booking<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(34,197,94,.04);border:1px solid rgba(34,197,94,.12);border-radius:16px;padding:20px 24px;margin-bottom:20px;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(34,197,94,.08);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Topic</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.topic}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(34,197,94,.08);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Date</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.date}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(34,197,94,.08);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">IST</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.time_ist} — India Standard Time</span></div>
      ${booking.time_local ? `<div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(34,197,94,.08);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Your Time</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.time_local} (${booking.timezone})</span></div>` : ''}
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Duration</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">30 min &middot; Google Meet</span></div>
    </div>
    <!-- Meet CTA -->
    <div style="background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.15);border-radius:16px;padding:26px 24px;margin-bottom:20px;text-align:center;">
      <div style="font-size:28px;margin-bottom:10px;">&#x1F4F9;</div>
      <p style="font-size:15px;font-weight:800;color:#fff;margin:0 0 6px;">Google Meet link coming soon</p>
      <p style="font-size:12px;color:rgba(255,255,255,.3);margin:0;line-height:1.6;">I'll send it before the call. Add to your calendar in the meantime.</p>
    </div>
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:16px 20px;margin-bottom:20px;font-size:13px;color:rgba(255,255,255,.28);line-height:1.7;">
      &#x1F44B; If anything comes up, just reply to this email and I'll sort it out.
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,.28);line-height:1.75;margin-top:8px;">Questions? <a href="mailto:${OWNER_EMAIL}" style="color:#60a5fa;text-decoration:none;">${OWNER_EMAIL}</a></p>
  </div>
  <div style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,.05);padding:22px 44px;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-size:11px;color:rgba(255,255,255,.16);display:flex;align-items:center;gap:8px;"><div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.6);"></div>${OWNER_NAME}</div>
    <div style="font-size:10px;"><a href="${SITE_URL}" style="color:rgba(255,255,255,.1);text-decoration:none;">ayushkumarjena.in</a></div>
  </div>
</div>
</body></html>`;

    } else if (action === 'rejected') {
      // ── Template #4: Rejected ──────────────────────────────────────────
      emailSubject = `Booking Update — Unable to accommodate this slot`;
      emailHtml = `<!DOCTYPE html>
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
  <div style="background:#130808;padding:56px 44px 48px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.05);">
    <div style="position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:360px;background:radial-gradient(ellipse,rgba(239,68,68,.18) 0%,transparent 65%);pointer-events:none;"></div>
    <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(239,68,68,.45),transparent);"></div>
    <div style="position:relative;display:block;width:80px;margin:0 auto 24px;">
      <img src="https://github.com/ayushkumarjena15.png" alt="${OWNER_NAME}" style="width:80px;height:80px;border-radius:50%;border:2.5px solid rgba(239,68,68,.2);display:block;margin:0 auto;background:#1a0808;" onerror="this.style.background='#1a0808'" />
    </div>
    <div style="display:inline-block;background:rgba(239,68,68,.09);border:1px solid rgba(239,68,68,.2);color:#f87171;font-size:9px;font-weight:900;letter-spacing:.45em;text-transform:uppercase;padding:7px 18px;border-radius:100px;margin-bottom:20px;">Unable to Accommodate</div>
    <h1 style="font-size:34px;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;">Sorry about this.</h1>
    <p style="font-size:13px;color:rgba(255,255,255,.28);margin:0;">I'm unable to accommodate this particular slot.</p>
  </div>
  <!-- BODY -->
  <div style="padding:40px 44px;background:#111;">
    <p style="font-size:18px;font-weight:700;color:#f0f0f0;margin:0 0 10px;">Hey ${guestName},</p>
    <p style="font-size:14px;color:rgba(255,255,255,.38);line-height:1.8;margin:0 0 28px;">Unfortunately I won't be able to make this call. I apologize for the inconvenience — I'd genuinely love to connect, so please feel free to book another slot.</p>
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Original Booking<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px 24px;margin-bottom:20px;opacity:.7;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Topic</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.topic}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Date</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.date}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">IST</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.time_ist} — India Standard Time</span></div>
    </div>
    ${ownerNotes ? `
    <div style="background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.14);border-radius:14px;padding:18px 22px;margin-bottom:20px;font-size:13px;color:rgba(255,255,255,.38);line-height:1.65;">
      <strong style="color:rgba(255,255,255,.5);">Note from ${OWNER_NAME}:</strong><br>${ownerNotes}
    </div>` : ''}
    <!-- Rebook CTA -->
    <div style="background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:26px 24px;margin-bottom:20px;text-align:center;">
      <p style="font-size:15px;font-weight:800;color:#fff;margin:0 0 6px;">Let's find another time</p>
      <p style="font-size:13px;color:rgba(255,255,255,.3);margin:0 0 18px;line-height:1.6;">My calendar is open — pick a slot that works for you.</p>
      <a href="${SITE_URL}/book" style="display:inline-block;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.28);color:#a5b4fc;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.2em;padding:12px 26px;border-radius:100px;text-decoration:none;">&#x1F4C5;&nbsp; Book a New Slot</a>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,.28);line-height:1.75;margin-top:8px;">Questions? <a href="mailto:${OWNER_EMAIL}" style="color:#60a5fa;text-decoration:none;">${OWNER_EMAIL}</a></p>
  </div>
  <div style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,.05);padding:22px 44px;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-size:11px;color:rgba(255,255,255,.16);display:flex;align-items:center;gap:8px;"><div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:#ef4444;"></div>${OWNER_NAME}</div>
    <div style="font-size:10px;"><a href="${SITE_URL}" style="color:rgba(255,255,255,.1);text-decoration:none;">ayushkumarjena.in</a></div>
  </div>
</div>
</body></html>`;

    } else if (action === 'rescheduled') {
      // ── Template #5: Rescheduled — guest receives with Accept/Reject ───
      emailSubject = `🔄 New time proposed for your call — Please confirm`;
      const guestRespondBase = `${SUPABASE_URL}/functions/v1/guest-respond`;
      const guestAcceptUrl = `${guestRespondBase}?bookingId=${bookingId}&action=accept&secret=${encodeURIComponent(GUEST_SECRET)}`;
      const guestRejectUrl = `${guestRespondBase}?bookingId=${bookingId}&action=reject&secret=${encodeURIComponent(GUEST_SECRET)}`;
      emailHtml = `<!DOCTYPE html>
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
  <div style="background:#07101e;padding:56px 44px 48px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.05);">
    <div style="position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:360px;background:radial-gradient(ellipse,rgba(59,130,246,.2) 0%,transparent 65%);pointer-events:none;"></div>
    <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(59,130,246,.5),transparent);"></div>
    <div style="position:relative;display:block;width:80px;margin:0 auto 24px;">
      <img src="https://github.com/ayushkumarjena15.png" alt="${OWNER_NAME}" style="width:80px;height:80px;border-radius:50%;border:2.5px solid rgba(59,130,246,.25);display:block;margin:0 auto;background:#080f1a;" onerror="this.style.background='#080f1a'" />
      <div style="position:absolute;bottom:-2px;right:-2px;width:26px;height:26px;background:#3b82f6;border-radius:50%;border:2.5px solid #07101e;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;font-weight:900;">&#x21BB;</div>
    </div>
    <div style="display:inline-block;background:rgba(59,130,246,.09);border:1px solid rgba(59,130,246,.2);color:#60a5fa;font-size:9px;font-weight:900;letter-spacing:.45em;text-transform:uppercase;padding:7px 18px;border-radius:100px;margin-bottom:20px;">Reschedule Proposed</div>
    <h1 style="font-size:34px;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;">New time proposed</h1>
    <p style="font-size:13px;color:rgba(255,255,255,.28);margin:0;">I'd like to suggest a different time for our call.</p>
  </div>
  <!-- BODY -->
  <div style="padding:40px 44px;background:#111;">
    <p style="font-size:18px;font-weight:700;color:#f0f0f0;margin:0 0 10px;">Hey ${guestName},</p>
    <p style="font-size:14px;color:rgba(255,255,255,.38);line-height:1.8;margin:0 0 28px;">The original slot doesn't quite work for me, but I'd love to still connect! I'm proposing a new time below — let me know if it works with a single click.</p>
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Original Request<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px 24px;margin-bottom:14px;opacity:.65;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Topic</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.topic}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Date</span><span style="font-size:14px;font-weight:600;color:rgba(255,255,255,.3);line-height:1.45;text-decoration:line-through;">${booking.date}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">IST</span><span style="font-size:14px;font-weight:600;color:rgba(255,255,255,.3);line-height:1.45;text-decoration:line-through;">${booking.time_ist}</span></div>
    </div>
    ${(rescheduleDate || rescheduleTime) ? `
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Proposed New Time<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(59,130,246,.06);border:1px solid rgba(59,130,246,.18);border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <div style="display:inline-block;background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.25);color:#60a5fa;font-size:8px;font-weight:900;letter-spacing:.3em;text-transform:uppercase;padding:3px 8px;border-radius:6px;margin-bottom:12px;">New Proposal</div>
      ${rescheduleDate ? `<div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(59,130,246,.1);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Date</span><span style="font-size:14px;font-weight:700;color:#93c5fd;line-height:1.45;">${rescheduleDate}</span></div>` : ''}
      ${rescheduleTime ? `<div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">IST</span><span style="font-size:14px;font-weight:700;color:#93c5fd;line-height:1.45;">${rescheduleTime} — India Standard Time</span></div>` : ''}
    </div>` : ''}
    ${ownerNotes ? `<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:16px 20px;margin-bottom:20px;font-size:13px;color:rgba(255,255,255,.28);line-height:1.7;"><strong style="color:rgba(255,255,255,.5);">Note from ${OWNER_NAME}:</strong><br>${ownerNotes}</div>` : ''}
    <!-- Guest response buttons -->
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 14px;display:flex;align-items:center;gap:10px;">Your Response<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td style="padding:0 5px 0 0;width:50%"><a href="${guestAcceptUrl}" style="display:block;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.22em;padding:16px 0;border-radius:12px;text-decoration:none;text-align:center;border:1px solid rgba(255,255,255,.1);">&#x2713;&nbsp; Works for me!</a></td>
        <td style="padding:0 0 0 5px;width:50%"><a href="${guestRejectUrl}" style="display:block;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.45);font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.22em;padding:16px 0;border-radius:12px;text-decoration:none;text-align:center;">&#x2717;&nbsp; Doesn't work</a></td>
      </tr>
    </table>
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:16px 20px;margin-bottom:20px;font-size:13px;color:rgba(255,255,255,.28);line-height:1.7;">
      &#x1F4AC; Click a button above — Ayush will be notified instantly. Can't make either? <a href="${SITE_URL}/book" style="color:#60a5fa;text-decoration:none;">Book a new slot</a>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,.28);line-height:1.75;margin-top:8px;">Questions? <a href="mailto:${OWNER_EMAIL}" style="color:#60a5fa;text-decoration:none;">${OWNER_EMAIL}</a></p>
  </div>
  <div style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,.05);padding:22px 44px;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-size:11px;color:rgba(255,255,255,.16);display:flex;align-items:center;gap:8px;"><div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:#3b82f6;"></div>${OWNER_NAME}</div>
    <div style="font-size:10px;"><a href="${SITE_URL}" style="color:rgba(255,255,255,.1);text-decoration:none;">ayushkumarjena.in</a></div>
  </div>
</div>
</body></html>`;
    }

    // Send email to guest via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${OWNER_NAME} <contact@ayushkumarjena.in>`,
        to: [guestEmail],
        reply_to: OWNER_EMAIL,
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!emailRes.ok) {
      const emailErr = await emailRes.text();
      console.error(`Resend guest email error: ${emailErr}`);
      // Don't fail the whole request — DB was already updated
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
}
