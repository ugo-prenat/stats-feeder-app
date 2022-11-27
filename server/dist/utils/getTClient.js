"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TclientV1 = exports.Tclient = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const twitter_api_v2_1 = require("twitter-api-v2");
const TwitterClient = new twitter_api_v2_1.TwitterApi(process.env.TWITTER_BEARER_TOKEN || '');
exports.Tclient = TwitterClient.readWrite.v2;
exports.TclientV1 = TwitterClient.readWrite.v1;
