import express from 'express';
import controller from '../controllers/Tweet.controllers'

const router = express.Router();

router.post('/', controller.createTweet);
router.get('/', controller.getAllTweet);
router.get('/:id', controller.getTweet);
router.patch('/:id', controller.updateTweet);
router.delete('/:id', controller.deleteTweet);

export = router