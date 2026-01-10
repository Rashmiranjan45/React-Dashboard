import { Button } from "@mui/material";

export const columns = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "image",
    header: "Profile",
    cell: ({ getValue }) => {
      const img = getValue();
      return img ? (
        <img
          src={img}
          alt="profile"
          width={40}
          height={40}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        "—"
      );
    },
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "dob", header: "DOB" },
  { accessorKey: "state", header: "State" },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ getValue }) => (
      <span style={{ color: getValue() ? 'green' : 'red' }}>
        {getValue() ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    header: "Actions",
    cell: ({ row, table }) => (
      <div>
        <Button size="small" onClick={() => table.options.meta?.onEdit(row.original.id)}>Edit</Button>
        <Button size="small" color="error" onClick={() => table.options.meta?.onDelete(row.original.id)}>Delete</Button>
      </div>
    ),
  },
];
