import { ITEM_STATUS, Prisma } from "@prisma/client";
import { FC } from "react";
import Card from "./Card";

const shoppingListWithItems = Prisma.validator<Prisma.ShoppingListArgs>()({
  include: { items: true },
});

type ShoppingListWithItems = Prisma.ShoppingListGetPayload<
  typeof shoppingListWithItems
>;

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ShoppingListCard: FC<{ shoppingList: ShoppingListWithItems }> = ({
  shoppingList,
}) => {
  const boughtCount = shoppingList.items.filter(
    (item) => item.status === ITEM_STATUS.BOUGHT
  ).length;

  const progress = Math.ceil((boughtCount / shoppingList.items.length) * 100);

  return (
    <Card className="!px-6 !py-8 hover:bg-violet-100 transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">
          {formatDate(shoppingList.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{shoppingList.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {boughtCount}/{shoppingList.items.length} bought
        </span>
      </div>
      <div>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className={`h-full text-center text-xs text-white bg-violet-600 rounded-full`}
            style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600 font-semibold">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ShoppingListCard;
