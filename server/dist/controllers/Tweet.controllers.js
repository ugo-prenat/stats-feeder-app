"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Tweet_models_1 = __importDefault(require("../models/Tweet.models"));
const createTweet = (req, res) => {
    const { bot, content } = req.body;
    const tweet = new Tweet_models_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        bot,
        content,
        twitterUrl: ''
    });
    return tweet
        .save()
        .then(tweet => res.status(201).json({ tweet }))
        .catch(error => res.status(500).json({ error }));
};
const getTweet = (req, res) => {
    const { id } = req.params;
    return Tweet_models_1.default.findById(id)
        .populate('bot')
        .then(tweet => tweet ? res.status(200).json({ tweet }) : res.status(404).json({ message: 'Tweet not found' }))
        .catch(error => res.status(500).json({ error }));
};
const getAllTweet = (req, res) => {
    return Tweet_models_1.default.find()
        .populate('bot')
        .then(tweets => res.status(200).json({ tweets }))
        .catch(error => res.status(500).json({ error }));
};
const updateTweet = (req, res) => {
    const { id } = req.params;
    return Tweet_models_1.default.findByIdAndUpdate(id, req.body, { new: true })
        .then(tweet => tweet ? res.status(200).json({ tweet }) : res.status(404).json({ message: 'Tweet not found' }))
        .catch(error => res.status(500).json({ error }));
};
const deleteTweet = (req, res) => {
    const { id } = req.params;
    return Tweet_models_1.default.findByIdAndDelete(id)
        .then(tweet => tweet ? res.status(200).json({ tweet }) : res.status(404).json({ message: 'Tweet not found' }))
        .catch(error => res.status(500).json({ error }));
};
exports.default = {
    createTweet,
    getTweet,
    getAllTweet,
    updateTweet,
    deleteTweet
};
