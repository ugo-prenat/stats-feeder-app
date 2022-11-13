import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './utils/Logging';
import figlet from 'figlet';
import { routes } from './routes/Export.routes';
import cors from 'cors';

const app = express()
figlet('Stats  Feeder', (_, data) => console.log(data))

// DB connection
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
.then(() => {
  Logging.info('Connected to MongoDB')
  StartServer()
})
.catch(err => {
  Logging.error('Unable to conect to MongoDB: ');
  Logging.error(err);
});

// Only start server if DB connection is successful
const StartServer = () => {
  app.use((req, res, next) => {
    Logging.info(`Incomming  → ${req.method} ${req.url} - IP: ${req.ip}`);
    
    res.on('finish', () => {
      Logging.info(`Outcomming → ${req.method} ${req.url} - IP: ${req.ip} - Status ${res.statusCode}`);
    })
    next();
  })
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors())
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  })
  
  // Routes
  app.use('/bots', routes.bot);
  app.use('/streamers', routes.streamer);
  app.use('/tweets', routes.tweet);
  app.use('/twitter', routes.twitter);
  
  // Error handling
  app.use((req, res, next) => {
    const error = new Error('Not found');
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  })
  
  http.createServer(app).listen(config.server.port, () => Logging.info(`Server running on port ${config.server.port}`));
}
