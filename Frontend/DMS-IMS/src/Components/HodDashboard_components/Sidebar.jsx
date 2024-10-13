import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    return (
        <Drawer
            variant="permanent"
            anchor='left'
            sx={{
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#070F2B',
                    color: 'white',
                },
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={2}
                py={1}
                mt={2}
            >
                <Typography sx={{ color: '#9290C3', fontWeight: 'bold', fontSize: '1.5rem' }}>Gradium AI</Typography>
            </Box>
            <Divider />
            <List>
                {/* Dashboard */}
                <ListItem button component={Link} to="/dashboardhod/home" sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
                </ListItem>

                {/* Add Faculty */}
                <ListItem button component={Link} to="/dashboardhod/add-faculty" sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Faculty" sx={{ color: 'white' }} />
                </ListItem>

                {/* Assign Faculty */}
                <ListItem button component={Link} to="/dashboardhod/assign-faculty" sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Assign Faculty" sx={{ color: 'white' }} />
                </ListItem>

                {/* Add Student */}
                <ListItem button component={Link} to="/dashboardhod/add-students" sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Student" sx={{ color: 'white' }} />
                </ListItem>

                {/* Add Subject */}
                <ListItem button component={Link} to="/dashboardhod/add-subject" sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Subject" sx={{ color: 'white' }} />
                </ListItem>
            </List>

            <Divider sx={{ backgroundColor: '#fff', mt: 'auto', height: '2px' }} />

            {/* Settings */}
            <List>
                <ListItem button sx={{ '&:hover': { backgroundColor: '#2E3A59' } }} >
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" sx={{ display: 'block', color: 'white' }} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
