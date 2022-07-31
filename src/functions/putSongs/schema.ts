const inputSchema = {
  type: "object",
  properties: {
    artist: { type: 'string' },
    songName: { type: 'string' },
    album: { type: 'string' },
    year: { type: 'string' },
    visibility: { type: 'string' }
  },
  required: ['artist', 'songName', 'album', 'year', 'visibility']
};

export default inputSchema