import React, { useContext } from 'react';
import { ToggleContext } from '../../contextAPI/ToggleContext';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScienceIcon from '@mui/icons-material/Science';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Sidebar = () => {
    const { toggleState, setToggleState } = useContext(ToggleContext);

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={toggleState}
            sx={{
                '& .MuiDrawer-paper': {
                    width: toggleState ? 240 : 80,
                    transition: 'width 0.3s',
                    boxSizing: 'border-box',
                    backgroundColor: '#070F2B',
                    color: 'white'
                },
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={2}
                py={1}
            >
                <IconButton onClick={() => setToggleState(!toggleState)}>
                    <ChevronLeftIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>
            <Divider />
            <List>
                <ListItem button component={Link} to='/dashboardfaculty/home'>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" sx={{ display: toggleState ? 'block' : 'none', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/add-students'>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Student" sx={{ display: toggleState ? 'block' : 'none', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/add-marks'>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="CT Marks" sx={{ display: toggleState ? 'block' : 'none', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/assignment'>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Assignment Marks" sx={{ display: toggleState ? 'block' : 'none', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/lab-marks'>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <ScienceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lab Marks" sx={{ display: toggleState ? 'block' : 'none', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/attendance'>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <FactCheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" sx={{ display: toggleState ? 'block' : 'none', color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to='/dashboardfaculty/view-co'>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary="View CO" sx={{ display: toggleState ? 'block' : 'none', color: 'white' }} />
                </ListItem>
            </List>

            <Divider variant="middle" sx={{ backgroundColor: 'white', height: '2px' }} />

            <List>
                <ListItem button>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" sx={{ display: toggleState ? 'block' : 'none', color: 'white' }} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
