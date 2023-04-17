import { validateJWT } from "@/lib/jwt";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ITEM_STATUS } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieName = process.env.COOKIE_NAME;
  if (cookieName) {
    const user = await validateJWT(req.cookies[cookieName]!);

    if (req.method === "POST") {
      await db.item.create({
        data: {
          name: req.body.name,
          ownerId: user.id,
          shoppingListId: req.body.id,
        },
      });
      res.json({ data: { message: "Project added successfully." } });
    } else if (req.method === "PATCH") {
      await db.item.update({
        where: {
          id: req.body.itemId,
        },
        data: {
          status: ITEM_STATUS.BOUGHT,
        },
      });
    }
  }
}
