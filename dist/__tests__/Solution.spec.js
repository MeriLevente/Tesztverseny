"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Solution_1 = __importDefault(require("../Solution"));
it("Tests work! Remélem.", () => {
    const megoldas = new Solution_1.default();
    expect(megoldas.helloWorld()).toBe("-- Hello World! --");
});
