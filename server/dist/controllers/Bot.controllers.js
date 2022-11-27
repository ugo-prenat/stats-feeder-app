"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = require("../constant");
const Bot_models_1 = __importDefault(require("../models/Bot.models"));
const createBot = (req, res) => {
    const { name, username } = req.query;
    const files = req.files;
    const bot = new Bot_models_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        username,
        profileImageUrl: setProfileImg(files),
        status: 'pending'
    });
    return bot
        .save()
        .then(bot => res.status(201).json({ bot }))
        .catch(error => res.status(500).json({ error }));
};
const getBot = (req, res) => {
    const { id } = req.params;
    return Bot_models_1.default.findById(id)
        .populate('streamer')
        .then(bot => bot ? res.status(200).json({ bot }) : res.status(404).json({ message: 'Bot not found' }))
        .catch(error => res.status(500).json({ error }));
};
const getAllBot = (req, res) => {
    return Bot_models_1.default.find()
        .populate('streamer')
        .then(bots => res.status(200).json({ bots }))
        .catch(error => res.status(500).json({ error }));
};
const updateBot = (req, res) => {
    const { id } = req.params;
    return Bot_models_1.default.findByIdAndUpdate(id, req.body, { new: true })
        .then(bot => bot ? res.status(200).json({ bot }) : res.status(404).json({ message: 'Bot not found' }))
        .catch(error => res.status(500).json({ error }));
};
const deleteBot = (req, res) => {
    const { id } = req.params;
    return Bot_models_1.default.findByIdAndDelete(id)
        .then(bot => bot ? res.status(200).json({ bot }) : res.status(404).json({ message: 'Bot not found' }))
        .catch(error => res.status(500).json({ error }));
};
const setProfileImg = (files) => {
    var _a;
    if (files)
        return `/uploads/${(_a = files[0]) === null || _a === void 0 ? void 0 : _a.filename}`;
    return constant_1.DEFAULT_BOT_PROFILE_IMG_URL;
};
exports.default = {
    createBot,
    getBot,
    getAllBot,
    updateBot,
    deleteBot
};
