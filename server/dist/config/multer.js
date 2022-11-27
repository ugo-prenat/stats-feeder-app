"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const config_1 = require("./config");
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: config_1.config.mongo.url,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: () => {
        return { bucketName: 'uploads' };
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg')
        callback(null, true);
    else
        callback(null, false);
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 1000000 }
});
