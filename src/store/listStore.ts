import create from "solid-zustand";

interface ListItem {
  name: string;
  image: string;
  order: number;
  tier: string;
  isDecoy: boolean;
}

interface Tier {
  name: string;
  index: number;
  items: ListItem[];
}

interface ListStore {
  tiers: Tier[];
  oldTiers: Tier[];
  moveItem: (item: ListItem, from: String, to: String) => void;
}

const useListStore = create<ListStore>((set) => ({
  tiers: [
    {
      name: "S",
      index: 0,
      items: [
        {
          name: "Ichigo",
          image:
            "https://www.espada-art.com/cdn/shop/products/coverphoto_9e5e7b43-80d1-408f-8a09-2a79b7e29ca2_grande.png?v=1651602628",
          order: 0,
          isDecoy: false,
          tier: "S",
        },
        {
          name: "Rukia",
          image:
            "https://www.espada-art.com/cdn/shop/products/coverphoto_9e5e7b43-80d1-408f-8a09-2a79b7e29ca2_grande.png?v=1651602628",
          order: 1,
          isDecoy: false,
          tier: "S",
        },
        {
          name: "Renji",
          image:
            "https://www.espada-art.com/cdn/shop/products/coverphoto_9e5e7b43-80d1-408f-8a09-2a79b7e29ca2_grande.png?v=1651602628",
          order: 2,
          isDecoy: false,
          tier: "S",
        },
      ],
    },
    {
      name: "A",
      index: 1,
      items: [],
    },
  ],
  oldTiers: [],
  moveItem: (item, from, to) =>
    set((state) => {
      const oldTiers = [...state.tiers];
      const toTier = state.tiers.find((tier) => tier.name === to);
      const toTierIndex = state.tiers.findIndex(
        (tier) => tier.name === toTier?.name
      );
      const fromTierIndex = state.tiers.findIndex((tier) => tier.name === from);
      toTier?.items.push(item);
      const fromTier = state.tiers.find((tier) => tier.name === from);
      const newFromTier = fromTier?.items.filter(
        (thisItem) => thisItem.name !== item.name
      );
      const newTiers = [...state.tiers];
      if (newFromTier !== undefined)
        newTiers[fromTierIndex].items = newFromTier;
      if (toTier !== undefined) newTiers[toTierIndex].items = toTier?.items;

      //   console.log(newTiers);

      return {
        tiers: [...newTiers],
        oldTiers: oldTiers,
      };
    }),
  clearList: () =>
    set((state) => {
      const oldTiers = [...state.tiers];
      const newTiers = [...state.tiers];
      newTiers.forEach((tier) => {
        tier.items = [];
      });
      console.log(newTiers);
      return {
        tiers: [...newTiers],
        oldTiers: oldTiers,
      };
    }),
}));

export default useListStore;
