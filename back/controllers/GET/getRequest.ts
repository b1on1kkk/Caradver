import { db } from "../../global/db";

import { Response, Request } from "express";

export function getRequest(
  req: Request,
  res: Response,
  query: string,
  data?: any,
  check_session?: boolean
) {
  db.query(query, data, (error: Error, result: any) => {
    if (error) return res.status(500).send("Error, something goes wrong!");

    if (!req.session.user_key && check_session)
      return res.status(401).send("Unauthorized");

    return res.status(200).json(result).end();
  });
}
