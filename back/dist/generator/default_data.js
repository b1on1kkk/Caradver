"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const requirements_1 = require("./requirements");
const schedule_1 = __importDefault(require("./schedule"));
function Generator() {
    const uns = [];
    let counter = 1;
    while (counter <= 2) {
        if (counter === 1) {
            for (let i = 1; i <= 10; i++) {
                uns.push({
                    id: `A${i}`,
                    status: getRandomInt(0, 1) ? true : false,
                    todos: "",
                    required: JSON.stringify((0, requirements_1.GenerateRequirements)()),
                    schedule: JSON.stringify((0, schedule_1.default)())
                });
            }
        }
        else {
            for (let i = 1; i <= 10; i++) {
                uns.push({
                    id: `B${i}`,
                    status: getRandomInt(0, 1) ? true : false,
                    todos: "",
                    required: JSON.stringify((0, requirements_1.GenerateRequirements)()),
                    schedule: JSON.stringify((0, schedule_1.default)())
                });
            }
        }
        counter++;
    }
    return uns;
}
exports.Generator = Generator;
