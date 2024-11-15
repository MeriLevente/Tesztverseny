"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Contender_1 = __importDefault(require("./Contender"));
class Solution {
    constructor(source) {
        this.contenders = [];
        this.rightGuesses = "";
        fs_1.default.readFileSync(source).toString().split("\n").forEach(x => {
            if (x != "" && x.includes(" "))
                this.contenders.push(new Contender_1.default(x.trim()));
            else if (x != "")
                this.rightGuesses = x;
        });
    }
    countcontenders() {
        return this.contenders.length;
    }
    getContenderById(id) {
        return this.contenders.filter(x => x.Id == id.toUpperCase())[0];
    }
    getGuessesFromInputId(inputId) {
        if (inputId != "") {
            if (inputId.length > 5)
                return "A versenyző kódja nem lehet 5 karakternél több!";
            const selectedContenter = this.getContenderById(inputId);
            if (selectedContenter != null)
                return selectedContenter.Guesses + " (a versenyző válasza)";
            return "Ilyen versenyző nincsen!";
        }
        return "";
    }
}
exports.default = Solution;
