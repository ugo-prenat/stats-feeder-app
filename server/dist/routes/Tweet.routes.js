"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Tweet_controllers_1 = __importDefault(require("../controllers/Tweet.controllers"));
const router = express_1.default.Router();
router.post('/', Tweet_controllers_1.default.createTweet);
router.get('/', Tweet_controllers_1.default.getAllTweet);
router.get('/:id', Tweet_controllers_1.default.getTweet);
router.patch('/:id', Tweet_controllers_1.default.updateTweet);
router.delete('/:id', Tweet_controllers_1.default.deleteTweet);
module.exports = router;
