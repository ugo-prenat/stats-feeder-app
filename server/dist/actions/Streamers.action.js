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
exports.getBotByStreamerId = exports.getStreamerByTwitchId = exports.getTwitchUser = exports.loginStreamer = exports.createNewStreamer = void 0;
const Streamer_models_1 = __importDefault(require("../models/Streamer.models"));
const Bot_models_1 = __importDefault(require("../models/Bot.models"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const Logging_1 = __importDefault(require("../utils/Logging"));
const mongoose_1 = __importDefault(require("mongoose"));
const Bot_actions_1 = require("./Bot.actions");
const createNewStreamer = (res, data) => {
    const { botId, twitchToken, twitchId, name, username, profileImageUrl, email, broadcasterType } = data;
    const streamer = new Streamer_models_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        bot: botId,
        jwt: 'temp jwt',
        twitchToken,
        twitchId,
        name,
        username,
        profileImageUrl,
        email,
        broadcasterType,
        role: 'user',
        isPremium: false
    });
    return streamer
        .save()
        .then((streamer) => __awaiter(void 0, void 0, void 0, function* () {
        yield streamer.populate('bot');
        (0, Bot_actions_1.linkStreamerToBot)(botId, streamer._id)
            .then(() => res.status(201).json({ streamer }))
            .catch(error => res.status(500).json({ error }));
    }))
        .catch(error => res.status(500).json({ error }));
};
exports.createNewStreamer = createNewStreamer;
const loginStreamer = (res, streamer) => __awaiter(void 0, void 0, void 0, function* () {
    const bot = yield (0, exports.getBotByStreamerId)(streamer._id);
    bot ? res.status(200).json({ bot }) : res.status(500).json({ error: 'no.bot.linked.to.streamer' });
});
exports.loginStreamer = loginStreamer;
const getTwitchUser = (twitchToken) => __awaiter(void 0, void 0, void 0, function* () {
    let err = false;
    const data = yield (0, node_fetch_1.default)('https://api.twitch.tv/helix/users', {
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID || '',
            Authorization: `Bearer ${twitchToken}`
        }
    })
        .then(res => res.json())
        .then(res => res.data[0])
        .catch(() => (err = true));
    if (err || !data)
        Logging_1.default.error('Error fetching twitch user');
    return {
        error: err || !data ? 'Error fetching twitch user' : null,
        twitchUser: !err && data
            ? {
                twitchId: data.id,
                name: data.display_name,
                username: data.login,
                profileImageUrl: data.profile_image_url,
                email: data.email,
                broadcasterType: data.broadcaster_type
            }
            : null
    };
});
exports.getTwitchUser = getTwitchUser;
const getStreamerByTwitchId = (twitchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Streamer_models_1.default.findOne({ twitchId });
});
exports.getStreamerByTwitchId = getStreamerByTwitchId;
const getBotByStreamerId = (streamerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Bot_models_1.default.findOne({ streamer: streamerId }).populate('streamer');
});
exports.getBotByStreamerId = getBotByStreamerId;
