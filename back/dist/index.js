"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path = require("path");
// database
const db_1 = require("./global/db");
//
// multer
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = __importDefault(require("./multer_config/multer_config"));
const multer_config_2 = require("./multer_config/multer_config");
const upload = (0, multer_1.default)({ storage: multer_config_1.default, fileFilter: multer_config_2.fileFilter });
//
// utils
const getRequest_1 = require("./controllers/GET/getRequest");
const postRequest_1 = require("./controllers/POST/postRequest");
const deleteFromDatabase_1 = require("./controllers/DELETE/deleteFromDatabase");
//
// middlewares
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((0, express_session_1.default)({
    secret: "user",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 26280000 }
}));
const corsConfig = {
    origin: true,
    credentials: true
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
//
////////////////////////////////////////////////GET////////////////////////////////////////////////
app.get("/service", (req, res) => (0, getRequest_1.getRequest)(req, res, "SELECT * FROM service WHERE id = ?", [req.query.block]));
app.get("/all_service", (req, res) => (0, getRequest_1.getRequest)(req, res, "SELECT * FROM service"));
app.get("/user", (req, res) => (0, getRequest_1.getRequest)(req, res, "SELECT id, name, surname, email, city, address, birthday, gender, photo_link, facebook_link, twitter_link, localstorage, role FROM users WHERE unique_key = ?", [req.session.user_key], true));
app.get("/cars", (req, res) => {
    if (req.query.car_id) {
        (0, getRequest_1.getRequest)(req, res, "SELECT * FROM cars WHERE id = ?", [req.query.car_id]);
    }
    else if (req.query.brand) {
        (0, getRequest_1.getRequest)(req, res, "SELECT * FROM cars WHERE brand = ?", [
            req.query.brand
        ]);
    }
    else {
        (0, getRequest_1.getRequest)(req, res, "SELECT * FROM cars");
    }
});
app.get("/photos", (req, res) => {
    const arrayOfQueryValues = req.query;
    if ("picture" in arrayOfQueryValues) {
        res.sendFile(path.join(__dirname, "../", "uploads", `${arrayOfQueryValues.picture}`));
    }
});
app.get("/booked_services", (req, res) => (0, getRequest_1.getRequest)(req, res, "SELECT * FROM booked_services"));
app.get("/booked_service", (req, res) => {
    (0, getRequest_1.getRequest)(req, res, "SELECT * FROM booked_services WHERE id = ?", [
        req.query.id
    ]);
});
app.get("/booked_idx", (req, res) => (0, getRequest_1.getRequest)(req, res, "SELECT car_list_id FROM booked_cars"));
app.get("/all_booked", (req, res) => (0, getRequest_1.getRequest)(req, res, "SELECT * FROM booked_cars"));
app.get("/booked_car_by_id", (req, res) => (0, getRequest_1.getRequest)(req, res, "SELECT * FROM booked_cars WHERE id = ?", [req.query.id]));
////////////////////////////////////////////////GET////////////////////////////////////////////////
////////////////////////////////////////////////POST////////////////////////////////////////////////
app.post("/sign_up", (req, res) => {
    req.session.user_key = req.body.unique_key;
    (0, postRequest_1.postRequest)(req, res, "INSERT INTO users SET ?", "Something does wrong", [
        req.body
    ]);
});
app.post("/log_in", (req, res) => {
    db_1.db.query("SELECT * FROM users WHERE email = ? AND password = ?", [...Object.values(req.body)], (error, result) => {
        if (error)
            return res.status(500).send("Error inserting data into database");
        if (result.length === 0)
            return res.status(500).send("User is not found!");
        req.session.user_key = result[0].unique_key;
        return res.status(200).end();
    });
});
app.post("/remove_cookie", (req, res) => {
    (0, postRequest_1.postRequest)(req, res, "UPDATE users SET localstorage = ? WHERE unique_key = ?", "Error! something goes wrong", [req.body.data, req.session.user_key]);
    req.session.destroy(() => { });
});
app.post("/update_profile", (req, res) => {
    (0, postRequest_1.postRequest)(req, res, "UPDATE users SET city = ?, address = ?, email = ?, birthday = ?, gender = ?, facebook_link = ?, twitter_link = ?, photo_link = ? WHERE unique_key = ?", "Error updating data", [...Object.values(req.body), req.session.user_key]);
});
app.post("/files_upload", upload.single("avatar"), (_, res) => {
    res.status(200).send("File uploaded!");
});
app.post("/confirm_booking", (req, res) => {
    (0, postRequest_1.postRequest)(req, res, "INSERT INTO booked_cars SET ?", "Something does wrong!", [req.body]);
});
app.post("/book_service", (req, res) => {
    (0, postRequest_1.postRequest)(req, res, "INSERT INTO booked_services SET ?", "This service is already booked, choose another!", [req.body]);
});
////////////////////////////////////////////////POST////////////////////////////////////////////////
////////////////////////////////////////////////DELETE////////////////////////////////////////////////
app.delete("/unbooked_car_by_id", (req, res) => (0, deleteFromDatabase_1.deleteFromDatabase)(req, res, "DELETE FROM booked_cars WHERE id = ?", [
    req.query.id
]));
app.delete("/unbooked_service_by_id", (req, res) => (0, deleteFromDatabase_1.deleteFromDatabase)(req, res, "DELETE FROM booked_services WHERE id = ?", [
    req.query.id
]));
////////////////////////////////////////////////DELETE////////////////////////////////////////////////
app.listen(2000, () => {
    console.log(`Server is running at 2000`);
});
