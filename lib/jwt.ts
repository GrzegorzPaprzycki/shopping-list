import { User } from "@prisma/client";
import { jwtVerify, SignJWT } from "jose";

type IPayloadUser = Pick<User, "id" | "email">;

type IPayload = {
  user: IPayloadUser;
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
