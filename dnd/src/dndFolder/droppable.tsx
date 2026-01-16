import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

interface DroppableProps {
  children: ReactNode;
}

export default function DroppableElement(props: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "Droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
    border: "1px solid green",
    padding: 10,
  };
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
