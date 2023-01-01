"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logging {
}
exports.default = Logging;
_a = Logging;
Logging.log = (args) => _a.info(args);
Logging.info = (args) => console.log(chalk_1.default.blue(`${getDate()}[INFO]`), typeof args === 'string' ? chalk_1.default.blueBright(args) : args);
Logging.warn = (args) => console.log(chalk_1.default.yellow(`${getDate()}[WARN]`), typeof args === 'string' ? chalk_1.default.yellowBright(args) : args);
Logging.error = (args) => console.log(chalk_1.default.red(`${getDate()}[ERROR]`), typeof args === 'string' ? chalk_1.default.redBright(args) : args);
const getDate = () => {
    if (process.env.ENV === 'DEV')
        return `[${new Date().toLocaleString()}] `;
    return '';
};
