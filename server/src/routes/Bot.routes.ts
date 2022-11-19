import express from 'express';
import controller from '../controllers/Bot.controllers'
import { upload } from '../config/multer'
import { saveImages } from '../middlewares/saveImages';

const router = express.Router();

router.post('/', upload.array('files'), saveImages, controller.createBot);
router.get('/', controller.getAllBot);
router.get('/:id', controller.getBot);
router.patch('/:id', controller.updateBot);
router.delete('/:id', controller.deleteBot);

export = router