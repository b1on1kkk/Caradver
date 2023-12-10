"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromDatabase = void 0;
const db_1 = require("../../global/db");
function deleteFromDatabase(req, res, query, id) {
    return db_1.db.query(query, id, (error) => {
        if (error)
            return res.status(500).send("Error while trying to unbook!");
        res.status(200).send("Unbooked!");
    });
}
exports.deleteFromDatabase = deleteFromDatabase;
