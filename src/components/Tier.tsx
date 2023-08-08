import { ParentComponent, createEffect, createSignal } from "solid-js";
import style from "../style/Tier.module.css";
import { ListItem, TierProps } from "../tier";
import DraggableImage from "./DraggableImage";

enum EventType {
  Drop,
  DragOver,
}

function debounce(func: () => void, timeout = 100) {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const Tier: ParentComponent<TierProps> = (props: TierProps) => {
  const { tiers, setTiers, mouseIndex } = props;
  const [items, setItems] = createSignal<ListItem[]>([]);
  const moveItem = (item: ListItem, to: string, event: EventType) => {
    const itemTierIndex = tiers().findIndex(
      (tier) => tier.name === props.draggedItem()?.tier
    );
    const toTierIndex = tiers().findIndex((tier) => tier.name === to);
    const toTierContainsItem = tiers()[toTierIndex].items.find(
      (item) => item.name === props.draggedItem()?.name
    );
    if (toTierContainsItem !== undefined) {
      return;
    }
    const filteredTier = tiers()[itemTierIndex].items.filter(
      (item) => item.name !== props.draggedItem()?.name
    );
    let newTiers = tiers();
    newTiers[itemTierIndex].items = filteredTier;
    // if (toTierContainsItem !== undefined && event === EventType.Drop) {
    // if (props.draggedItem() !== undefined) {
    //   newTiers[toTierIndex].items.push({
    //     ...(props.draggedItem() as ListItem),
    //     tier: to,
    //   });
    //   setTiers([...newTiers]);
    // }
    // } else {
    if (props.draggedItem() !== undefined) {
      newTiers[toTierIndex].items.push({
        ...(item as ListItem),
        tier: to,
      });
      setTiers([...newTiers]);
    }
    // }
  };

  /**
   * this just sets the decoy to false for all items in order to add them visually to the tier
   */
  function unDecoy() {
    const newTiers = tiers().map((tier) => {
      const newItems = tier.items.map((item) => ({
        ...item,
        isDecoy: false,
      }));
      return { ...tier, items: newItems };
    });

    setTiers([...newTiers]);
  }

  /**
   * this removes all decoys from the tier while dragging
   * @param tier
   */
  function removeNonDropedDecoy(tier: string, e: DragEvent) {
    console.log(tier);
    const tierIndex = tiers().findIndex((t) => t.name === tier);
    if (e.clientY >= 100 * tiers().length) {
      return;
    }
    const newItems = tiers()[tierIndex].items.filter(
      (item) => item.isDecoy === false
    );
    const newTiers = tiers();
    newTiers[tierIndex].items = newItems;

    setTiers([...newTiers]);
  }

  createEffect(() => {
    const containsDragged = items().findIndex(
      (item) => item.name === props.draggedItem()?.name
    );

    if (mouseIndex().y === props.index) {
      if (props.draggedItem() && containsDragged === -1) {
        console.log("should debounce");
        // debounce(() => {
        console.log("Debouncing");
        const newItems = [
          ...items(),
          { ...props.draggedItem(), isDecoy: false },
        ];
        // console.log({ newItems, tier: props.title });
        setItems(newItems as ListItem[]);
        // }, 300);
      }
    }
  });

  createEffect(() => {
    const containsDragged = items().findIndex(
      (item) => item.name === props.draggedItem()?.name
    );
    if (mouseIndex().y !== props.index) {
      if (props.draggedItem() && containsDragged !== -1) {
        // debounce(() => {
        const newItems = items().filter((item) => item.isDecoy && item);
        setItems(newItems as ListItem[]);
        // }, 300);
      }
    }
  });

  return (
    <div class={style.tierContainer}>
      <div class={style.tierTitle}>
        <h1>{props?.title}</h1>
      </div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={() => {
          moveItem(
            { ...props.draggedItem(), isDecoy: true } as ListItem,
            props.title,
            EventType.DragOver
          );
        }}
        onDragExit={(e) => {
          removeNonDropedDecoy(props.title, e);
        }}
        onDrop={() => {
          unDecoy();
        }}
        class={style.tierContentContainer}
      >
        {items()?.map((character) => (
          <DraggableImage
            isDecoy={character.isDecoy}
            name={character.name}
            order={character.order}
            tier={character.tier}
            image={character.image}
            setDraggedItem={props.setDraggedItem}
            unDecoy={unDecoy}
          />
        ))}
        {props.children}
      </div>
    </div>
  );
};

export default Tier;
