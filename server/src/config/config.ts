import dotenv from 'dotenv';
dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.9efmlja.mongodb.net/stats-feeder`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;

export const config = {
  mongo: {
    url: DB_URL
  },
  server: {
    port: SERVER_PORT
  }
}
