import { db } from "../../global/db";

import { Response, Request } from "express";

export function postRequest(
  req: Request,
  res: Response,
  query: string,
  error_text: string,
  data?: any
) {
  db.query(query, data, (error: Error) => {
    if (error) return res.status(500).send(error_text);

    return res.status(200).send("Successfully!");
  });
}
