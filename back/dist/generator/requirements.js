"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateRequirements = exports.getRandomInt = void 0;
const required_titles = [
    "Parking Area",
    "Equipment and Tool Organization",
    "Spare Parts Storage",
    "Service Bays",
    "Waiting Area for Customers",
    "Administrative Space",
    "Loading Bays",
    "Storage"
];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;
const colors = [
    { icon_color: "#FFA500" },
    { icon_color: "#ffbf00" },
    { icon_color: "#FFFF00" },
    { icon_color: "#32CD32" },
    { icon_color: "#50c878" },
    { icon_color: "#00FFFF" },
    { icon_color: "#87ceeb" },
    { icon_color: "#0000FF" }
];
const icons = [
    "ParkingCircle",
    "Cable",
    "Boxes",
    "LandPlot",
    "Timer",
    "User",
    "Warehouse",
    "Archive"
];
function GenerateRequirements() {
    const array = [];
    for (let i = 0; i < getRandomInt(1, 5); i++) {
        let idx = getRandomInt(0, required_titles.length - 1);
        array.push({
            title: required_titles[idx],
            price: getRandomInt(20, 200),
            processing: getRandomInt(1, 4),
            color: colors[idx],
            icon: icons[idx]
        });
    }
    const uniqueArray = array.reduce((accumulator, currentValue) => {
        const existing = accumulator.find((obj) => obj.title === currentValue.title);
        if (!existing) {
            return accumulator.concat(currentValue);
        }
        else {
            return accumulator;
        }
    }, []);
    return uniqueArray;
}
exports.GenerateRequirements = GenerateRequirements;
