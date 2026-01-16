import "./App.css";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import Dragaable from "./dndFolder/draggable";
import Droppable from "./dndFolder/droppable";

function App() {
  const [isDropped, setIsDropped] = useState(false);
  const dragaleMarkup = <Dragaable>Drag Me</Dragaable>;

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "Droppable") {
      setIsDropped(true);
    }
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? dragaleMarkup : null}
        <Droppable>{isDropped ? dragaleMarkup : "Drop here"}</Droppable>
      </DndContext>
    </>
  );
}

export default App;
