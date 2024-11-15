import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import Solution from "./Solution";


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

   const m: Solution = new Solution()

   res.write(`<p>${m.helloWorld()}</p>`)
   
    res.write("</pre></form></body></html>");
    res.end();
}
