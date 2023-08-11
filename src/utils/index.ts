import { Accessor } from "solid-js";
import { ListItem, Tier } from "../tier";

enum EventType {
  Drop,
  DragOver,
}

export const moveItem = (
  item: ListItem,
  to: string,
  event: EventType,
  index = -1,
  tiers: Accessor<Tier[]>,
  draggedItem: Accessor<ListItem | undefined>,
  setTiers: (tiers: Tier[]) => void
) => {
  const itemTierIndex = tiers().findIndex(
    (tier) => tier.name === draggedItem()?.tier
  );
  const toTierIndex = tiers().findIndex((tier) => tier.name === to);
  const toTierContainsItem = tiers()[toTierIndex].items.find(
    (item) => item.name === draggedItem()?.name
  );
  if (EventType.DragOver === event && index !== -1) {
    if (draggedItem()?.name === tiers()[toTierIndex].items[index].name) {
      return;
    }
    console.log("drag over", index);

    const filteredTier = tiers()[itemTierIndex].items.filter(
      (item) => item.name !== draggedItem()?.name
    );
    const filterdTOtier = tiers()[toTierIndex].items.filter(
      (item) => item.name !== draggedItem()?.name
    );
    console.log({ filteredTier });

    let newTiers = tiers();
    newTiers[itemTierIndex].items = filteredTier;
    newTiers[toTierIndex].items = filterdTOtier;
    console.log(newTiers[toTierIndex].items[index], index);

    newTiers[toTierIndex].items.splice(index, 0, {
      ...(draggedItem() as ListItem),
      tier: to,
    });

    setTiers([...newTiers]);
    return;
  } else if (toTierContainsItem !== undefined) {
    return;
  }
  const filteredTier = tiers()[itemTierIndex].items.filter(
    (item) => item.name !== draggedItem()?.name
  );
  let newTiers = tiers();
  newTiers[itemTierIndex].items = filteredTier;

  if (draggedItem() !== undefined) {
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
export function unDecoy(
  tiers: Accessor<Tier[]>,
  setTiers: (tiers: Tier[]) => void
) {
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
export function removeNonDropedDecoy(
  tier: string,
  e: DragEvent,
  tiers: Accessor<Tier[]>,
  setTiers: (tiers: Tier[]) => void
) {
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
