import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import Solution from "./Solution";
import url from "url";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    
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

    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;
    const sol: Solution = new Solution("valaszok.txt")
    let inputId: string = params.get("id") as string;
    if(inputId == null)
        inputId = ""
    let inputRound: string = params.get("round") as string;
    if(inputRound == null)
        inputRound = ""
    
    res.write('1. feladat: Az adatok beolvasása')
    res.write("<br>")
    res.write('\n2. feladat: A vetélkedőn ' + sol.countContenders() + ' versenyző indult.')
    res.write("<br>")
    res.write(`\n3. feladat: A versenyző azonosítója = <input type='text' name='id' value='${inputId}' style='max-width:100px;' onChange='this.form.submit();'>\n`);
    let guessesFromInputId: string = sol.getGuessesFromInputId(inputId)
    res.write(`${guessesFromInputId}`)
    res.write("<br>")
    if(guessesFromInputId != "Ilyen versenyző nincsen!" && guessesFromInputId != "")
        res.write(`${sol.checkGuesses(inputId)}\t(a versenyző helyes válaszai)`)
    res.write("<br>")
    res.write(`\n5. feladat: A feladat sorszáma = <input type='text' name='round' value='${inputRound}' style='max-width:100px;' onChange='this.form.submit();'>\n`);
    
    if(inputRound != ""){
        if(!parseInt(inputRound) || Number(inputRound) % 1 !== 0 || Number(inputRound) <= 0 || Number(inputRound) > sol.numberOfRound)
            res.write('Hibásan adta meg a fordulót!')
        else
            res.write(`A feladatra ${sol.getStatisticsByInput(inputRound).count} fő, a versenyzők ${sol.getStatisticsByInput(inputRound).percentage}%-a adott helyes választ.`)
    }
    res.write("<br>")
    res.write("\n6. feladat: A versenyzők pontszámának meghatározása")
    sol.writeContenderpointsFile()
    res.write("<br>")
    res.write(`\n7.feladat: A verseny legjobbjai: ${sol.showTheThreeBest()}`)
   
    res.write("</pre></form></body></html>");
    res.end();
}
