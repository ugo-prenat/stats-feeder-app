"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const Streamer_routes_1 = __importDefault(require("./Streamer.routes"));
const Bot_routes_1 = __importDefault(require("./Bot.routes"));
const Tweet_routes_1 = __importDefault(require("./Tweet.routes"));
const Twitter_routes_1 = __importDefault(require("./Twitter.routes"));
const Uploads_routes_1 = __importDefault(require("./Uploads.routes"));
exports.routes = {
    bot: Bot_routes_1.default,
    streamer: Streamer_routes_1.default,
    tweet: Tweet_routes_1.default,
    twitter: Twitter_routes_1.default,
    uploads: Uploads_routes_1.default
};
