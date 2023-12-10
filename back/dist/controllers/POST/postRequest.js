"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRequest = void 0;
const db_1 = require("../../global/db");
function postRequest(req, res, query, error_text, data) {
    db_1.db.query(query, data, (error) => {
        if (error)
            return res.status(500).send(error_text);
        return res.status(200).send("Successfully!");
    });
}
exports.postRequest = postRequest;
