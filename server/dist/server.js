"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./utils/Logging"));
const figlet_1 = __importDefault(require("figlet"));
const Export_routes_1 = require("./routes/Export.routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, figlet_1.default)('Stats  Feeder', (_, data) => console.log(data));
// DB connection
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('Connected to MongoDB');
    StartServer();
})
    .catch(err => {
    Logging_1.default.error('Unable to conect to MongoDB: ');
    Logging_1.default.error(err);
});
// Only start server if DB connection is successful
const StartServer = () => {
    app.use((req, res, next) => {
        Logging_1.default.info(`Incomming  → ${req.method} ${req.url} - IP: ${req.ip}`);
        res.on('finish', () => {
            Logging_1.default.info(`Outcomming → ${req.method} ${req.url} - IP: ${req.ip} - Status ${res.statusCode}`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });
    // Routes
    app.use('/bots', Export_routes_1.routes.bot);
    app.use('/streamers', Export_routes_1.routes.streamer);
    app.use('/tweets', Export_routes_1.routes.tweet);
    app.use('/twitter', Export_routes_1.routes.twitter);
    app.use('/uploads', Export_routes_1.routes.uploads);
    // Error handling
    app.use((req, res) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default
        .createServer(app)
        .listen(config_1.config.server.port, () => Logging_1.default.info(`Server running on port ${config_1.config.server.port}`));
};
