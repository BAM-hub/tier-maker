import { ParentProps } from "solid-js";

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
  moveItem: (item: ListItem, from: string, to: string) => void;
}

export interface TierProps extends ParentProps {
  title: string;
}
