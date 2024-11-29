import Solution from "../Solution"
import fs from "fs"

const sol: Solution = new Solution("valaszok.txt")

describe("1.feladat tesztelése", ()=>{
    it("Az adatokat beolvasása sikere, a contenders vektor nem üres", ()=>{
        expect(sol.getContenders.length).toBeGreaterThan(0)
    })
})

describe("2.feladat tesztelése", ()=>{
    it("helyesen számolja meg a versenzőket", ()=>{
        expect(sol.countContenders()).toBe(303)
    })
})

describe("3.feladat tesztelése", ()=>{
    it("A felhasználó bevitt egy azonosítót és a hozzátartozó válaszokat adja vissza a függvény", ()=>{
        expect(sol.getGuessesFromInputId("AB123")).toBe("BXCDBBACACADBC (a versenyző válasza)")
    })
    it("A felhasználó bevitt egy azonosítót kisbetűkkel és így is hozzátartozó válaszokat adja vissza a függvény", ()=>{
        expect(sol.getGuessesFromInputId("ab123")).toBe("BXCDBBACACADBC (a versenyző válasza)")
    })
    it("A felhasználó üres stringet vitt be, a függvény üres stringgel tér vissza", ()=>{
        expect(sol.getGuessesFromInputId("")).toBe("")
    })
    it("A felhasználó egy olyan azonosított vitt be, ami nincs az adatok közt, függvény ezt tudatja vele", ()=>{
        expect(sol.getGuessesFromInputId("adaff")).toBe("Ilyen versenyző nincsen!")
    })
})

describe("4.feladat tesztelése", ()=>{
    it("A helyes választ megjeleniti a függvény", ()=>{
        expect(sol.checkGuesses("AB123").split("\n")[2].trim().split("\t")[0]).toBe("BCCCDBBBBCDAAA")
})
    it("helyesen irja ki a felhasználo helyes válaszait", ()=>{
        expect(sol.checkGuesses("AB123").split("\n")[3]).toBe("+ +  +   +     ")
    })
    it("Nem létező versenyző megadásakor üres stringgel tér vissza", ()=>{
        expect(sol.checkGuesses("nemlétezik")).toBe("")
    })
})

describe("5.feladat tesztelése", ()=>{
    it("14 forduló votl a fájl adatai szerint, ennyivel kell visszatérnie a numberOfRound()-nak", ()=>{
        expect(sol.numberOfRound).toBe(14)
    })
    it("A felhasználó bevitt egy fordulószámot, és visszakapta a helyes válaszok számát", ()=>{
        expect(sol.getStatisticsByInput("10")?.count).toBe(111)
    })
    it("A felhasználó bevitt egy fordulószámot, és visszakapta a helyes válaszok számát százalékban", ()=>{
        expect(sol.getStatisticsByInput("10")?.percentage).toBe(36.63)
    })
})

sol.writeContenderpointsFile = jest.fn()
describe("6.feladat tesztelése", ()=>{
    it("A versenyzők pontszámait helyesen számolja ki", ()=>{
        expect(sol.getContendersPoints("AB123")).toBe(14)
    })
    it("Lefut e a fájl irása", ()=>{
        sol.writeContenderpointsFile()
        expect(sol.writeContenderpointsFile).toHaveBeenCalled()
    })
})

describe("7.feladat tesztelése", ()=>{
    it("A 3 legtöbb pontot elérő versenyzőket helyesen írja ki", ()=>{
        expect(sol.showTheThreeBest()).toBe("\n1. díj (56 pont): JO001\n2. díj (52 pont): DG490\n2. díj (52 pont): UA889\n3. díj (49 pont): FX387")
    })
    it("A képernyőre kiíratás 5 sorral tér vissza", ()=>{
        expect(sol.showTheThreeBest()?.split("\n").length).toBe(5)
    })
})