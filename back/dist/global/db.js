"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql = require("mysql");
exports.db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "caradver"
});
