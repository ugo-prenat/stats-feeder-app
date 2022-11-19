import streamer from './Streamer.routes';
import bot from './Bot.routes';
import tweet from './Tweet.routes';
import twitter from './Twitter.routes';
import uploads from './Uploads.routes';

export const routes = {
  bot,
  streamer,
  tweet,
  twitter,
  uploads
}