"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Solution_1 = __importDefault(require("../Solution"));
const sol = new Solution_1.default("valaszok.txt");
describe("1.feladat tesztelése", () => {
    it("Az adatokat beolvasása sikere, a contenders vektor nem üres", () => {
        expect(sol.getContenders.length).toBeGreaterThan(0);
    });
});
describe("3.feladat tesztelése", () => {
    it("A felhasználó bevitt egy azonosítót és a hozzátartozó válaszokat adja vissza a függvény", () => {
        expect(sol.getGuessesFromInputId("AB123")).toBe("BXCDBBACACADBC (a versenyző válasza)");
    });
    it("A felhasználó bevitt egy azonosítót kisbetűkkel és így is hozzátartozó válaszokat adja vissza a függvény", () => {
        expect(sol.getGuessesFromInputId("ab123")).toBe("BXCDBBACACADBC (a versenyző válasza)");
    });
    it("A felhasználó üres stringet vitt be, a függvény üres stringgel tér vissza", () => {
        expect(sol.getGuessesFromInputId("")).toBe("");
    });
    it("A felhasználó egy olyan azonosított vitt be, ami nincs az adatok közt, függvény ezt tudatja vele", () => {
        expect(sol.getGuessesFromInputId("adaff")).toBe("Ilyen versenyző nincsen!");
    });
    it("A felhasználó bevitt egy azonosítót, ami 5 karakternél hosszabb", () => {
        expect(sol.getGuessesFromInputId("AB1234")).toBe("A versenyző kódja nem lehet 5 karakternél több!");
    });
});
describe("5.feladat tesztelése", () => {
    it("A felhasználó bevitt egy fordulószámot, és visszakapta a helyes válaszok számát", () => {
        var _a;
        expect((_a = sol.getStatisticsByInput("10")) === null || _a === void 0 ? void 0 : _a.count).toBe(111);
    });
    it("A felhasználó bevitt egy fordulószámot, és visszakapta a helyes válaszok számát százalékban", () => {
        var _a;
        expect((_a = sol.getStatisticsByInput("10")) === null || _a === void 0 ? void 0 : _a.percentage).toBe(36.63);
    });
});
// describe("7.feladat tesztelése", ()=>{
//     it("A legjobb eredményt helyesen írja ki", ()=>{
//         expect(sol.showTheThreeBest(sol.getPointsSorted())).toBe()
//     })
// })
