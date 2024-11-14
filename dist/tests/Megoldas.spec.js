"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Megoldas_1 = __importDefault(require("../Megoldas"));
it("Tests work! Remélem.", () => {
    const megoldas = new Megoldas_1.default();
    expect(() => megoldas.hello).toBe("--Hello World!--");
});
