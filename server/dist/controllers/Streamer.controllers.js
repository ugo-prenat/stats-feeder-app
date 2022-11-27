"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Streamer_models_1 = __importDefault(require("../models/Streamer.models"));
const createStreamer = (req, res) => {
    const { bot, token, twitchId, name, username, profileImageUrl, email } = req.body;
    const streamer = new Streamer_models_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        bot,
        token,
        twitchId,
        name,
        username,
        profileImageUrl,
        email
    });
    return streamer
        .save()
        .then(streamer => res.status(201).json({ streamer }))
        .catch(error => res.status(500).json({ error }));
};
const getStreamer = (req, res) => {
    const { id } = req.params;
    return Streamer_models_1.default.findById(id)
        .populate('bot')
        .then(streamer => streamer
        ? res.status(200).json({ streamer })
        : res.status(404).json({ message: 'Streamer not found' }))
        .catch(error => res.status(500).json({ error }));
};
const getAllStreamer = (req, res) => {
    return Streamer_models_1.default.find()
        .populate('bot')
        .then(streamers => res.status(200).json({ streamers }))
        .catch(error => res.status(500).json({ error }));
};
const updateStreamer = (req, res) => {
    const { id } = req.params;
    return Streamer_models_1.default.findByIdAndUpdate(id, req.body, { new: true })
        .then(streamer => streamer
        ? res.status(200).json({ streamer })
        : res.status(404).json({ message: 'Streamer not found' }))
        .catch(error => res.status(500).json({ error }));
};
const deleteStreamer = (req, res) => {
    const { id } = req.params;
    return Streamer_models_1.default.findByIdAndDelete(id)
        .then(streamer => streamer
        ? res.status(200).json({ streamer })
        : res.status(404).json({ message: 'Streamer not found' }))
        .catch(error => res.status(500).json({ error }));
};
exports.default = {
    createStreamer,
    getStreamer,
    getAllStreamer,
    updateStreamer,
    deleteStreamer
};
