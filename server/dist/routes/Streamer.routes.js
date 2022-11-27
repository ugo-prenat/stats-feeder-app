"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Streamer_controllers_1 = __importDefault(require("../controllers/Streamer.controllers"));
const router = express_1.default.Router();
router.post('/', Streamer_controllers_1.default.createStreamer);
router.get('/', Streamer_controllers_1.default.getAllStreamer);
router.get('/:id', Streamer_controllers_1.default.getStreamer);
router.patch('/:id', Streamer_controllers_1.default.updateStreamer);
router.delete('/:id', Streamer_controllers_1.default.deleteStreamer);
module.exports = router;
