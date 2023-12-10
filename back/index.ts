import express, { Express, Request, Response } from "express";
import session from "express-session";
import path = require("path");

// database
import { db } from "./global/db";
//

// multer
import multer from "multer";
import storage from "./multer_config/multer_config";
import { fileFilter } from "./multer_config/multer_config";
const upload = multer({ storage, fileFilter: fileFilter });
//

// utils
import { getRequest } from "./controllers/GET/getRequest";
import { postRequest } from "./controllers/POST/postRequest";
import { deleteFromDatabase } from "./controllers/DELETE/deleteFromDatabase";
//

// middlewares
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "user",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 26280000 }
  })
);

const corsConfig = {
  origin: true,
  credentials: true
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
//

////////////////////////////////////////////////GET////////////////////////////////////////////////

app.get("/service", (req: Request, res: Response) =>
  getRequest(req, res, "SELECT * FROM service WHERE id = ?", [req.query.block])
);

app.get("/all_service", (req: Request, res: Response) =>
  getRequest(req, res, "SELECT * FROM service")
);

app.get("/user", (req: Request, res: Response) =>
  getRequest(
    req,
    res,
    "SELECT id, name, surname, email, city, address, birthday, gender, photo_link, facebook_link, twitter_link, localstorage, role FROM users WHERE unique_key = ?",
    [req.session.user_key],
    true
  )
);

app.get("/cars", (req: Request, res: Response) => {
  if (req.query.car_id) {
    getRequest(req, res, "SELECT * FROM cars WHERE id = ?", [req.query.car_id]);
  } else if (req.query.brand) {
    getRequest(req, res, "SELECT * FROM cars WHERE brand = ?", [
      req.query.brand
    ]);
  } else {
    getRequest(req, res, "SELECT * FROM cars");
  }
});

app.get("/photos", (req: Request, res: Response) => {
  const arrayOfQueryValues = req.query;

  if ("picture" in arrayOfQueryValues) {
    res.sendFile(
      path.join(__dirname, "../", "uploads", `${arrayOfQueryValues.picture}`)
    );
  }
});

app.get("/booked_services", (req: Request, res: Response) =>
  getRequest(req, res, "SELECT * FROM booked_services")
);

app.get("/booked_service", (req: Request, res: Response) => {
  getRequest(req, res, "SELECT * FROM booked_services WHERE id = ?", [
    req.query.id
  ]);
});

app.get("/booked_idx", (req: Request, res: Response) =>
  getRequest(req, res, "SELECT car_list_id FROM booked_cars")
);

app.get("/all_booked", (req: Request, res: Response) =>
  getRequest(req, res, "SELECT * FROM booked_cars")
);

app.get("/booked_car_by_id", (req: Request, res: Response) =>
  getRequest(req, res, "SELECT * FROM booked_cars WHERE id = ?", [req.query.id])
);

////////////////////////////////////////////////GET////////////////////////////////////////////////

////////////////////////////////////////////////POST////////////////////////////////////////////////

app.post("/sign_up", (req: Request, res: Response) => {
  req.session.user_key = req.body.unique_key;

  postRequest(req, res, "INSERT INTO users SET ?", "Something does wrong", [
    req.body
  ]);
});

app.post("/log_in", (req: Request, res: Response) => {
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [...Object.values(req.body)],
    (error: Error, result: any) => {
      if (error)
        return res.status(500).send("Error inserting data into database");

      if (result.length === 0)
        return res.status(500).send("User is not found!");

      req.session.user_key = result[0].unique_key;

      return res.status(200).end();
    }
  );
});

app.post("/remove_cookie", (req: Request, res: Response) => {
  postRequest(
    req,
    res,
    "UPDATE users SET localstorage = ? WHERE unique_key = ?",
    "Error! something goes wrong",
    [req.body.data, req.session.user_key]
  );

  req.session.destroy(() => {});
});

app.post("/update_profile", (req: Request, res: Response) => {
  postRequest(
    req,
    res,
    "UPDATE users SET city = ?, address = ?, email = ?, birthday = ?, gender = ?, facebook_link = ?, twitter_link = ?, photo_link = ? WHERE unique_key = ?",
    "Error updating data",
    [...Object.values(req.body), req.session.user_key]
  );
});

app.post("/files_upload", upload.single("avatar"), (_, res: Response) => {
  res.status(200).send("File uploaded!");
});

app.post("/confirm_booking", (req: Request, res: Response) => {
  postRequest(
    req,
    res,
    "INSERT INTO booked_cars SET ?",
    "Something does wrong!",
    [req.body]
  );
});

app.post("/book_service", (req: Request, res: Response) => {
  postRequest(
    req,
    res,
    "INSERT INTO booked_services SET ?",
    "This service is already booked, choose another!",
    [req.body]
  );
});

////////////////////////////////////////////////POST////////////////////////////////////////////////

////////////////////////////////////////////////DELETE////////////////////////////////////////////////

app.delete("/unbooked_car_by_id", (req: Request, res: Response) =>
  deleteFromDatabase(req, res, "DELETE FROM booked_cars WHERE id = ?", [
    req.query.id
  ])
);

app.delete("/unbooked_service_by_id", (req: Request, res: Response) =>
  deleteFromDatabase(req, res, "DELETE FROM booked_services WHERE id = ?", [
    req.query.id
  ])
);

////////////////////////////////////////////////DELETE////////////////////////////////////////////////

app.listen(2000, () => {
  console.log(`Server is running at 2000`);
});
