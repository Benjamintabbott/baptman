// /app/api/neuz/route.js

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = 'UCd3dW072JclrvRqMAqb9MxQ'; // AptosNeuz Channel ID
  const maxResults = 6;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}`
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch YouTube videos.' }), { status: 500 });
    }

    const data = await res.json();

    const videos = data.items
      .filter((item) => item.id.kind === 'youtube#video')
      .map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url ?? '',
      }));

    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (err) {
    console.error('YouTube API error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
