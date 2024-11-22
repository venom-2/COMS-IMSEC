import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
 
const Sidebar = () => {

    return (
        <Drawer
            anchor="left"
            sx={{
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#070F2B',
                    color: 'white',
                },
            }}
            variant="permanent"
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={2}
                py={1}
                mt={2}
            >
                <Typography sx={{color: '#9290C3', fontWeight: 'bold', fontSize: '1.5rem'}}>Gradium AI</Typography>
            </Box>
            <Divider />
            <List>
                <ListItem button component={Link} to='/dashboardfaculty/home' sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ display: 'block', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/add-students' sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Student" sx={{ display: 'block', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/add-marks' sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="CT Marks" sx={{ display: 'block', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/assignment' sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Assignment Marks" sx={{ display: 'block', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/view-co' sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary="View CO" sx={{ display: 'block', color: 'white' }} />
                </ListItem>
            </List>

            <Divider variant="li" sx={{ backgroundColor: 'white', height: '2px', mt: 'auto' }} />

            <List>
                <ListItem button sx={{ '&:hover': { backgroundColor: '#2E3A59' } }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" sx={{ display: 'block', color: 'white' }} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
