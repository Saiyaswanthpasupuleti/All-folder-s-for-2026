import { useDraggable } from "@dnd-kit/core";
import type { ReactNode } from "react";

interface DraggableProps {
  children: ReactNode;
}

export default function Dragaable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "Draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
