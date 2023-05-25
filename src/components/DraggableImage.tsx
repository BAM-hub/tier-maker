import { Component, ParentProps } from "solid-js";
import useListStore from "../store/listStore";

interface ListItem {
  name: string;
  image: string;
  order: number;
  tier: string;
  isDecoy: boolean;
}
interface DraggableImageProps extends ParentProps {
  name: string;
  image: string;
  order: number;
  tier: string;
  isDecoy: boolean;
  moveItem: (item: ListItem, from: string, to: string) => void;
}

const DraggableImage: Component<DraggableImageProps> = (
  props: DraggableImageProps
) => {
  const { moveItem } = useListStore();
  return (
    <div>
      <div
        class="charcter"
        draggable={true}
        onDragStart={(e) => {
          e.target.classList.add("dragging");
          e.target.classList.add("decoy");
          props.moveItem(props, "S", "A");
          // clearList();
        }}
        onDragEnd={(e) => e.target.classList.remove("dragging")}
        style={{
          width: "100px",
          height: "100px",
          "background-size": "cover",
          "background-image": `url(${props.image}})`,
        }}
      ></div>
    </div>
  );
};

export default DraggableImage;
