"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = content;
const Solution_1 = __importDefault(require("./Solution"));
function content(req, res) {
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Tesztverseny</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    // Kezd a kódolást innen -->
    // npm run dev  --> http://localhost:8080/
    const sol = new Solution_1.default("valaszok.txt");
    res.write(`<p> ${sol.contenders.length} </p>`);
    res.write(`<p> ${sol.rightGuesses} </p>`);
    res.write("</pre></form></body></html>");
    res.end();
}
