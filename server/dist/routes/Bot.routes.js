"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Bot_controllers_1 = __importDefault(require("../controllers/Bot.controllers"));
const multer_1 = require("../config/multer");
const router = express_1.default.Router();
router.post('/', multer_1.upload.array('files'), Bot_controllers_1.default.createBot);
router.get('/', Bot_controllers_1.default.getAllBot);
router.get('/:id', Bot_controllers_1.default.getBot);
router.patch('/:id', Bot_controllers_1.default.updateBot);
router.delete('/:id', Bot_controllers_1.default.deleteBot);
module.exports = router;
