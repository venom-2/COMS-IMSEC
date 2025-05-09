import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import toast from "react-hot-toast";

const AdminDashboard_createUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    role: "",
    department_id: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Created:", formData);
    try {
      const response = await fetch("http://localhost:3000/add/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      // Reset form data after successful submission
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        role: "",
        department_id: "",
      });
      // Show success message
      toast.success("User Created Successfully");
    } catch (err) {
      toast.error(err.message || "Error creating user.");
    }
  };

  return (
    <Box
      mt={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              color: "#070F2B",
              textAlign: "center",
            }}
          >
            Create User for Organization
          </Typography>

          {/* Form Start */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Email */}
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />

              {/* Name Fields Side by Side */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>

              {/* Password */}
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
              />

              {/* Role Dropdown */}
              <TextField
                select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                fullWidth
              >
                <MenuItem value="HoD">HoD</MenuItem>
                <MenuItem value="Faculty">Faculty</MenuItem>
              </TextField>

              {/* Department Field */}
              <TextField
                select
                label="Department"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
                fullWidth
              >
                <MenuItem value="1">Computer Science</MenuItem>
                <MenuItem value="2">Computer Science & Design</MenuItem>
              </TextField>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  padding: "10px 0",
                  fontWeight: "bold",
                  backgroundColor: "#070F2B",
                  "&:hover": { backgroundColor: "#1B1F3B" },
                }}
              >
                Create User
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard_createUser;
