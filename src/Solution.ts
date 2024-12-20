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

    private get getSortedByPoints(): Contender[]{
        let sortedContenders: Contender[] = []
        this.#contenders.forEach(x=>{
            x.Points = this.getContendersPoints(x.Id)
            sortedContenders.push(x)
        })
        sortedContenders = sortedContenders.sort((a,b) => b.Points - a.Points)
        return sortedContenders
    }

    constructor(source: string) {
        fs.readFileSync(source).toString().split("\n").forEach(x=> {
            if(x != "" && x.includes(" "))
                this.#contenders.push(new Contender(x.trim()));
            else if(x != "")
                this.#rightGuesses = x;
        })
    }

    countContenders(): number{
        return this.#contenders.length;
    }

    private getContenderById(id: string): Contender{
        return this.#contenders.filter(x => x.Id == id.toUpperCase())[0]
    }

    getGuessesFromInputId(inputId: string): string{
        if(inputId != ""){
            const selectedContender = this.getContenderById(inputId)
            if(selectedContender != null)
                return selectedContender.Guesses + " (a versenyző válasza)"
            return "Ilyen versenyző nincsen!"
        } return ""
    }

    checkGuesses(id:string): string{
        let result: string = `\n4. feladata:\n${this.#rightGuesses.trim()}\t(a helyes megoldás)\n`
        if(this.getContenderById(id) == null)
            return ""
        else
        { 
            for (let i = 0; i < this.#rightGuesses.length; i++) {
                if(this.getContenderById(id).Guesses[i] == this.#rightGuesses[i])
                    result += "+"
                else
                    result += " "
            }
        }
        return result
    }

    getStatisticsByInput(round: string): Statistic {
        let correctContenders: number = 0
        for (const c of this.#contenders) {
            if(c.Guesses[Number(round)-1] === this.#rightGuesses[Number(round)-1])
                correctContenders++;
        }
        return {count: correctContenders, percentage: Number(((correctContenders / this.countContenders()) * 100).toFixed(2))};
    }

    getContendersPoints(id: string): number{
        let points: number = 0
        let round: number = 1
        this.checkGuesses(id).split("\n")[3].split("").forEach(x => {
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

    writeContenderpointsFile(): void{
        let fileContent: string = ""
        this.#contenders.forEach(x => {
            fileContent += x.Id + " " + this.getContendersPoints(x.Id) + "\n"
        })
        fs.writeFileSync("pontok.txt", fileContent)
    }

    showTheThreeBest(): string | undefined{
        let output: string = ""
        let placement: number = 1
        for (let i = 0; i < this.getSortedByPoints.length; i++) {
            if(placement <= 3){
                output += `\n${placement}. díj (${this.getSortedByPoints[i].Points} pont): ${this.getSortedByPoints[i].Id}`
                this.getSortedByPoints[i].Points == this.getSortedByPoints[i + 1].Points ? placement = placement : placement += 1
            } else{
                return output
            }
        }
    }
}