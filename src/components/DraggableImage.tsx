import { Component } from "solid-js";
import { DraggableImageProps } from "../tier";

const DraggableImage: Component<DraggableImageProps> = (
  props: DraggableImageProps
) => {
  return (
    <div>
      <div
        class="charcter"
        draggable={true}
        onDragStart={(e) => {
          e.target.classList.add("dragging");
          e.target.classList.add("decoy");
        }}
        onDragEnd={(e) => {
          props.moveItem(props, "S", "A");
          e.target.classList.remove("dragging");
        }}
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
