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

    // Build one-click action URLs (GET requests → returns HTML confirmation page)
    const fnBase = `${SUPABASE_URL}/functions/v1/manage-booking`;
    const acceptUrl  = bookingId ? `${fnBase}?bookingId=${bookingId}&action=accepted&secret=${encodeURIComponent(ADMIN_SECRET)}` : '#';
    const rejectUrl  = bookingId ? `${fnBase}?bookingId=${bookingId}&action=rejected&secret=${encodeURIComponent(ADMIN_SECRET)}` : '#';
    const reschedUrl = `${SITE_URL}/book?panel=true`;

    // ── Email 1: Alert to Ayush ──────────────────────────────────────────
    const ownerEmailHtml = `
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
  .label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.25); min-width: 90px; padding-top: 3px; }
  .value { font-size: 15px; font-weight: 600; color: #e5e5e5; }
  .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 24px 0; }
  .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px 24px; margin-bottom: 16px; }
  .footer { background: #0f0f0f; padding: 24px 40px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.15); letter-spacing: 0.05em; }
  .dot { display: inline-block; width: 8px; height: 8px; background: #22c55e; border-radius: 50%; margin-right: 8px; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <div class="badge">📅 New Booking</div>
    <h1 class="title">You have a new call request</h1>
  </div>
  <div class="body">
    <div class="card">
      <div class="row"><span class="label">From</span><span class="value">${name}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
      <div class="row"><span class="label">Topic</span><span class="value">${topic}</span></div>
      ${notes ? `<div class="row"><span class="label">Notes</span><span class="value">${notes}</span></div>` : ''}
      ${guests?.filter((g: string) => g.trim()).length ? `<div class="row"><span class="label">Guests</span><span class="value">${guestList}</span></div>` : ''}
    </div>
    <hr class="divider">
    <div class="card">
      <div class="row"><span class="label">Date</span><span class="value">${date}</span></div>
      <div class="row"><span class="label">Time (IST)</span><span class="value">${timeIST}</span></div>
      <div class="row"><span class="label">Their Time</span><span class="value">${timeLocal} (${timezone})</span></div>
    </div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0;">
    <p style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.3em;color:rgba(255,255,255,0.2);margin-bottom:16px;">Quick Actions</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td style="padding:0 6px 0 0;">
          <a href="${acceptUrl}" style="display:block;background:#16a34a;color:#ffffff;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;padding:14px 0;border-radius:12px;text-decoration:none;text-align:center;">✓ Accept</a>
        </td>
        <td style="padding:0 6px;">
          <a href="${rejectUrl}" style="display:block;background:#dc2626;color:#ffffff;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;padding:14px 0;border-radius:12px;text-decoration:none;text-align:center;">✗ Reject</a>
        </td>
        <td style="padding:0 0 0 6px;">
          <a href="${reschedUrl}" style="display:block;background:#1d4ed8;color:#ffffff;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;padding:14px 0;border-radius:12px;text-decoration:none;text-align:center;">↻ Reschedule</a>
        </td>
      </tr>
    </table>
    <p style="font-size:11px;color:rgba(255,255,255,0.2);margin:0;line-height:1.6;">
      Accept and Reject update the status instantly. Reschedule opens your admin panel.<br>
      Submitted: <code style="font-size:10px;">${new Date().toUTCString()}</code>
    </p>
  </div>
  <div class="footer"><span class="dot"></span>${OWNER_NAME}'s Portfolio — Booking System</div>
</div>
</body></html>`;

    // ── Email 2: Confirmation to Guest ───────────────────────────────────
    const guestEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: 'Inter', -apple-system, sans-serif; background: #0c0a09; color: #e5e5e5; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%); padding: 48px 40px; text-align: center; }
  .avatar { width: 72px; height: 72px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.15); margin: 0 auto 20px; display: block; }
  .badge { display: inline-block; background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); color: #4ade80; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 16px; }
  .title { font-size: 30px; font-weight: 900; color: #ffffff; margin: 0 0 8px; letter-spacing: -0.5px; }
  .subtitle { font-size: 15px; color: rgba(255,255,255,0.4); margin: 0; }
  .body { padding: 40px; }
  .greeting { font-size: 17px; color: #e5e5e5; font-weight: 600; margin-bottom: 12px; }
  .para { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.7; margin-bottom: 28px; }
  .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
  .card-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.2); margin-bottom: 16px; }
  .row { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start; }
  .row:last-child { margin-bottom: 0; }
  .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.2); min-width: 70px; padding-top: 2px; }
  .value { font-size: 14px; font-weight: 600; color: #d4d4d4; }
  .notice { background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); border-radius: 12px; padding: 16px 20px; font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 24px; }
  .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
  .footer { background: #0f0f0f; padding: 24px 40px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.15); letter-spacing: 0.05em; line-height: 1.8; }
  a { color: #60a5fa; text-decoration: none; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <img class="avatar" src="${SITE_URL}/profile.jpeg" alt="${OWNER_NAME}" />
    <div class="badge">✓ Booking Received</div>
    <h1 class="title">You're booked in!</h1>
    <p class="subtitle">Here's everything you need to know.</p>
  </div>
  <div class="body">
    <p class="greeting">Hey ${name},</p>
    <p class="para">
      Thanks for reaching out! I've received your booking request and will confirm the meeting shortly.
      You'll receive another email once it's confirmed, along with the Google Meet link.
    </p>
    <div class="card">
      <div class="card-label">Booking Summary</div>
      <div class="row"><span class="label">Topic</span><span class="value">${topic}</span></div>
      <div class="row"><span class="label">Date</span><span class="value">${date}</span></div>
      <div class="row"><span class="label">Time</span><span class="value">${timeLocal} (${timezone})</span></div>
      <div class="row"><span class="label">IST</span><span class="value">${timeIST} — India Standard Time</span></div>
      <div class="row"><span class="label">Duration</span><span class="value">30 minutes · Google Meet</span></div>
    </div>
    <div class="notice">
      📌 <strong style="color:rgba(255,255,255,0.6)">Pending Confirmation</strong> — This is not yet a confirmed booking.
      I'll review and confirm within 24 hours. If the slot doesn't work, I'll suggest an alternative.
    </div>
    <hr class="divider">
    <p class="para" style="margin:0; font-size:13px;">
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
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
