import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const ADMIN_SECRET = Deno.env.get('ADMIN_SECRET')!;
const OWNER_EMAIL = 'ahalyajena28@gmail.com';

async function verifyOwnerToken(token: string): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { 'Authorization': `Bearer ${token}`, 'apikey': SUPABASE_ANON_KEY },
  });
  if (!res.ok) return false;
  const user = await res.json();
  return user?.email === OWNER_EMAIL;
}
const OWNER_NAME = 'Ayush Kumar Jena';
const SITE_URL = 'https://ayushkumarjena.in';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const emailStyles = `
  body { font-family: 'Inter', -apple-system, sans-serif; background: #0c0a09; color: #e5e5e5; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; }
  .header { padding: 48px 40px; text-align: center; }
  .badge { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 16px; }
  .title { font-size: 30px; font-weight: 900; color: #ffffff; margin: 0 0 8px; letter-spacing: -0.5px; }
  .subtitle { font-size: 15px; color: rgba(255,255,255,0.4); margin: 0; }
  .body { padding: 40px; }
  .greeting { font-size: 17px; color: #e5e5e5; font-weight: 600; margin-bottom: 12px; }
  .para { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.7; margin-bottom: 28px; }
  .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
  .card-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.2); margin-bottom: 16px; }
  .row { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start; }
  .row:last-child { margin-bottom: 0; }
  .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.2); min-width: 80px; padding-top: 2px; }
  .value { font-size: 14px; font-weight: 600; color: #d4d4d4; }
  .notice { border-radius: 12px; padding: 16px 20px; font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 24px; }
  .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
  .cta-btn { display: inline-block; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin-top: 8px; }
  .footer { background: #0f0f0f; padding: 24px 40px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.15); letter-spacing: 0.05em; line-height: 1.8; }
  a { color: #60a5fa; text-decoration: none; }
`;

// Returns a simple HTML confirmation page for email button clicks
function htmlPage(title: string, message: string, color: string, emoji: string) {
  return new Response(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,sans-serif;background:#0c0a09;color:#e5e5e5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}
.card{background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:48px 40px;max-width:480px;width:100%;text-align:center;}
.emoji{font-size:56px;margin-bottom:24px;}
.badge{display:inline-block;background:${color}22;border:1px solid ${color}44;color:${color};font-size:10px;font-weight:800;letter-spacing:0.3em;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:20px;}
h1{font-size:26px;font-weight:900;color:#fff;margin-bottom:12px;letter-spacing:-0.5px;}
p{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.7;}
a{color:#60a5fa;text-decoration:none;margin-top:24px;display:inline-block;font-size:13px;}</style></head>
<body><div class="card"><div class="emoji">${emoji}</div><div class="badge">${title}</div><h1>${message}</h1>
<p>The booking status has been updated and the guest has been notified by email.</p>
<a href="${SITE_URL}/book?panel=true">← View all bookings</a></div></body></html>`,
    { headers: { 'Content-Type': 'text/html' } });
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
      return htmlPage('Unauthorized', 'Invalid or expired link.', '#ef4444', '🔒');
    }
    if (!bookingId || !action || !['accepted', 'rejected', 'rescheduled'].includes(action)) {
      return htmlPage('Error', 'Invalid request.', '#ef4444', '⚠️');
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
          `Booking already ${statusLabels[status] ?? status}.`,
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
      return htmlPage('Error', 'Something went wrong. Try the admin panel.', '#ef4444', '⚠️');
    }

    const labels: Record<string, [string, string, string, string]> = {
      accepted:    ['Confirmed', 'Booking accepted!', '#22c55e', '✅'],
      rejected:    ['Declined',  'Booking rejected.',  '#ef4444', '❌'],
      rescheduled: ['Rescheduled', 'Reschedule sent!', '#3b82f6', '📅'],
    };
    const [badge, msg, color, emoji] = labels[action];
    return htmlPage(badge, msg, color, emoji);
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
      emailSubject = `Your call is confirmed! — ${booking.date} with ${OWNER_NAME}`;
      emailHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>${emailStyles}</style></head>
<body>
<div class="container">
  <div class="header" style="background: linear-gradient(135deg, #052e16 0%, #14532d 100%);">
    <img src="${SITE_URL}/profile.jpg" alt="${OWNER_NAME}" style="width:72px;height:72px;border-radius:50%;border:2px solid rgba(255,255,255,0.15);margin:0 auto 20px;display:block;" />
    <div class="badge" style="background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);color:#4ade80;">Confirmed</div>
    <h1 class="title">Your call is confirmed!</h1>
    <p class="subtitle">See you soon — this is going to be great.</p>
  </div>
  <div class="body">
    <p class="greeting">Hey ${guestName},</p>
    <p class="para">
      Great news! I've confirmed your booking. Looking forward to connecting with you.
      I'll send over the Google Meet link closer to the time — keep an eye on your inbox.
    </p>
    <div class="card">
      <div class="card-label">Confirmed Booking</div>
      <div class="row"><span class="label">Topic</span><span class="value">${booking.topic}</span></div>
      <div class="row"><span class="label">Date</span><span class="value">${booking.date}</span></div>
      <div class="row"><span class="label">Time (IST)</span><span class="value">${booking.time_ist}</span></div>
      ${booking.time_local ? `<div class="row"><span class="label">Your Time</span><span class="value">${booking.time_local} (${booking.timezone})</span></div>` : ''}
      <div class="row"><span class="label">Duration</span><span class="value">30 minutes · Google Meet</span></div>
    </div>
    <div class="notice" style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.15);">
      See you soon! If anything comes up and you need to reschedule, just reply to this email.
    </div>
    <hr class="divider">
    <p class="para" style="margin:0;font-size:13px;">
      Questions? Reply to this email or reach out at <a href="mailto:${OWNER_EMAIL}">${OWNER_EMAIL}</a>.
    </p>
  </div>
  <div class="footer">
    <strong style="color:rgba(255,255,255,0.3)">${OWNER_NAME}</strong><br>
    <a href="${SITE_URL}">${SITE_URL}</a><br><br>
    You received this because you submitted a booking request on my portfolio.
  </div>
</div>
</body></html>`;
    } else if (action === 'rejected') {
      emailSubject = `Booking Update — Unable to accommodate this slot`;
      emailHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>${emailStyles}</style></head>
<body>
<div class="container">
  <div class="header" style="background: linear-gradient(135deg, #1c0a0a 0%, #3b0f0f 100%);">
    <img src="${SITE_URL}/profile.jpg" alt="${OWNER_NAME}" style="width:72px;height:72px;border-radius:50%;border:2px solid rgba(255,255,255,0.15);margin:0 auto 20px;display:block;" />
    <div class="badge" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#f87171;">Unable to Accommodate</div>
    <h1 class="title">Sorry about this</h1>
    <p class="subtitle">I'm unable to accommodate this particular slot.</p>
  </div>
  <div class="body">
    <p class="greeting">Hey ${guestName},</p>
    <p class="para">
      Unfortunately I won't be able to make it to the call you requested. I apologize for any inconvenience.
      I'd love to connect — please feel free to book another slot that might work better.
    </p>
    <div class="card">
      <div class="card-label">Booking Details</div>
      <div class="row"><span class="label">Topic</span><span class="value">${booking.topic}</span></div>
      <div class="row"><span class="label">Date</span><span class="value">${booking.date}</span></div>
      <div class="row"><span class="label">Time (IST)</span><span class="value">${booking.time_ist}</span></div>
    </div>
    ${ownerNotes ? `
    <div class="notice" style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15);">
      <strong style="color:rgba(255,255,255,0.5)">Note from ${OWNER_NAME}:</strong><br>
      ${ownerNotes}
    </div>` : ''}
    <div class="notice" style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.15);">
      Would you like to find another time? You can book a new slot at <a href="${SITE_URL}/book">${SITE_URL}/book</a>
    </div>
    <hr class="divider">
    <p class="para" style="margin:0;font-size:13px;">
      Questions? Reply to this email or reach out at <a href="mailto:${OWNER_EMAIL}">${OWNER_EMAIL}</a>.
    </p>
  </div>
  <div class="footer">
    <strong style="color:rgba(255,255,255,0.3)">${OWNER_NAME}</strong><br>
    <a href="${SITE_URL}">${SITE_URL}</a><br><br>
    You received this because you submitted a booking request on my portfolio.
  </div>
</div>
</body></html>`;
    } else if (action === 'rescheduled') {
      emailSubject = `New time proposed for your call — Please confirm`;
      emailHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>${emailStyles}</style></head>
<body>
<div class="container">
  <div class="header" style="background: linear-gradient(135deg, #0c1a3b 0%, #1e3a6e 100%);">
    <img src="${SITE_URL}/profile.jpg" alt="${OWNER_NAME}" style="width:72px;height:72px;border-radius:50%;border:2px solid rgba(255,255,255,0.15);margin:0 auto 20px;display:block;" />
    <div class="badge" style="background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;">Reschedule Proposed</div>
    <h1 class="title">New time proposed</h1>
    <p class="subtitle">I'd like to suggest a different time for our call.</p>
  </div>
  <div class="body">
    <p class="greeting">Hey ${guestName},</p>
    <p class="para">
      The original slot doesn't quite work for me, but I'd love to still connect!
      I'm proposing a new time below — please let me know if this works for you, or feel free to book a different slot.
    </p>
    <div class="card">
      <div class="card-label">Original Request</div>
      <div class="row"><span class="label">Topic</span><span class="value">${booking.topic}</span></div>
      <div class="row"><span class="label">Date</span><span class="value">${booking.date}</span></div>
      <div class="row"><span class="label">Time (IST)</span><span class="value">${booking.time_ist}</span></div>
    </div>
    ${(rescheduleDate || rescheduleTime) ? `
    <div class="card" style="border-color:rgba(59,130,246,0.2);background:rgba(59,130,246,0.05);">
      <div class="card-label" style="color:rgba(96,165,250,0.6);">Proposed New Time</div>
      ${rescheduleDate ? `<div class="row"><span class="label">New Date</span><span class="value" style="color:#93c5fd;">${rescheduleDate}</span></div>` : ''}
      ${rescheduleTime ? `<div class="row"><span class="label">New Time (IST)</span><span class="value" style="color:#93c5fd;">${rescheduleTime}</span></div>` : ''}
    </div>` : ''}
    ${ownerNotes ? `
    <div class="notice" style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.15);">
      <strong style="color:rgba(255,255,255,0.5)">Note from ${OWNER_NAME}:</strong><br>
      ${ownerNotes}
    </div>` : ''}
    <div class="notice" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
      If this new time works, please reply to confirm. If not, you can book any available slot at
      <a href="${SITE_URL}/book">${SITE_URL}/book</a>
    </div>
    <hr class="divider">
    <p class="para" style="margin:0;font-size:13px;">
      Questions? Reply to this email or reach out at <a href="mailto:${OWNER_EMAIL}">${OWNER_EMAIL}</a>.
    </p>
  </div>
  <div class="footer">
    <strong style="color:rgba(255,255,255,0.3)">${OWNER_NAME}</strong><br>
    <a href="${SITE_URL}">${SITE_URL}</a><br><br>
    You received this because you submitted a booking request on my portfolio.
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
