import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dummyData from "./dummyData.json";
import type { PaginationState, SortingState } from "@tanstack/react-table";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  age: number;
  status: string;
  createdAt: string;
}
function MyTable() {
  const columns = [
    {
      accessorKey: "id",
      header: "id",
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
  const [data, setData] = useState<UserType[]>(dummyData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });
  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  console.log("TableHeader", table.getRowModel());
  return (
    <div>
      <table width={table.getTotalSize()}>
        {table.getHeaderGroups().map((header) => (
          <tr key={header.id}>
            {header.headers.map((haderCell) => (
              <th
                key={haderCell.id}
                style={{ width: haderCell.column.getSize() }}
                onClick={haderCell.column.getToggleSortingHandler()}
              >
                {flexRender(
                  haderCell.column.columnDef.header,
                  haderCell.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} style={{ width: cell.column.getSize() }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </table>
      <div>
        <button onClick={() => table.previousPage()}>Previous</button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <button onClick={() => table.setPageIndex(0)}>First</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last
        </button>
      </div>
    </div>
  );
}

export default MyTable;
