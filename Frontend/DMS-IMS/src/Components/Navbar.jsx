import React, { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToggleContext } from "../contextAPI/ToggleContext";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleState, setToggleState } = useContext(ToggleContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken.user);
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error while decoding token:", error);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setToggleState(!toggleState);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#070F2B",
        width: `calc(100% - 240px)`,
        ml: "240px",
      }}
    >
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton edge="start" color="inherit"></IconButton>

        {/* Navbar Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, mx: "2rem" }}></Typography>

        {/* User Icon Dropdown */}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              width: "320px", 
              borderRadius: "5px", 
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
            },
          }}
        >
          {/* Header */}
          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              padding: "12px 0",
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              color: "#17153b",
              borderBottom: "1px solid #e0e0e0", 
              fontFamily: "Inter, sans-serif", 
            }}
          >
            Welcome, {userData.name}
          </Typography>
          <Divider sx={{ margin: "0" }} />

          {/* Profile Info */}
          <Box sx={{ padding: "15px 20px", backgroundColor: "#fff" }}>
            <Typography
              variant="body2"
              sx={{ marginBottom: "8px", color: "#555" }}
            >
              <strong>Email:</strong> {userData.email}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: "8px", color: "#555" }}
            >
              <strong>Designation:</strong> {userData.role}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: "8px", color: "#555" }}
            >
              <strong>Department:</strong> {userData.department}
            </Typography>
          </Box>

          <Divider />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "15px 20px",
              backgroundColor: "#fafafa",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                width: "100%", 
                fontWeight: "bold", 
                borderRadius: "5px", 
                padding: "10px 0",
                textTransform: "none", 
              }}
            >
              Logout
            </Button>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
