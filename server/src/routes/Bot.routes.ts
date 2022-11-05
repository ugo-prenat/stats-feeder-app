import express from 'express';
import controller from '../controllers/Bot.controllers'

const router = express.Router();

router.post('/', controller.createBot);
router.get('/', controller.getAllBot);
router.get('/:id', controller.getBot);
router.patch('/:id', controller.updateBot);
router.delete('/:id', controller.deleteBot);

export = router