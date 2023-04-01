import { db } from "@/lib/db";
import { ITEM_STATUS } from "@prisma/client";

const getRandomItemStatus = () => {
  const statuses = [
    ITEM_STATUS.NOT_BOUGHT,
    ITEM_STATUS.BOUGHT,
    ITEM_STATUS.PLACED,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const user = await db.user.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      firstName: "User",
      lastName: "Person",
      password: "password",
      shoppingLists: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Shopping list ${i}`,
          due: new Date(2022, 11, 25),
        })),
      },
    },
    include: {
      shoppingLists: true,
    },
  });

  const items = await Promise.all(
    user.shoppingLists.map((shoppingList) =>
      db.item.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Item ${i}`,
            ownerId: user.id,
            shoppingListId: shoppingList.id,
            description: `Everything that describes Item ${i}`,
            status: getRandomItemStatus(),
          };
        }),
      })
    )
  );

  console.log({ user, items: items });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
