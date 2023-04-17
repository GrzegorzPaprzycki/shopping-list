import { db } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import ItemList from "@/components/ItemList";

type IProps = {
  params: { id: string };
};

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());

  const shoppingList = await db.shoppingList.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      items: true,
    },
  });

  return shoppingList;
};

export default async function ShoppingListPage({ params }: IProps) {
  const shoppingList = await getData(params.id);
  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <ItemList
        items={shoppingList?.items}
        title={shoppingList?.name}
        listId={params.id}
      />
    </div>
  );
}
