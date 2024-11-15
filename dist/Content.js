"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = content;
const Solution_1 = __importDefault(require("./Solution"));
const url_1 = __importDefault(require("url"));
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
    const params = new url_1.default.URL(req.url, `http://${req.headers.host}/`).searchParams;
    const sol = new Solution_1.default("valaszok.txt");
    let inputId = params.get("id");
    if (inputId == null || inputId.length > 5)
        inputId = "";
    res.write('1. feladat: Az adatok beolvasása');
    res.write('\n2.feladat: a vetélkedőn ' + sol.countcontenders() + ' versenyző indult');
    res.write(`\n3. feladat: A versenyző azonosítója = <input type='text' name='id' value='${inputId}' style='max-width:100px;' onChange='this.form.submit();'>\n`);
    res.write(`\n${sol.getGuessesFromInputId(inputId)}`);
    res.write(sol.chechGuesses(inputId));
    res.write("</pre></form></body></html>");
    res.end();
}
