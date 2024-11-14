"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const Content_1 = __importDefault(require("./Content"));
class Program {
    constructor() {
        http_1.default.createServer(Content_1.default).listen(process.env.PORT || 8080);
    }
}
new Program();
