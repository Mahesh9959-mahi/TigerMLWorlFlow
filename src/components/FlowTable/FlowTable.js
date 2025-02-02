import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import useWorkflowStore from "../../hooks/useWorkflowStore";

const WorkflowTable = () => {
  const { nodes, setNodes } = useWorkflowStore();

  const columns = [
    {
      accessorKey: "id",
      header: "Node ID",
    },
    {
      accessorKey: "data.label",
      header: "Node Name",
      cell: ({ getValue, row }) => (
        <input
          type="text"
          defaultValue={getValue()}
          onBlur={(e) => handleEdit(row.index, e.target.value)}
        />
      ),
    },
    {
      accessorKey: "type",
      header: "Node Type",
    },
  ];

  const handleEdit = (rowIndex, newValue) => {
    setNodes((prevNodes) =>
      prevNodes.map((node, index) =>
        index === rowIndex
          ? { ...node, data: { ...node.data, label: newValue } }
          : node
      )
    );
  };

  const table = useReactTable({
    data: nodes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkflowTable;
