"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const constant_1 = require("../constant");
const mongodb_1 = require("mongodb");
// Init gridFSBucket
const connect = mongoose_1.default.createConnection(config_1.config.mongo.url);
let gfs;
connect.once('open', () => {
    gfs = new mongodb_1.GridFSBucket(connect.db, { bucketName: 'uploads' });
});
const getImage = (req, res) => {
    const { filename } = req.params;
    gfs.find({ filename }).toArray((err, files) => {
        if (err)
            return res.status(400).send(err);
        if (!files[0] || files.length === 0)
            return res.status(404).send('this file does not exist');
        const isAcceptedFileType = constant_1.ACCEPTED_FILE_TYPES.some(type => files[0].contentType.includes(type));
        if (isAcceptedFileType)
            gfs.openDownloadStreamByName(filename).pipe(res);
        else
            res.status(400).send({ msg: "Requested file isn't an image" });
    });
};
exports.default = {
    getImage
};
