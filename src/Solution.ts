import fs from "fs"
import Contender from "./Contender"
export default class Solution{
    contenders: Contender[] = []
    rightGuesses: string = ""

    constructor(source: string) {
        fs.readFileSync(source).toString().split("\n").forEach(x=> {
            if(x != "" && x.includes(" "))
                this.contenders.push(new Contender(x));
            else if(x != "")
                this.rightGuesses = x;
        })
    }

    countcontenders(): number{
        return this.contenders.length;
    }
}