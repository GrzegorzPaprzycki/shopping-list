import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Item, ITEM_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Card from "./Card";
import NewItem from "./NewItem";

type IProps = {
  items?: Item[];
  title: string;
  listId: string;
  withButton: boolean;
};

const getData = async (listId: string) => {
  const user = await getUserFromCookie(cookies());
  const items = await db.item.findMany({
    where: {
      ownerId: user?.id,
      shoppingListId: listId,
      NOT: [
        {
          status: ITEM_STATUS.BOUGHT,
        },
        {
          status: ITEM_STATUS.PLACED,
        },
        {
          deleted: true,
        },
      ],
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return items;
};

const ItemCard = async ({
  items,
  title,
  listId,
  withButton = true,
}: IProps) => {
  console.log(items);
  const data = items || (await getData(listId));

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        {withButton ? (
          <div>
            <NewItem />
          </div>
        ) : null}
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((item) => (
              <div className="py-2 " key={item.id}>
                <div>
                  <span className="text-gray-800">{item.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no items to buy</div>
        )}
      </div>
    </Card>
  );
};

export default ItemCard as any;
