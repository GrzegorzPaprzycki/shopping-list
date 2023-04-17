import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import { getUserFromCookie } from "@/lib/auth";
import { delay } from "@/lib/async";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import ShoppingListCard from "@/components/ShoppingListCard";
import Link from "next/link";
import ItemCard from "@/components/ItemCard";
import NewShoppingList from "@/components/NewShoppingList";

const getData = async () => {
  await delay(500);
  const user = await getUserFromCookie(cookies());

  const shoppingLists = await db.shoppingList.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      items: true,
    },
  });

  return shoppingLists;
};

export default async function Page() {
  const shoppingLists = await getData();

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {shoppingLists.map((list) => (
            <div key={list.id} className="w-full p-3">
              <Link href={`/shoppingList/${list.id}`}>
                <ShoppingListCard shoppingList={list} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">
            <NewShoppingList />
          </div>
        </div>
      </div>
    </div>
  );
}
