import { ParentComponent, createEffect, createSignal } from "solid-js";
import style from "../style/Tier.module.css";
import { ListItem, TierProps } from "../tier";
import DraggableImage from "./DraggableImage";

enum EventType {
  Drop,
  DragOver,
}

const Tier: ParentComponent<TierProps> = (props: TierProps) => {
  const { tiers, setTiers } = props;

  const moveItem = (
    item: ListItem,
    to: string,
    event: EventType,
    index = -1
  ) => {
    const itemTierIndex = tiers().findIndex(
      (tier) => tier.name === props.draggedItem()?.tier
    );
    const toTierIndex = tiers().findIndex((tier) => tier.name === to);
    const toTierContainsItem = tiers()[toTierIndex].items.find(
      (item) => item.name === props.draggedItem()?.name
    );
    if (EventType.DragOver === event && index !== -1) {
      if (
        props.draggedItem()?.name === tiers()[toTierIndex].items[index].name
      ) {
        return;
      }
      console.log("drag over", index);

      const filteredTier = tiers()[itemTierIndex].items.filter(
        (item) => item.name !== props.draggedItem()?.name
      );
      const filterdTOtier = tiers()[toTierIndex].items.filter(
        (item) => item.name !== props.draggedItem()?.name
      );
      console.log({ filteredTier });

      let newTiers = tiers();
      newTiers[itemTierIndex].items = filteredTier;
      newTiers[toTierIndex].items = filterdTOtier;
      console.log(newTiers[toTierIndex].items[index], index);

      newTiers[toTierIndex].items.splice(index, 0, {
        ...(props.draggedItem() as ListItem),
        tier: to,
      });

      setTiers([...newTiers]);
      return;
    } else if (toTierContainsItem !== undefined) {
      return;
    }
    const filteredTier = tiers()[itemTierIndex].items.filter(
      (item) => item.name !== props.draggedItem()?.name
    );
    let newTiers = tiers();
    newTiers[itemTierIndex].items = filteredTier;

    if (props.draggedItem() !== undefined) {
      newTiers[toTierIndex].items.push({
        ...(item as ListItem),
        tier: to,
      });
      setTiers([...newTiers]);
    }
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
        {props.listItems?.map((character, index) => (
          <DraggableImage
            isDecoy={character.isDecoy}
            name={character.name}
            order={character.order}
            tier={character.tier}
            image={character.image}
            setDraggedItem={props.setDraggedItem}
            unDecoy={unDecoy}
            onDragOver={(e) => {
              e.preventDefault();
              moveItem(
                { ...props.draggedItem(), isDecoy: true } as ListItem,
                props.title,
                EventType.DragOver,
                index
              );
            }}
          />
        ))}
        {props.children}
      </div>
    </div>
  );
};

export default Tier;
