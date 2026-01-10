import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";

import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function EmployeeTable({ data, columns, onDelete, onEdit }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onDelete,
      onEdit,
    },
  });

  return (
    <Table>
      <TableHead>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableCell key={header.id}>
                {header.column.columnDef.header}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

