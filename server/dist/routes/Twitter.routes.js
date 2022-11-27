"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Twitter_controller_1 = __importDefault(require("../controllers/Twitter.controller"));
const router = express_1.default.Router();
router.post('/available/username', Twitter_controller_1.default.checkUsername);
module.exports = router;
