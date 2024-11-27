import Solution from "../Solution"

const sol: Solution = new Solution("valaszok.txt")

describe("1.feladat tesztelése", ()=>{
    it("Az adatokat beolvasása sikere, a contenders vektor nem üres", ()=>{
        expect(sol.getContenders.length).toBeGreaterThan(0)
    })
})

describe("2.feladat tesztelése", ()=>{
    it("helyesen számolja meg a versenzőket", ()=>{
        expect(sol.countcontenders()).toBe(303)
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
    it("A felhasználó bevitt egy azonosítót, ami 5 karakternél hosszabb", ()=>{
        expect(sol.getGuessesFromInputId("AB1234")).toBe("A versenyző kódja nem lehet 5 karakternél több!")
    })
})

describe("4.feladat tesztelése", ()=>{
    it("A helyes választ megjeleniti a függvény", ()=>{
        expect(sol.checkGuesses("AB123").split("\n")[2].trim().split("\t")[0]).toBe("BCCCDBBBBCDAAA")
})
    it("helyesen irja ki a felhasználo helyes válaszait", ()=>{
        expect(sol.checkGuesses("AB123").split("\n")[3]).toBe("+   ++      + ")
    })
})

describe("5.feladat tesztelése", ()=>{
    it("A felhasználó bevitt egy fordulószámot, és visszakapta a helyes válaszok számát", ()=>{
        expect(sol.getStatisticsByInput("10")?.count).toBe(111)
    })
    it("A felhasználó bevitt egy fordulószámot, és visszakapta a helyes válaszok számát százalékban", ()=>{
        expect(sol.getStatisticsByInput("10")?.percentage).toBe(36.63)
    })
})

describe("6.feladat tesztelése", ()=>{
    it("A versenyzők pontszámait helyesen számolja ki", ()=>{
        expect(sol.getContendersPoints("AB123")).toBe(15) //Oktatási Hivatal kiadott megoldott pontok.txt-t hasonlísd össze a mi pontok.txt-kel
    })
    it("Lefut e a fájl irása", ()=>{
        expect(sol.contenderpointsfile()).toBeCalled // toHaveBeenCalled()
    })
})

describe("7.feladat tesztelése", ()=>{
    it("A legjobb eredményt helyesen írja ki", ()=>{
        expect(sol.showTheThreeBest(sol.getPointsSorted()).split("\n")[1].trim()).toBe("1. díj (56 pont): JO001") //javítás szükséges
    })
    it("A képernyőre kiíratás 5 sorral tér vissza", ()=>{
        expect(sol.showTheThreeBest(sol.getPointsSorted()).split("\n").length).toBe(5) //javítás szükséges
    })
})