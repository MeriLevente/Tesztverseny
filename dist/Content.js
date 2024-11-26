"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = content;
const Solution_1 = __importDefault(require("./Solution"));
const url_1 = __importDefault(require("url"));
function content(req, res) {
    var _a, _b;
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
    if (inputId == null)
        inputId = "";
    let inputRound = params.get("round");
    if (inputRound == null)
        inputRound = "";
    res.write('1. feladat: Az adatok beolvasása');
    res.write("<br>");
    res.write('\n2.feladat: A vetélkedőn ' + sol.countcontenders() + ' versenyző indult.');
    res.write("<br>");
    res.write(`\n3. feladat: A versenyző azonosítója = <input type='text' name='id' value='${inputId}' style='max-width:100px;' onChange='this.form.submit();'>\n`);
    res.write(`${sol.getGuessesFromInputId(inputId)}`);
    res.write("<br>");
    res.write(`${sol.checkGuesses(inputId)}\t${inputId != "" ? "(a versenyző helyes válaszai)" : ""}`);
    res.write("<br>");
    res.write(`\n5. feladat: A feladat sorszáma = <input type='text' name='round' value='${inputRound}' style='max-width:100px;' onChange='this.form.submit();'>\n`);
    if (inputRound != "") {
        if (!parseInt(inputRound) || Number(inputRound) <= 0 || Number(inputRound) > sol.numberOfRound)
            res.write('Hibásan adta meg a fordulót!');
        else
            res.write(`A feladatra ${(_a = sol.getStatisticsByInput(inputRound)) === null || _a === void 0 ? void 0 : _a.count} fő, a versenyzők ${(_b = sol.getStatisticsByInput(inputRound)) === null || _b === void 0 ? void 0 : _b.percentage}%-a adott helyes választ.`);
    }
    res.write("<br>");
    res.write("\n6. feladat: A versenyzők pontszámának meghatározása");
    sol.contenderpointsfile();
    res.write("<br>");
    res.write(`\n7.feladat: A verseny legjobbjai: ${sol.showTheThreeBest(sol.getPointsSorted())}`);
    res.write("</pre></form></body></html>");
    res.end();
}
