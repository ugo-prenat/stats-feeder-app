"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Bot_actions_1 = require("../actions/Bot.actions");
const Bot_models_1 = __importDefault(require("../models/Bot.models"));
const createBot = (req, res) => {
    const { name, username } = req.query;
    const files = req.files;
    const bot = new Bot_models_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        username,
        profileImageUrl: (0, Bot_actions_1.setProfileImg)(files),
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
exports.default = {
    createBot,
    getBot,
    getAllBot,
    updateBot,
    deleteBot
};
