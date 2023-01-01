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
const Streamer_models_1 = __importDefault(require("../models/Streamer.models"));
const Streamers_action_1 = require("../actions/Streamers.action");
const createStreamer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { botId, twitchToken } = req.body;
    // Search streamer in twitch api
    const { error, twitchUser } = yield (0, Streamers_action_1.getTwitchUser)(twitchToken);
    if (error || !twitchUser)
        return res.status(500).json({ error: 'no.streamer.found.in.twitch.api' });
    // Search streamer in db
    const streamer = yield (0, Streamers_action_1.getStreamerByTwitchId)(twitchUser.twitchId);
    if (!streamer && !botId)
        return res.status(500).json({ error: 'no.streamer.found.in.db' });
    // if streamer already exist in db, login
    if (streamer)
        return (0, Streamers_action_1.loginStreamer)(res, streamer);
    // Finally, create a new streamer
    (0, Streamers_action_1.createNewStreamer)(res, {
        botId,
        twitchToken,
        twitchId: twitchUser.twitchId,
        name: twitchUser.name,
        username: twitchUser.username,
        profileImageUrl: twitchUser.profileImageUrl,
        email: twitchUser.email,
        broadcasterType: twitchUser.broadcasterType
    });
});
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
