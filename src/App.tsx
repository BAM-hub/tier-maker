import { Component, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import styles from "./App.module.css";
import DraggableImage from "./components/DraggableImage";
import Tier from "./components/Tier";
import useListStore from "./store/listStore";

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
  // moveItem: (item: ListItem, from: String, to: String) => void;
}

const App: Component = () => {
  const characters = [];
  // const { tiers } = useListStore();
  const [tiers, setTiers] = createSignal([
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
  ]);
  const moveItem = (item: ListItem, from: string, to: string) => {
    const oldTiers = tiers();
    const toTier = tiers().find((tier) => tier.name === to);
    const toTierIndex = tiers().findIndex((tier) => tier.name === toTier?.name);
    const fromTierIndex = tiers().findIndex((tier) => tier.name === from);
    toTier?.items.push(item);
    const fromTier = tiers().find((tier) => tier.name === from);
    const newFromTier = fromTier?.items.filter(
      (thisItem) => thisItem.name !== item.name
    );
    const newTiers = tiers();
    if (newFromTier !== undefined) newTiers[fromTierIndex].items = newFromTier;
    if (toTier !== undefined) newTiers[toTierIndex].items = toTier?.items;

    //   console.log(newTiers);

    // return {
    //   tiers: [...newTiers],
    //   oldTiers: oldTiers,
    // };
    setTiers([...newTiers]);
  };
  return (
    <div class={styles.App}>
      {tiers().map((tier) => (
        <Tier title={tier.name}>
          {tier?.items.map((character) => (
            <DraggableImage
              isDecoy={character.isDecoy}
              name={character.name}
              order={character.order}
              tier={character.tier}
              image={character.image}
              moveItem={moveItem}
            />
          ))}
        </Tier>
      ))}
    </div>
  );
};

export default App;
