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
                this.contenders.push(new Contender_1.default(x));
            else if (x != "")
                this.rightGuesses = x;
        });
    }
}
exports.default = Solution;
