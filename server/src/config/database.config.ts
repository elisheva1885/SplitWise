export default () => ({
  database: {
    host: Number(process.env.DB_HOST) || 'localhost',
    port: Number(process.env.DB_PORT) || 1522,
    password: process.env.ORACLE_PASSWORD || 'password',
    name: process.env.DB_DATABASE || 'db',
  },
});
