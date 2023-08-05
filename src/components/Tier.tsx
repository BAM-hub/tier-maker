import { ParentComponent } from "solid-js";
import style from "../style/Tier.module.css";
import { ListItem, TierProps } from "../tier";
import DraggableImage from "./DraggableImage";

const Tier: ParentComponent<TierProps> = (props: TierProps) => {
  const { tiers, setTiers } = props;

  const moveItem = (item: ListItem, to: string) => {
    const itemTierIndex = tiers().findIndex(
      (tier) => tier.name === props.draggedItem()?.tier
    );
    const toTierIndex = tiers().findIndex((tier) => tier.name === to);
    const filteredTier = tiers()[itemTierIndex].items.filter(
      (item) => item.name !== props.draggedItem()?.name
    );
    let newTiers = tiers();
    newTiers[itemTierIndex].items = filteredTier;

    if (props.draggedItem() !== undefined) {
      newTiers[toTierIndex].items.push({
        ...(props.draggedItem() as ListItem),
        tier: to,
      });
      setTiers([...newTiers]);
    }
  };
  return (
    <div
      onMouseOver={(e) => {
        console.log("mouse over");
      }}
      class={style.tierContainer}
    >
      <div class={style.tierTitle}>
        <h1>{props?.title}</h1>
      </div>
      <div
        onDragOver={(e) => {
          console.log("drag over");
          e.preventDefault();
        }}
        onDrop={(e) => {
          console.log("drop");
          if (props.draggedItem !== undefined) {
            moveItem(props.draggedItem() as ListItem, props.title);
          }
        }}
        class={style.tierContentContainer}
      >
        {props.listItems?.map((character) => (
          <DraggableImage
            isDecoy={character.isDecoy}
            name={character.name}
            order={character.order}
            tier={character.tier}
            image={character.image}
            setDraggedItem={props.setDraggedItem}
          />
        ))}
        {props.children}
      </div>
    </div>
  );
};

export default Tier;
