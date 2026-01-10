import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const initialState = {
  name: "",
  gender: "",
  dob: "",
  state: "",
  active: true,
  image: "",
};

const EmployeeForm = ({ open, onClose, onSave, editData }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  /* Populate form in EDIT mode */
  useEffect(() => {
    if (editData) {
      setForm(editData);
      setPreview(editData.image);
    } else {
      setForm(initialState);
      setPreview("");
    }
  }, [editData, open]);

  /* Validation */
  const validate = () => {
    let temp = {};
    temp.name = form.name ? "" : "Full name is required";
    temp.gender = form.gender ? "" : "Gender is required";
    temp.dob = form.dob ? "" : "Date of birth is required";
    temp.state = form.state ? "" : "State is required";
    temp.image = form.image ? "" : "Profile image is required";

    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  /* Image Upload */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm({ ...form, image: reader?.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setIsEdit(true)
    onSave({
      ...form,
      id: editData ? editData.id : Date.now(),
    });


    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editData ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* Profile Image */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={preview}
              sx={{ width: 64, height: 64 }}
            />
            <Button variant="outlined" component="label">
              Upload Image
              <input hidden type="file" accept="image/*" onChange={handleImageChange} />
            </Button>
          </Stack>
          {errors.image && <Typography color="error">{errors.image}</Typography>}

          {/* Full Name */}
          <TextField
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />

          {/* Gender */}
          <FormControl fullWidth error={Boolean(errors.gender)}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={form.gender}
              label="Gender"
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <Typography color="error">{errors.gender}</Typography>
          </FormControl>

          {/* DOB */}
          <TextField
            type="date"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            error={Boolean(errors.dob)}
            helperText={errors.dob}
            fullWidth
          />

          {/* State */}
          <FormControl fullWidth error={Boolean(errors.state)}>
            <InputLabel>State</InputLabel>
            <Select
              value={form.state}
              label="State"
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            >
              {STATES.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            <Typography color="error">{errors.state}</Typography>
          </FormControl>

          {/* Active / Inactive */}
          <FormControlLabel
            control={
              <Switch
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
            }
            label={form.active ? "Active" : "Inactive"}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;

