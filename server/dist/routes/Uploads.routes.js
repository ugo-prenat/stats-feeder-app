"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Upload_controllers_1 = __importDefault(require("../controllers/Upload.controllers"));
const router = express_1.default.Router();
router.get('/:filename', Upload_controllers_1.default.getImage);
module.exports = router;
