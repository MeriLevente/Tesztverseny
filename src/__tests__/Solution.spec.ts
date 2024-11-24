import Solution from "../Solution"

const sol: Solution = new Solution("valaszok.txt")

describe("1.feladat tesztelése", ()=>{
    it("Az adatokat beolvasása sikere, a contenders vektor nem üres", ()=>{
        expect(sol.getContenders.length).toBeGreaterThan(0)
    })
})