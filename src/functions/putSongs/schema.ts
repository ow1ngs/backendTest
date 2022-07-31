const inputSchema = {
  type: "object",
  properties: {
    id: { type: 'string' }, 
    artist: { type: 'string' },
    songName: { type: 'string' },
    album: { type: 'string' },
    year: { type: 'string' },
    visibility: { type: 'string' }
  },
  required: ['id']
};

export default inputSchema