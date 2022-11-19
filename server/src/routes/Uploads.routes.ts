import express from 'express';
import controller from '../controllers/Upload.controllers';
const router = express.Router();

router.get('/:filename', controller.getImage);

export = router