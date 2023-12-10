"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequest = void 0;
const db_1 = require("../../global/db");
function getRequest(req, res, query, data, check_session) {
    db_1.db.query(query, data, (error, result) => {
        if (error)
            return res.status(500).send("Error, something goes wrong!");
        if (!req.session.user_key && check_session)
            return res.status(401).send("Unauthorized");
        return res.status(200).json(result).end();
    });
}
exports.getRequest = getRequest;
