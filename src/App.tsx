import { Component, createSignal } from "solid-js";
import styles from "./App.module.css";
import Tier from "./components/Tier";
import { ListItem } from "./tier";
import DraggableImage from "./components/DraggableImage";
import { moveItem, removeNonDropedDecoy, unDecoy } from "./utils";

enum EventType {
  Drop,
  DragOver,
}

const App: Component = () => {
  const [draggedItem, setDraggedItem] = createSignal<ListItem | undefined>(
    undefined
  );
  let ref: HTMLDialogElement | undefined;
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
    {
      name: "drag",
      index: 2,
      items: [
        {
          name: "Ichigo",
          image:
            "https://www.espada-art.com/cdn/shop/products/coverphoto_9e5e7b43-80d1-408f-8a09-2a79b7e29ca2_grande.png?v=1651602628",
          order: 0,
          isDecoy: false,
          tier: "drag",
        },
        {
          name: "Rukia",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjnj3m45FxhnX6gxilujwNEPGuYeISeXRoA&usqp=CAU",
          order: 1,
          isDecoy: false,
          tier: "drag",
        },
        {
          name: "Renji",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6at_fd6k1WYyWZUBOKAJliRNMU2cqKDTs6w&usqp=CAU",
          order: 2,
          isDecoy: false,
          tier: "drag",
        },
      ],
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
          index={index}
        />
      ))}
      {/* 
      <button onClick={() => ref?.showModal()}>Add Tier</button>
      <dialog open={true} ref={ref!}>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <label for="tier name">Tier Name: </label>
          <input name="tier name" type="text" />
          <button>Add</button>
        </form>
      </dialog> */}
    </div>
  );
};

export default App;
