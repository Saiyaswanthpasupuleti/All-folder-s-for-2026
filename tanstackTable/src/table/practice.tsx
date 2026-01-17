import { useState } from "react";
import dummData from "./dummyData.json";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  age: number;
  status: string;
  createdAt: string;
}
function MainTable() {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];
  const [data, setData] = useState<UserType[]>(dummData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  console.log("TableDataHeader", table.getHeaderGroups());
  console.log("TableData", table.getRowModel());
  return (
    <table width={table.getTotalSize()}>
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

      {table.getRowModel().rows.map((rows) => (
        <tr key={rows.id}>
          {rows.getVisibleCells().map((rowCell) => (
            <td key={rowCell.id} style={{ width: rowCell.column.getSize() }}>
              {flexRender(rowCell.column.columnDef.cell, rowCell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}
export default MainTable;
