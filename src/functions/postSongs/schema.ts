const inputSchema = {
  type: "object",
  properties: {
    token: { type: 'string' },
    artist: { type: 'string' },
    songName: { type: 'string' },
    album: { type: 'string' },
    year: { type: 'string' },
    visibility: { type: 'string' }
  },
  required: ['token', 'artist', 'songName', 'album', 'year', 'visibility']
};

export default inputSchema