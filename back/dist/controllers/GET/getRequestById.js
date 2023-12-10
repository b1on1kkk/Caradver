"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestById = void 0;
const db_1 = require("../../global/db");
function getRequestById(req, res, query, data) {
    db_1.db.query(query, data, (error, result) => {
        if (error)
            return res.status(500).send("Error inserting data into database");
        return res.status(200).json(result).end();
    });
}
exports.getRequestById = getRequestById;
