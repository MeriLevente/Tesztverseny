"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Solution_contenders;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Contender_1 = __importDefault(require("./Contender"));
class Solution {
    constructor(source) {
        _Solution_contenders.set(this, []);
        this.rightGuesses = "";
        fs_1.default.readFileSync(source).toString().split("\n").forEach(x => {
            if (x != "" && x.includes(" "))
                __classPrivateFieldGet(this, _Solution_contenders, "f").push(new Contender_1.default(x.trim()));
            else if (x != "")
                this.rightGuesses = x;
        });
    }
    countcontenders() {
        return __classPrivateFieldGet(this, _Solution_contenders, "f").length;
    }
    getContenderById(id) {
        return __classPrivateFieldGet(this, _Solution_contenders, "f").filter(x => x.Id == id.toUpperCase())[0];
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
    checkGuesses(id) {
        let result = "\n 4. feladata: \n" + this.rightGuesses + "\n";
        if (this.getContenderById(id) == null) {
            console.log("Nincs ilyen versenyző!");
            return "";
        }
        else {
            this.getContenderById(id).Guesses.split("").forEach(x => {
                for (let i = 0; i < x.length; i++)
                    if (x[i] == this.rightGuesses[i]) {
                        console.log(result);
                        result += "+";
                    }
                    else {
                        result += " ";
                    }
            });
            return result;
        }
    }
    getStatisticsByInput(round) {
        let correctContenders = 0;
        for (const c of __classPrivateFieldGet(this, _Solution_contenders, "f")) {
            if (c.Guesses[Number(round) - 1] === this.rightGuesses[Number(round) - 1])
                correctContenders++;
        }
        return correctContenders;
    }
}
_Solution_contenders = new WeakMap();
exports.default = Solution;
