import { Component, createSignal } from "solid-js";
import { DraggableImageProps } from "../tier";

const DraggableImage: Component<DraggableImageProps> = (
  props: DraggableImageProps
) => {
  const [isDecoy, setIsDecoy] = createSignal(props.isDecoy);
  return (
    <div>
      <div
        class="charcter"
        draggable={true}
        onDrag={(e) => {
          props.setDraggedItem(props);
          setIsDecoy(true);
        }}
        onDragEnd={(e) => {
          props.setDraggedItem(undefined);
          setIsDecoy(false);
          props.unDecoy();
        }}
        onDragEnter={props.onDragOver}
        style={{
          width: "100px",
          height: "100px",
          "background-size": "cover",
          opacity: isDecoy() ? "0.5" : "1",
          "background-image": `url(${props.image}})`,
        }}
      ></div>
    </div>
  );
};

export default DraggableImage;
