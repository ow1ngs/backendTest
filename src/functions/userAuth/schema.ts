const inputSchema = {
  type: "object",
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['email', 'password']
};

export default inputSchema

export interface userCredentials {
  email: string,
  password: string
}
