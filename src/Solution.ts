import fs from "fs"
import Contender from "./Contender"

interface Statistic{
    count: number,
    percentage: number
}
export default class Solution{
    #contenders: Contender[] = []
    #rightGuesses: string = ""
    
    get numberOfRound(): number{
        return this.#rightGuesses.trim().length
    }

    get getContenders(): Contender[]{
        return this.#contenders
    }

    constructor(source: string) {
        fs.readFileSync(source).toString().split("\n").forEach(x=> {
            if(x != "" && x.includes(" "))
                this.#contenders.push(new Contender(x.trim()));
            else if(x != "")
                this.#rightGuesses = x;
        })
    }

    countcontenders(): number{
        return this.#contenders.length;
    }

    private getContenderById(id: string): Contender{
        return this.#contenders.filter(x => x.Id == id.toUpperCase())[0]
    }

    getGuessesFromInputId(inputId: string): string{
        if(inputId != ""){
            if(inputId.length > 5)
                return "A versenyző kódja nem lehet 5 karakternél több!"
            const selectedContenter = this.getContenderById(inputId)
            if(selectedContenter != null)
                return selectedContenter.Guesses + " (a versenyző válasza)"
            return "Ilyen versenyző nincsen!"
        } return ""
    }
    checkGuesses(id:string): string{
        let result: string = "\n 4. feladata: \n" + this.#rightGuesses + "\n"
        if(this.getContenderById(id) == null)
        {
            console.log("Nincs ilyen versenyző!")
            return ""
        }
        else
        {        this.getContenderById(id).Guesses.split("").forEach(x => {
            for(let i = 0; i < x.length; i++)
                if(x[i] == this.#rightGuesses[i])
                {
                    console.log(result)
                    result += "+"
                }

            else
            {
                result += " "
            }
        })
        return result
    }}

    getStatisticsByInput(round: string): Statistic | null {
        let correctContenders: number = 0
        for (const c of this.#contenders) {
            if(c.Guesses[Number(round)-1] === this.#rightGuesses[Number(round)-1])
                correctContenders++;
        }
        return {count: correctContenders, percentage: Number(((correctContenders / this.countcontenders()) * 100).toFixed(2))};
    }

    getContendersPoints(id: string): number{
        let points: number = 0
        let round: number = 1
        this.checkGuesses(id).split("\n")[3].split("").forEach(x => {
            console.log(x)
            if(x == "+" && round >= 1 && round <= 5)
                points += 3
            else if(x == "+" && round >= 6 && round <= 10)
                points += 4
            else if(x == "+" && round >= 11 && round <= 13)
                points += 5
            else if(x == "+" && round == 14)
                points += 6
            round++
        })
        return points
    }

    contenderpointsfile(): void{
        let fileContent: string = ""
        this.#contenders.forEach(x => {
            fileContent += x.Id + " " + this.getContendersPoints(x.Id) + "\n"
        })
        fs.writeFileSync("pontok.txt", fileContent)
    }
}