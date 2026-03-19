// Used Last.fm simple API to avoid Spotify OAuth complex rotation in production
export default async function handler(req, res) {
    const API_KEY = process.env.VITE_LASTFM_API_KEY;
    const USERNAME = process.env.VITE_LASTFM_USERNAME;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=5');

    if (!API_KEY || !USERNAME) {
        return res.status(500).json({ error: 'Last.fm credentials not found' });
    }

    try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.recenttracks || !data.recenttracks.track || data.recenttracks.track.length === 0) {
            return res.json({ isPlaying: false, title: null });
        }

        const track = data.recenttracks.track[0];
        const isPlaying = track['@attr']?.nowplaying === 'true';

        return res.json({
            isPlaying,
            title: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            albumArt: track.image[track.image.length - 1]['#text'] || '',
            songUrl: track.url,
            playedAt: track.date?.uts ? parseInt(track.date.uts) * 1000 : null,
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
