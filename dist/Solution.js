"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Solution_contenders, _Solution_rightGuesses;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Contender_1 = __importDefault(require("./Contender"));
class Solution {
    get numberOfRound() {
        return __classPrivateFieldGet(this, _Solution_rightGuesses, "f").trim().length;
    }
    constructor(source) {
        _Solution_contenders.set(this, []);
        _Solution_rightGuesses.set(this, "");
        fs_1.default.readFileSync(source).toString().split("\n").forEach(x => {
            if (x != "" && x.includes(" "))
                __classPrivateFieldGet(this, _Solution_contenders, "f").push(new Contender_1.default(x.trim()));
            else if (x != "")
                __classPrivateFieldSet(this, _Solution_rightGuesses, x, "f");
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
        let result = "\n 4. feladata: \n" + __classPrivateFieldGet(this, _Solution_rightGuesses, "f") + "\n";
        if (this.getContenderById(id) == null) {
            console.log("Nincs ilyen versenyző!");
            return "";
        }
        else {
            this.getContenderById(id).Guesses.split("").forEach(x => {
                for (let i = 0; i < x.length; i++)
                    if (x[i] == __classPrivateFieldGet(this, _Solution_rightGuesses, "f")[i]) {
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
            if (c.Guesses[Number(round) - 1] === __classPrivateFieldGet(this, _Solution_rightGuesses, "f")[Number(round) - 1])
                correctContenders++;
        }
        return { count: correctContenders, percentage: Number(((correctContenders / this.countcontenders()) * 100).toFixed(2)) };
    }
}
_Solution_contenders = new WeakMap(), _Solution_rightGuesses = new WeakMap();
exports.default = Solution;
