"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        return callback(null, file.originalname);
    }
});
function fileFilter(req, file, cb) {
    console.log(file);
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    //   &&
    // file.size < 2 * 1024 * 1024
    ) {
        cb(null, true);
    }
    else {
        cb(null, false);
        const err = new Error("Only .png, .jpg format allowed and 2MB max picture size!");
        err.name = "ExtensionOrMemoryError";
        return cb(err);
    }
}
exports.fileFilter = fileFilter;
exports.default = storage;
