﻿import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
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
    if(inputId == null || inputId.length > 5)
        inputId = ""
    
    res.write('1. feladat: Az adatok beolvasása')
    res.write('\n2.feladat: a vetélkedőn ' + sol.countcontenders() + ' versenyző indult')
    res.write(`\n3. feladat: A versenyző azonosítója = <input type='text' name='id' value='${inputId}' style='max-width:100px;' onChange='this.form.submit();'>\n`);
    res.write(`\n${sol.getGuessesFromInputId(inputId)}`)
    res.write(sol.chechGuesses(inputId))
   
    res.write("</pre></form></body></html>");
    res.end();
}
