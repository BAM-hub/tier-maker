import { Component, createEffect, createSignal, onCleanup } from "solid-js";
import styles from "./App.module.css";
import Tier from "./components/Tier";
import { ListItem } from "./tier";
import DraggableImage from "./components/DraggableImage";

const App: Component = () => {
  const [draggedItem, setDraggedItem] = createSignal<ListItem | undefined>(
    undefined
  );
  const [tiers, setTiers] = createSignal([
    {
      name: "S",
      index: 0,
      items: [],
    },
    {
      name: "A",
      index: 1,
      items: [],
    },
  ]);
  const [draggableImages, setDraggableImages] = createSignal([
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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjnj3m45FxhnX6gxilujwNEPGuYeISeXRoA&usqp=CAU",
      order: 1,
      isDecoy: false,
      tier: "S",
    },
    {
      name: "Renji",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6at_fd6k1WYyWZUBOKAJliRNMU2cqKDTs6w&usqp=CAU",
      order: 2,
      isDecoy: false,
      tier: "S",
    },
  ]);
  return (
    <div class={styles.App}>
      {tiers().map((tier, index) => (
        <Tier
          title={tier.name}
          draggedItem={draggedItem}
          listItems={tier.items}
          setDraggedItem={setDraggedItem}
          setTiers={setTiers}
          tiers={tiers}
          tierIndex={index}
        />
      ))}
      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          {draggableImages().map((img) => (
            <DraggableImage
              setDraggedItem={setDraggedItem}
              unDecoy={() => {}}
              {...img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
