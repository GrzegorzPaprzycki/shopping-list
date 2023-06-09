import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Card from "./Card";
import { delay } from "@/lib/async";

const getData = async () => {
  await delay(500);
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greetings = async () => {
  const user = await getData();

  if (!user) return null;
  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Welcome, {user.firstName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Lets go and start some shopping.
        </h4>
      </div>
    </Card>
  );
};

export default Greetings as any;
