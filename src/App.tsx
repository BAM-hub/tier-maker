import { Component, createSignal } from "solid-js";
import styles from "./App.module.css";
import Tier from "./components/Tier";
import { ListItem } from "./tier";
import CustomDrag from "./components/CustomDrag";

const App: Component = () => {
  const [draggedItem, setDraggedItem] = createSignal<ListItem | undefined>(
    undefined
  );
  const [mouseIndex, setMouseIndex] = createSignal({ x: -1, y: -1 });

  const [isDragging, setIsDragging] = createSignal(false);
  const [isMouseDown, setIsMouseDown] = createSignal(false);

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
  const [items, setItems] = createSignal([
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
          mouseIndex={mouseIndex}
          index={index}
        />
      ))}
      <div
        style={{
          display: "flex",
          margin: "100px",
          border: "1px solid black",
        }}
      >
        {items().map((item) => (
          <CustomDrag
            isMouseDown={isMouseDown}
            setIsMouseDown={setIsMouseDown}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            item={item}
            draggedItem={draggedItem}
            setDraggedItem={setDraggedItem}
            setMouseIndex={setMouseIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
