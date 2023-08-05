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
        onDrag={(e) => {
          props.setDraggedItem(props);
        }}
        style={{
          width: "100px",
          height: "100px",
          "background-size": "cover",
          opacity: props.isDecoy ? "0.5" : "1",
          "background-image": `url(${props.image}})`,
        }}
      ></div>
    </div>
  );
};

export default DraggableImage;
