export default () => ({
  app: {
    port: Number(process.env.PORT) || 3000,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    expiresIn: Number(process.env.EXPIRES_IN_JWT) || 86400,
  },
});
