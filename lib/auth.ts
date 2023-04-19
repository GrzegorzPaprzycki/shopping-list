import bcrypt from "bcrypt";
import { db } from "./db";
import { validateJWT } from "./jwt";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

export const getUserFromCookie = async (cookies: any) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
