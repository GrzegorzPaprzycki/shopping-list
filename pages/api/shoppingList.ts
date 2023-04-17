import { validateJWT } from "@/lib/jwt";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieName = process.env.COOKIE_NAME;
  if (cookieName) {
    const user = await validateJWT(req.cookies[cookieName]!);

    await db.shoppingList.create({
      data: {
        name: req.body.name,
        ownerId: user.id,
      },
    });
  }

  res.json({ data: { message: "Project added successfully." } });
}
