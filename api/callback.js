const https = require('https');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'https://ayushkumarjena.vercel.app/api/callback';

export default async function handler(req, res) {
    const { code, error } = req.query;

    if (error) {
        return res.send(`<h2 style="font-family:monospace;color:red">Error: ${error}</h2>`);
    }

    if (!code) {
        return res.send(`<h2 style="font-family:monospace;color:red">No code received.</h2>`);
    }

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
    }).toString();

    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    try {
        const tokenData = await new Promise((resolve, reject) => {
            const tokenReq = https.request(
                {
                    hostname: 'accounts.spotify.com',
                    path: '/api/token',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${credentials}`,
                    },
                },
                (tokenRes) => {
                    let data = '';
                    tokenRes.on('data', (chunk) => (data += chunk));
                    tokenRes.on('end', () => resolve(JSON.parse(data)));
                }
            );
            tokenReq.on('error', reject);
            tokenReq.write(body);
            tokenReq.end();
        });

        if (tokenData.refresh_token) {
            return res.send(`
<!DOCTYPE html>
<html>
<head><title>Spotify Token</title></head>
<body style="font-family:monospace;background:#111;color:#fff;padding:40px;max-width:700px;margin:auto">
  <h2 style="color:#1DB954">✅ Got your refresh token!</h2>
  <p>Add this to your Vercel environment variables as <code style="color:#1DB954">SPOTIFY_REFRESH_TOKEN</code>:</p>
  <div style="background:#222;padding:16px;border-radius:8px;word-break:break-all;font-size:13px;border:1px solid #333">
    ${tokenData.refresh_token}
  </div>
  <p style="margin-top:24px;color:#888;font-size:12px">You can now delete the <code>/api/callback.js</code> file from your project.</p>
</body>
</html>`);
        } else {
            return res.send(`<pre style="font-family:monospace;color:red">${JSON.stringify(tokenData, null, 2)}</pre>`);
        }
    } catch (e) {
        return res.send(`<h2 style="color:red">Error: ${e.message}</h2>`);
    }
}
