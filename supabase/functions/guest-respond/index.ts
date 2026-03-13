import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY           = Deno.env.get('RESEND_API_KEY')!;
const SUPABASE_URL             = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const GUEST_SECRET             = Deno.env.get('GUEST_SECRET') || '';
const OWNER_EMAIL              = 'ahalyajena28@gmail.com';
const OWNER_NAME               = 'Ayush Kumar Jena';
const SITE_URL                 = 'https://ayushkumarjena.in';

function htmlPage(title: string, headline: string, sub: string, color: string, emoji: string) {
  return new Response(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,sans-serif;background:#080808;color:#e5e5e5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}
.card{background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:52px 40px;max-width:480px;width:100%;text-align:center;}
.emoji{font-size:52px;margin-bottom:22px;display:block;}
.badge{display:inline-block;background:${color}18;border:1px solid ${color}35;color:${color};font-size:10px;font-weight:800;letter-spacing:0.3em;text-transform:uppercase;padding:6px 16px;border-radius:100px;margin-bottom:20px;}
h1{font-size:26px;font-weight:900;color:#fff;margin-bottom:10px;letter-spacing:-0.5px;}
p{font-size:14px;color:rgba(255,255,255,0.35);line-height:1.7;margin-bottom:24px;}
a{display:inline-block;color:rgba(255,255,255,0.25);text-decoration:none;font-size:12px;border:1px solid rgba(255,255,255,0.08);padding:10px 20px;border-radius:10px;}</style></head>
<body><div class="card"><span class="emoji">${emoji}</span><div class="badge">${title}</div><h1>${headline}</h1><p>${sub}</p>
<a href="${SITE_URL}">← Back to portfolio</a></div></body></html>`,
    { headers: { 'Content-Type': 'text/html' } });
}

serve(async (req) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url       = new URL(req.url);
  const bookingId = url.searchParams.get('bookingId');
  const action    = url.searchParams.get('action');   // 'accept' | 'reject'
  const secret    = url.searchParams.get('secret');

  // Validate secret
  if (!secret || secret !== GUEST_SECRET) {
    return htmlPage('Unauthorized', 'Invalid or expired link.', 'This link is no longer valid. Please contact Ayush directly.', '#ef4444', '🔒');
  }

  if (!bookingId || !['accept', 'reject'].includes(action ?? '')) {
    return htmlPage('Error', 'Invalid request.', 'Something looks wrong with this link.', '#ef4444', '⚠️');
  }

  // Fetch the booking
  const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/bookings?id=eq.${bookingId}`, {
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });

  if (!fetchRes.ok) {
    return htmlPage('Error', 'Booking not found.', 'We could not locate this booking.', '#ef4444', '⚠️');
  }

  const bookings = await fetchRes.json();
  if (!bookings?.length) {
    return htmlPage('Error', 'Booking not found.', 'We could not locate this booking.', '#ef4444', '⚠️');
  }

  const booking = bookings[0];

  // Guard: only allow response to a rescheduled booking
  if (booking.status !== 'rescheduled') {
    const labels: Record<string, string> = {
      guest_confirmed: 'Already Confirmed', guest_rejected_reschedule: 'Already Rejected',
      accepted: 'Already Confirmed', rejected: 'Already Declined',
    };
    return htmlPage(
      labels[booking.status] ?? 'Already Responded',
      'You already responded.',
      'This booking has already been updated. No further action needed.',
      '#6366f1', 'ℹ️'
    );
  }

  const newStatus = action === 'accept' ? 'guest_confirmed' : 'guest_rejected_reschedule';

  // Update booking status
  const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/bookings?id=eq.${bookingId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ status: newStatus, updated_at: new Date().toISOString() }),
  });

  if (!updateRes.ok) {
    const updateErr = await updateRes.text();
    console.error('Failed to update booking status:', updateErr);
    return htmlPage('Error', 'Something went wrong.', 'Could not update booking status. Please try again or contact Ayush directly.', '#ef4444', '⚠️');
  }

  // Determine proposed time display
  const proposedDate = booking.reschedule_date || booking.date;
  const proposedTime = booking.reschedule_time_ist || booking.time_ist;

  // ── Email to Owner (Templates #6 & #7) ──────────────────────────────────
  const isAccepted = action === 'accept';

  let ownerEmailHtml: string;

  if (isAccepted) {
    // ── Template #6: Guest Accepted Reschedule ────────────────────────────
    ownerEmailHtml = `<!DOCTYPE html>
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
    <div style="width:56px;height:56px;border-radius:50%;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.25);display:inline-flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:22px;">&#x1F389;</div>
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.22);color:#4ade80;font-size:9px;font-weight:900;letter-spacing:.45em;text-transform:uppercase;padding:7px 18px;border-radius:100px;margin-bottom:20px;">
      <span style="width:5px;height:5px;background:#22c55e;border-radius:50%;flex-shrink:0;box-shadow:0 0 8px rgba(34,197,94,.9);display:inline-block;"></span>Guest Accepted
    </div>
    <h1 style="font-size:34px;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;line-height:1.1;">Reschedule accepted!</h1>
    <p style="font-size:13px;color:rgba(255,255,255,.28);margin:0;">${booking.name} is happy with the new time — action required</p>
  </div>
  <!-- BODY -->
  <div style="padding:40px 44px;background:#111;">
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Guest Details<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px 24px;margin-bottom:16px;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Name</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.name}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Email</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.email}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Topic</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.topic}</span></div>
    </div>
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Confirmed Time<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(34,197,94,.04);border:1px solid rgba(34,197,94,.12);border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(34,197,94,.08);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Date</span><span style="font-size:14px;font-weight:600;color:#4ade80;line-height:1.45;">${proposedDate}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">IST</span><span style="font-size:14px;font-weight:600;color:#4ade80;line-height:1.45;">${proposedTime} — India Standard Time</span></div>
    </div>
    <!-- Send meet link CTA -->
    <div style="background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.15);border-radius:16px;padding:26px 24px;margin-bottom:20px;text-align:center;">
      <div style="font-size:26px;margin-bottom:10px;">&#x1F4E7;</div>
      <p style="font-size:15px;font-weight:800;color:#fff;margin:0 0 6px;">Next step: Send the Meet link</p>
      <p style="font-size:13px;color:rgba(255,255,255,.3);margin:0 0 18px;line-height:1.6;">The call is confirmed. Send ${booking.name} the Google Meet link now.</p>
      <a href="mailto:${booking.email}" style="display:inline-block;background:#22c55e;color:#000;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.2em;padding:12px 26px;border-radius:100px;text-decoration:none;">Send Meet Link to ${booking.name}</a>
    </div>
    <p style="font-size:11px;color:rgba(255,255,255,.15);line-height:1.7;margin:0;">Booking status updated to <span style="background:rgba(34,197,94,.1);color:#4ade80;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;">guest_confirmed</span></p>
  </div>
  <div style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,.05);padding:22px 44px;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-size:11px;color:rgba(255,255,255,.16);display:flex;align-items:center;gap:8px;"><div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.6);"></div>${OWNER_NAME} &middot; Booking System</div>
    <div style="font-size:10px;"><a href="${SITE_URL}" style="color:rgba(255,255,255,.1);text-decoration:none;">ayushkumarjena.in</a></div>
  </div>
</div>
</body></html>`;

  } else {
    // ── Template #7: Guest Rejected Reschedule ──────────────────────────
    ownerEmailHtml = `<!DOCTYPE html>
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
  <div style="background:#130b07;padding:56px 44px 48px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.05);">
    <div style="position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:360px;background:radial-gradient(ellipse,rgba(249,115,22,.18) 0%,transparent 65%);pointer-events:none;"></div>
    <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.45),transparent);"></div>
    <div style="width:56px;height:56px;border-radius:50%;background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.22);display:inline-flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:22px;">&#x1F614;</div>
    <div style="display:inline-block;background:rgba(249,115,22,.09);border:1px solid rgba(249,115,22,.2);color:#fb923c;font-size:9px;font-weight:900;letter-spacing:.45em;text-transform:uppercase;padding:7px 18px;border-radius:100px;margin-bottom:20px;">Guest Rejected</div>
    <h1 style="font-size:34px;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;line-height:1.1;">Reschedule rejected.</h1>
    <p style="font-size:13px;color:rgba(255,255,255,.28);margin:0;">${booking.name} couldn't make the proposed time</p>
  </div>
  <!-- BODY -->
  <div style="padding:40px 44px;background:#111;">
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Guest Details<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px 24px;margin-bottom:16px;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Name</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.name}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Email</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.email}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Topic</span><span style="font-size:14px;font-weight:600;color:#e0e0e0;line-height:1.45;">${booking.topic}</span></div>
    </div>
    <p style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.42em;color:rgba(255,255,255,.16);margin:0 0 12px;display:flex;align-items:center;gap:10px;">Proposed Time (Rejected)<span style="flex:1;height:1px;background:rgba(255,255,255,.05);"></span></p>
    <div style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px 24px;margin-bottom:24px;opacity:.6;">
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);padding-top:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">Date</span><span style="font-size:14px;font-weight:600;color:rgba(255,255,255,.35);line-height:1.45;text-decoration:line-through;">${proposedDate}</span></div>
      <div style="display:flex;align-items:flex-start;gap:14px;padding:9px 0;padding-bottom:0;"><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(255,255,255,.18);min-width:72px;flex-shrink:0;padding-top:3px;">IST</span><span style="font-size:14px;font-weight:600;color:rgba(255,255,255,.35);line-height:1.45;text-decoration:line-through;">${proposedTime} — India Standard Time</span></div>
    </div>
    <!-- Next step CTA -->
    <div style="background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:26px 24px;margin-bottom:20px;text-align:center;">
      <p style="font-size:15px;font-weight:800;color:#fff;margin:0 0 6px;">Suggest another time</p>
      <p style="font-size:13px;color:rgba(255,255,255,.3);margin:0 0 18px;line-height:1.6;">Reach out to ${booking.name} directly or propose a new slot from the admin panel.</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:0 5px 0 0;width:50%">
            <a href="mailto:${booking.email}" style="display:block;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.28);color:#a5b4fc;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.18em;padding:13px 0;border-radius:12px;text-decoration:none;text-align:center;">&#x1F4E7;&nbsp; Email ${booking.name}</a>
          </td>
          <td style="padding:0 0 0 5px;width:50%">
            <a href="${SITE_URL}/book?panel=true" style="display:block;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.45);font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.18em;padding:13px 0;border-radius:12px;text-decoration:none;text-align:center;">&#x1F4C5;&nbsp; Admin Panel</a>
          </td>
        </tr>
      </table>
    </div>
    <p style="font-size:11px;color:rgba(255,255,255,.15);line-height:1.7;margin:0;">Booking status updated to <span style="background:rgba(249,115,22,.1);color:#fb923c;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;">guest_rejected_reschedule</span></p>
  </div>
  <div style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,.05);padding:22px 44px;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-size:11px;color:rgba(255,255,255,.16);display:flex;align-items:center;gap:8px;"><div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:#f97316;"></div>${OWNER_NAME} &middot; Booking System</div>
    <div style="font-size:10px;"><a href="${SITE_URL}" style="color:rgba(255,255,255,.1);text-decoration:none;">ayushkumarjena.in</a></div>
  </div>
</div>
</body></html>`;
  }

  // Send owner notification
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `${OWNER_NAME} Booking <contact@ayushkumarjena.in>`,
      to: [OWNER_EMAIL],
      reply_to: booking.email,
      subject: isAccepted
        ? `🎉 ${booking.name} accepted your reschedule — ${proposedDate}`
        : `😔 ${booking.name} rejected your reschedule proposal`,
      html: ownerEmailHtml,
    }),
  });

  if (!emailRes.ok) {
    const emailErr = await emailRes.text();
    console.error('Failed to send owner notification email:', emailErr);
    // Don't fail the response — booking was already updated
  }

  // ── Confirmation page for the guest ──────────────────────────────────
  if (isAccepted) {
    return htmlPage(
      'Confirmed',
      "You're all set!",
      `You've accepted the new time on ${proposedDate} at ${proposedTime} IST. Ayush will send you the Google Meet link shortly.`,
      '#22c55e', '🎉'
    );
  } else {
    return htmlPage(
      'Noted',
      'No problem!',
      `You've declined the proposed time. Ayush has been notified and will reach out with another option. You can also book a new slot at ${SITE_URL}/book`,
      '#6366f1', '👋'
    );
  }
});
