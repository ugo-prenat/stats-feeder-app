import express from 'express';
import controller from '../controllers/Streamer.controllers'

const router = express.Router();

router.post('/', controller.createStreamer);
router.get('/', controller.getAllStreamer);
router.get('/:id', controller.getStreamer);
router.patch('/:id', controller.updateStreamer);
router.delete('/:id', controller.deleteStreamer);

export = router