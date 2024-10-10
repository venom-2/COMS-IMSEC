import React, { useEffect, useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Menu, Typography, Button, Divider, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ToggleContext } from '../contextAPI/ToggleContext';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleState, setToggleState } = useContext(ToggleContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken.user);
      console.log('Decoded Token:', decodedToken);
    } catch (error) {
      console.error('Error while decoding token:', error);
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
    <AppBar position="static" sx={{ backgroundColor: '#070F2B' }}>
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>

        {/* Navbar Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, mx: '2rem' }}>
          Gradium AI
        </Typography>

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
              width: '300px',
            },
          }}
        >
          <Typography variant="subtitle1" align="center" sx={{ padding: '10px', backgroundColor: '#f5f5f5', fontWeight: 'bold', color: '#17153b', font: 'Inter' }}>
            Welcome, {userData.name}
          </Typography>
          <Divider />

          {/* Profile Info */}
          <Box sx={{ padding: '10px 20px' }}>
            <Typography variant="body2"><strong>Email:</strong> {userData.email}</Typography>
            <Typography variant="body2"><strong>Designation:</strong> {userData.role}</Typography>
            <Typography variant="body2"><strong>Department:</strong> {userData.department}</Typography>
          </Box>

          <Divider />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 20px' }}>
            <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
