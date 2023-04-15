import { IUserData } from "@/components/Authform";

type IParams = {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  json?: boolean;
};

const fetcher = async ({ url, method, body }: IParams) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error on API side");
  }

  const data = await res.json();
  return data.data;
};

export const register = (user: IUserData) => {
  return fetcher({ url: "/api/register", method: "POST", body: user });
};

export const signin = (user: IUserData) => {
  return fetcher({ url: "/api/signin", method: "POST", body: user });
};

export const createNewShoppingList = (name: string) => {
  return fetcher({ url: "/api/shoppingList", method: "POST", body: { name } });
};
