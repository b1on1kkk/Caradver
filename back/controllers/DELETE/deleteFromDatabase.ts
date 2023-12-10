import { Response, Request } from "express";
import { db } from "../../global/db";

export function deleteFromDatabase(
  req: Request,
  res: Response,
  query: string,
  id: any
) {
  return db.query(query, id, (error: Error) => {
    if (error) return res.status(500).send("Error while trying to unbook!");

    res.status(200).send("Unbooked!");
  });
}
