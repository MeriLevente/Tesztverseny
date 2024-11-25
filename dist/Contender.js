"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contender {
    constructor(line) {
        const data = line.split(" ");
        this.Id = data[0];
        this.Guesses = data[1];
        this.Points = 0;
    }
}
exports.default = Contender;
