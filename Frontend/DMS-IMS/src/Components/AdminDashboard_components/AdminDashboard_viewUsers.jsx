import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";

const AdminDashboard_viewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users Data
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/fetch/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        setUsers(result.users);
      } else {
        toast.error(result.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

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

          {/* Show Loader while fetching */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ borderRadius: 2 }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#070F2B" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      First Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Last Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Role
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Department
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.email}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department_name}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
      </Container>
    </Box>
  );
};

export default AdminDashboard_viewUsers;
