import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { db } from "./db";

type IPayloadUser = Pick<User, "id" | "email">;

type IPayload = {
  user: IPayloadUser;
};

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  const payload: IPayload = { user: { id: user.id, email: user.email } };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.user as IPayloadUser;
};

export const getUserFromCookie = async (cookies: any) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt);

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
