import { useState } from "react";
import dummData from "./dummyData.json";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type Row,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MouseSensor, TouchSensor } from "@dnd-kit/core";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  age: number;
  status: string;
  createdAt: string;
}

// Sortable Row Component
function SortableRow({ row }: { row: Row<UserType> }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.original.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    backgroundColor: "rgba(130, 130, 130, 0.1)",
  
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={row.id}
    >
      {row.getVisibleCells().map((rowCell) => (
        <td key={rowCell.id} style={{ width: rowCell.column.getSize() }}>
          {flexRender(rowCell.column.columnDef.cell, rowCell.getContext())}
        </td>
      ))}
    </tr>
  );
}

function MainTable() {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (props: any) => <p>{String(props.getValue())}</p>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (props: any) => <p>{String(props.getValue())}</p>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (props: any) => <p>{String(props.getValue())}</p>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (props: any) => <p>{String(props.getValue())}</p>,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: (props: any) => <p>{String(props.getValue())}</p>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props: any) => <p>{String(props.getValue())}</p>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (props: any) => <p>{String(props.getValue())}</p>,
    },
  ];
  const [data, setData] = useState<UserType[]>(dummData);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // prevents accidental drag on click
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // long press for mobile
        tolerance: 5,
      },
    })
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Handle drag end event to reorder rows
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id.toString() === active.id
        );
        const newIndex = items.findIndex(
          (item) => item.id.toString() === over.id
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Get row IDs for SortableContext
  const rowIds = table
    .getRowModel()
    .rows.map((row) => row.original.id.toString());

  console.log("TableDataHeader", table.getHeaderGroups());
  console.log("TableData", table.getRowModel());

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <table width={table.getTotalSize()}>
        <thead>
          {table.getHeaderGroups().map((header) => (
            <tr key={header.id}>
              {header.headers.map((headerCell) => (
                <th
                  key={headerCell.id}
                  style={{ width: headerCell.column.getSize() }}
                  onClick={headerCell.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    headerCell.column.columnDef.header,
                    headerCell.getContext()
                  )}
                  {headerCell.column.getIsSorted() === "asc"
                    ? "↑"
                    : headerCell.column.getIsSorted() === "desc"
                    ? "↓"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <SortableContext
            items={rowIds}
            strategy={verticalListSortingStrategy}
          >
            {table.getRowModel().rows.map((row) => (
              <SortableRow key={row.id} row={row} />
            ))}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
}
export default MainTable;
