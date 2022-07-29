const inputSchema = {
  type: "object",
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['email', 'password']
};

export default inputSchema
