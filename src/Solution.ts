import fs from "fs"
import Contender from "./Contender"
export default class Solution{
    contenders: Contender[] = []
    rightGuesses: string = ""

    constructor(source: string) {
        fs.readFileSync(source).toString().split("\n").forEach(x=> {
            if(x != "" && x.includes(" "))
                this.contenders.push(new Contender(x.trim()));
            else if(x != "")
                this.rightGuesses = x;
        })
    }

    countcontenders(): number{
        return this.contenders.length;
    }

    getContenderById(id: string): Contender{
        return this.contenders.filter(x => x.Id == id.toUpperCase())[0]
    }

    getGuessesFromInputId(inputId: string): string | undefined{
        if(inputId != ""){
            if(inputId.length > 5)
                return "A versenyző kódja nem lehet 5 karakternél több!"
            const selectedContenter = this.getContenderById(inputId)
            if(selectedContenter != null)
                return selectedContenter.Guesses + " (a versenyző válasza)"
            return "Ilyen versenyző nincsen!"
        } return ""
    }
}