import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import { ListItem } from "../tier";

type CustomDragProps = {
  setIsDragging: (isDragging: boolean) => void;
  isDragging: () => boolean;
  setIsMouseDown: (isMouseDown: boolean) => void;
  isMouseDown: () => boolean;
  draggedItem: Accessor<ListItem | undefined>;
  setDraggedItem: (item: ListItem) => void;
  setMouseIndex: ({ x, y }: { x: number; y: number }) => void;
  item: ListItem;
};

const CustomDrag = (props: CustomDragProps) => {
  const {
    setIsDragging,
    isDragging,
    setIsMouseDown,
    isMouseDown,
    setMouseIndex,
  } = props;
  let ref: HTMLDivElement | undefined;
  const [mousePosition, setMousePosition] = createSignal({
    left: 0,
    top: 0,
  });
  createEffect(() => {
    console.log("rerender");
    function debounce(func: () => void, timeout = 100) {
      let timer: number;
      return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }
    function move(e: MouseEvent) {
      if (isMouseDown()) {
        if (ref !== undefined) {
          document
            .querySelector("body > *")
            ?.classList.add("disable-text-select");

          ref.style.left = `${e.clientX - mousePosition().left}px`;
          ref.style.top = `${e.clientY - mousePosition().top}px`;
          setMouseIndex({
            x: Math.floor(e.clientX / 100) - 1,
            y: Math.floor(e.clientY / 100),
          });
        }
      } else {
        ref!.style.left = "";
        ref!.style.top = "";
      }
    }
    document?.addEventListener("mousemove", debounce(move, 7));
    onCleanup(() => {
      document?.removeEventListener("mousemove", move);
      document
        .querySelector("body > *")
        ?.classList.remove("disable-text-select");
    });
  });
  createEffect(() => {
    function clearMouseUp() {
      setIsDragging(false);
      setIsMouseDown(false);
    }

    document?.addEventListener("mouseup", clearMouseUp);
    onCleanup(() => {
      document?.removeEventListener("mouseup", clearMouseUp);
    });
  });

  return (
    <div
      ref={ref!}
      style={{
        background: "red",
        width: "100px",
        height: "100px",
        position:
          isDragging() && props.draggedItem()?.name === props.item.name
            ? "absolute"
            : "static",
        display: "flex",
        opacity: props.draggedItem()?.name !== props.item.name ? "1" : "0.5",
        "justify-content": "center",
        "align-items": "center",
        "background-image": `url(${props.item.image})`,
        "background-size": "cover",
      }}
      onMouseDown={(e) => {
        ref!.style.left = `${
          e.pageX - (e.clientX - e.currentTarget.offsetLeft)
        }px`;
        ref!.style.top = `${
          e.pageY - (e.clientY - e.currentTarget.offsetTop)
        }px`;
        setMousePosition({
          left: e.clientX - e.currentTarget.offsetLeft,
          top: e.clientY - e.currentTarget.offsetTop,
        });
        props.setDraggedItem({
          ...props.item,
          isDecoy: true,
        });

        setIsMouseDown(true);
        setIsDragging(true);
      }}
      onMouseOut={(e) => {
        if (isDragging()) return e.preventDefault();
        setIsDragging(false);
        setIsMouseDown(false);
      }}
    ></div>
  );
};

export default CustomDrag;
