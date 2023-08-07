import { ParentComponent, createSignal } from "solid-js";
import style from "../style/Tier.module.css";
import { ListItem, TierProps } from "../tier";
import DraggableImage from "./DraggableImage";

enum EventType {
  Drop,
  DragOver,
}

const Tier: ParentComponent<TierProps> = (props: TierProps) => {
  const { tiers, setTiers, tierIndex: thisTierIndex } = props;
  const [itemList, setItemList] = createSignal<ListItem[]>([]);
  const moveItem = (item: ListItem, to: string, event: EventType) => {
    const itemTierIndex = tiers().findIndex(
      (tier) => tier.name === props.draggedItem()?.tier
    );

    const toTierContainsItem = tiers()[thisTierIndex].items.find(
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
      newTiers[thisTierIndex].items.push({
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
    const newItems = itemList().map((item) => ({
      ...item,
      isDecoy: false,
    }));

    setItemList([...newItems]);
  }

  /**
   * this removes all decoys from the tier while dragging
   * @param tier
   */
  function removeNonDropedDecoy(tier: string, e: DragEvent) {
    // const tierIndex = tiers().findIndex((t) => t.name === tier);
    // if (e.clientY >= 100 * tiers().length) {
    //   return;
    // }
    const newItems = itemList().filter((item) => item.isDecoy === false);

    setItemList([...newItems]);
  }

  function atomRemove() {
    if (!props.draggedItem()) return;
    const newTiers = tiers();
    const deleteFromIndex = tiers().findIndex(
      (tier) => tier.name === props.draggedItem()?.tier
    );
    newTiers[deleteFromIndex].items = newTiers[deleteFromIndex].items.filter(
      (element) => element.name !== props.draggedItem()?.name
    );
    // console.log({ newTiers });
    return newTiers;
  }

  function atomAdd() {
    const listContainsItem = itemList().find(
      (item) => item.name === props.draggedItem()?.name
    );
    // console.log({ listContainsItem });
    if (listContainsItem !== undefined) {
      return;
    }
    if (props.draggedItem()) {
      const list = itemList();
      list.push({
        ...(props.draggedItem() as ListItem),
        tier: props.title,
        isDecoy: true,
      });
      setItemList([...list]);
    }
  }

  function removeDraggedItem() {
    console.log("removeDraggItem", props.draggedItem());
    if (props.draggedItem() !== undefined) {
      const newItems = itemList().filter(
        (item) => item.name !== props.draggedItem()?.name
      );
      setItemList(newItems);
    }
  }

  return (
    <div class={style.tierContainer}>
      <div class={style.tierTitle}>
        <h1>{props?.title}</h1>
      </div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          atomAdd();
        }}
        onDragStart={(e) => {
          // e.preventDefault();
          // removeDraggedItem();
          // atomRemove();
          // removeDraggedItem();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          // console.log("drag enter");
          // moveItem(
          //   { ...props.draggedItem(), isDecoy: true } as ListItem,
          //   props.title,
          //   EventType.DragOver
          // );
          // moveItem(
          //   { ...props.draggedItem(), isDecoy: true } as ListItem,
          //   props.title,
          //   EventType.DragOver
          // );
          // removeDraggedItem();
          // atomAdd();
          // props.setDraggedItem({
          //   ...props.draggedItem(),
          //   tier: props.title,
          // } as ListItem);
          // atomAdd();
        }}
        onDragLeave={(e) => {
          // atomRemove();
          e.preventDefault();

          removeDraggedItem();
          // removeNonDropedDecoy(props.title, e);
        }}
        onDrop={() => {
          unDecoy();
        }}
        class={style.tierContentContainer}
      >
        {itemList().map((character) => (
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
