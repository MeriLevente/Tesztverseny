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
    get getContenders() {
        return __classPrivateFieldGet(this, _Solution_contenders, "f");
    }
    get getSortedByPoints() {
        let sortedContenders = [];
        __classPrivateFieldGet(this, _Solution_contenders, "f").forEach(x => {
            x.Points = this.getContendersPoints(x.Id);
            sortedContenders.push(x);
        });
        sortedContenders = sortedContenders.sort((a, b) => b.Points - a.Points);
        return sortedContenders;
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
    countContenders() {
        return __classPrivateFieldGet(this, _Solution_contenders, "f").length;
    }
    getContenderById(id) {
        return __classPrivateFieldGet(this, _Solution_contenders, "f").filter(x => x.Id == id.toUpperCase())[0];
    }
    getGuessesFromInputId(inputId) {
        if (inputId != "") {
            const selectedContender = this.getContenderById(inputId);
            if (selectedContender != null)
                return selectedContender.Guesses + " (a versenyző válasza)";
            return "Ilyen versenyző nincsen!";
        }
        return "";
    }
    checkGuesses(id) {
        let result = `\n4. feladata:\n${__classPrivateFieldGet(this, _Solution_rightGuesses, "f").trim()}\t(a helyes megoldás)\n`;
        if (this.getContenderById(id) == null)
            return "";
        else {
            for (let i = 0; i < __classPrivateFieldGet(this, _Solution_rightGuesses, "f").length; i++) {
                if (this.getContenderById(id).Guesses[i] == __classPrivateFieldGet(this, _Solution_rightGuesses, "f")[i])
                    result += "+";
                else
                    result += " ";
            }
        }
        return result;
    }
    getStatisticsByInput(round) {
        let correctContenders = 0;
        for (const c of __classPrivateFieldGet(this, _Solution_contenders, "f")) {
            if (c.Guesses[Number(round) - 1] === __classPrivateFieldGet(this, _Solution_rightGuesses, "f")[Number(round) - 1])
                correctContenders++;
        }
        return { count: correctContenders, percentage: Number(((correctContenders / this.countContenders()) * 100).toFixed(2)) };
    }
    getContendersPoints(id) {
        let points = 0;
        let round = 1;
        this.checkGuesses(id).split("\n")[3].split("").forEach(x => {
            if (x == "+" && round >= 1 && round <= 5)
                points += 3;
            else if (x == "+" && round >= 6 && round <= 10)
                points += 4;
            else if (x == "+" && round >= 11 && round <= 13)
                points += 5;
            else if (x == "+" && round == 14)
                points += 6;
            round++;
        });
        return points;
    }
    writeContenderpointsFile() {
        let fileContent = "";
        __classPrivateFieldGet(this, _Solution_contenders, "f").forEach(x => {
            fileContent += x.Id + " " + this.getContendersPoints(x.Id) + "\n";
        });
        fs_1.default.writeFileSync("pontok.txt", fileContent);
    }
    showTheThreeBest() {
        let output = "";
        let placement = 1;
        for (let i = 0; i < this.getSortedByPoints.length; i++) {
            if (placement <= 3) {
                output += `\n${placement}. díj (${this.getSortedByPoints[i].Points} pont): ${this.getSortedByPoints[i].Id}`;
                this.getSortedByPoints[i].Points == this.getSortedByPoints[i + 1].Points ? placement = placement : placement += 1;
            }
            else {
                return output;
            }
        }
    }
}
_Solution_contenders = new WeakMap(), _Solution_rightGuesses = new WeakMap();
exports.default = Solution;
