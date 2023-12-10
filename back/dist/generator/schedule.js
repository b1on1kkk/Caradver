"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requirements_1 = require("./requirements");
const titles = [
    "Check the oil level and change the oil if necessary.",
    "Check the tire pressure and tread depth, and rotate the tires if needed.",
    "Inspect the brakes and replace the brake pads if necessary.",
    "Check the battery and replace it if its old or not holding a charge.",
    "Inspect the belts and hoses and replace them if they are worn or damaged.",
    "Check the air filter and replace it if its dirty.",
    "Check the coolant level and replace the coolant if necessary."
];
function ScheduleGenerator() {
    const array = [];
    for (let i = 0; i < (0, requirements_1.getRandomInt)(1, 5); i++) {
        array.push({
            title: titles[(0, requirements_1.getRandomInt)(0, titles.length - 1)],
            date: "10:00",
            price: (0, requirements_1.getRandomInt)(100, 3000),
            status: (0, requirements_1.getRandomInt)(0, 1) ? 1 : 0
        });
    }
    return array;
}
exports.default = ScheduleGenerator;
