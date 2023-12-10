import { Request } from "express";
import { FileFilterCallback } from "multer";

import multer = require("multer");

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "./uploads");
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    return callback(null, file.originalname);
  }
});

export function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  console.log(file);

  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
    //   &&
    // file.size < 2 * 1024 * 1024
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    const err = new Error(
      "Only .png, .jpg format allowed and 2MB max picture size!"
    );
    err.name = "ExtensionOrMemoryError";
    return cb(err);
  }
}

export default storage;
