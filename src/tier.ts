import { Accessor, ParentProps } from "solid-js";

export interface ListItem {
  name: string;
  image: string;
  order: number;
  tier: string;
  isDecoy: boolean;
}

export interface Tier {
  name: string;
  index: number;
  items: ListItem[];
}

export interface IList {
  tiers: Tier[];
  oldTiers: Tier[];
}

export interface DraggableImageProps extends ParentProps, ListItem {
  setDraggedItem: (item: ListItem | undefined) => void;
  unDecoy: () => void;
}

export interface TierProps extends ParentProps {
  title: string;
  draggedItem: Accessor<ListItem | undefined>;
  listItems: ListItem[] | [];
  setDraggedItem: (item: ListItem | undefined) => void;
  tiers: Accessor<Tier[]>;
  setTiers: (tiers: Tier[]) => void;
}
