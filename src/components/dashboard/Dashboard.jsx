import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Container, Button, TextField, Stack, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Header from "../shared/Header";
import DashboardSummary from "./DashboardSummary"
import EmployeeTable from "../employee/EmployeeTable";
import EmployeeForm from "../employee/EmployeeForm.jsx";
import ConfirmDialog from "../shared/ConfirmDialog";
import { columns } from "../employee/column.jsx";

const Dashboard = () => {
  const [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem("employees") || "[]");
  });

  const [openForm, setOpenForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [editData, setEditData] = useState(null);

  const filteredEmployees = employees.filter(emp => {
    const matchesName = emp.name?.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === "" || emp.gender === genderFilter;
    const matchesActive = activeFilter === "" || (activeFilter === "active" ? emp.active : !emp.active);
    return matchesName && matchesGender && matchesActive;
  });



  const handleSave = (data) => {
    if (editData) {
      setEmployees(prev => prev.map((emp) => emp.id === editData.id ? { ...emp, ...data } : emp));
    } else {
      setEmployees(prev => [...prev, { ...data, id: uuid() }]);
    }
    setOpenForm(false);
    setEditData(null);
  };

  const handleDelete = () => {
    setEmployees(prev => prev.filter(emp => emp.id !== deleteId));
    setDeleteId(null);
  };

  const onEdit = (id) => {
    const employee = employees.find(emp => emp.id === id);
    setEditData(employee);
    setOpenForm(true);
  };

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <>
      <Header />

      <Container sx={{ mt: 3 }}>
        <DashboardSummary employees={employees} />

        <Stack direction="row" spacing={2} my={3}>
          <TextField
            label="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={genderFilter}
              label="Gender"
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={activeFilter}
              label="Status"
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => setOpenForm(true)}
          >
            Add Employee
          </Button>

          <Button
            variant="outlined"
            onClick={() => window.print()}
          >
            Print
          </Button>
        </Stack>

        <EmployeeTable
          data={filteredEmployees}
          columns={columns}
          onDelete={(id) => setDeleteId(id)}
          onEdit={onEdit}
        />

        {/* Add / Edit Form */}
        <EmployeeForm
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setEditData(null);
          }}
          onSave={handleSave}
          editData={editData}
        />

        {/* Delete Confirmation */}
        <ConfirmDialog
          open={Boolean(deleteId)}
          title="Delete Employee"
          description="Are you sure you want to delete this employee?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      </Container>
    </>
  );
};

export default Dashboard;
