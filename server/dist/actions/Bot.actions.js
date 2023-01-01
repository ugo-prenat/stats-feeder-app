"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkStreamerToBot = exports.setProfileImg = void 0;
const constant_1 = require("../constant");
const Bot_models_1 = __importDefault(require("../models/Bot.models"));
const setProfileImg = (files) => {
    var _a;
    if (files)
        return `${process.env.BACKEND_URL}/uploads/${(_a = files[0]) === null || _a === void 0 ? void 0 : _a.filename}`;
    return process.env.BACKEND_URL + constant_1.DEFAULT_BOT_PROFILE_IMG_URL;
};
exports.setProfileImg = setProfileImg;
const linkStreamerToBot = (botId, streamerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Bot_models_1.default.findByIdAndUpdate(botId, { streamer: streamerId }, { new: true });
});
exports.linkStreamerToBot = linkStreamerToBot;
