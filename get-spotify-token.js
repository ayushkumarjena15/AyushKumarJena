/**
 * Run: node get-spotify-token.js
 * Then visit the URL it prints, authorize, and the refresh token will be saved automatically.
 */
const http = require('http');
const https = require('https');

const CLIENT_ID = '5ce65d7718b04507bd748290145295a1';
const CLIENT_SECRET = 'd38632822d2d4f3eb10e89b298068bea';
const REDIRECT_URI = 'http://localhost:8888/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

const authUrl =
    `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(SCOPES)}`;

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost:8888');
    if (url.pathname !== '/callback') {
        res.end('Waiting...');
        return;
    }

    const code = url.searchParams.get('code');
    if (!code) {
        res.end('No code received. Try again.');
        server.close();
        return;
    }

    // Exchange code for tokens
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
    }).toString();

    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

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
            tokenRes.on('end', () => {
                const json = JSON.parse(data);
                if (json.refresh_token) {
                    console.log('\n✅ SUCCESS!\n');
                    console.log('REFRESH TOKEN:', json.refresh_token);
                    console.log('\nCopy this into your .env as:\nVITE_SPOTIFY_REFRESH_TOKEN=' + json.refresh_token);
                    res.end('<h2>✅ Got the token! Check your terminal and close this tab.</h2>');
                } else {
                    console.log('Error:', JSON.stringify(json, null, 2));
                    res.end('<h2>Error: ' + JSON.stringify(json) + '</h2>');
                }
                server.close();
            });
        }
    );
    tokenReq.write(body);
    tokenReq.end();
});

server.listen(8888, () => {
    console.log('\n1. Add this redirect URI to your Spotify app settings:');
    console.log('   http://localhost:8888/callback\n');
    console.log('2. Then visit this URL in your browser:\n');
    console.log(authUrl);
    console.log('\nWaiting for authorization...');
});
