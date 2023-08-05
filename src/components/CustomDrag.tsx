import { Component, createEffect, onCleanup } from "solid-js";

type CustomDragProps = {
  setIsDragging: (isDragging: boolean) => void;
  isDragging: () => boolean;
  setIsMouseDown: (isMouseDown: boolean) => void;
  isMouseDown: () => boolean;
};

const CustomDrag = (props: CustomDragProps): Component<CustomDragProps> => {
  const { setIsDragging, isDragging, setIsMouseDown, isMouseDown } = props;
  let ref: HTMLDivElement | undefined;
  createEffect(() => {
    function move(e: MouseEvent) {
      if (isMouseDown()) {
        if (ref !== undefined) {
          ref.style.left = `${e.clientX}px`;
          ref.style.top = `${e.clientY}px`;
        }
      }
    }
    document?.addEventListener("mousemove", move);
    onCleanup(() => {
      document?.removeEventListener("mousemove", move);
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
        position: "absolute",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      }}
      onMouseDown={(e) => {
        setIsMouseDown(true);
        setIsDragging(true);
      }}
      onMouseOver={(e) => {
        console.log("mouse over", e.clientX, e.clientY);
      }}
      // onMouseUp={(e) => {
      //   console.log("mouse up");
      //   setIsDragging(false);
      //   setIsMouseDown(false);
      // }}
      onMouseOut={(e) => {
        if (isDragging()) return e.preventDefault();
        setIsDragging(false);
        setIsMouseDown(false);
      }}
    >
      <p>hello text</p>
    </div>
  );
};

export default CustomDrag;
