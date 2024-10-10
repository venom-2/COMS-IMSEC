import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { ToggleContext } from '../../contextAPI/ToggleContext';

const Sidebar = () => {
    const { toggleState, setToggleState } = React.useContext(ToggleContext);

    return (
        <Drawer
            variant="persistent"
            open={toggleState}
            sx={{
                width: toggleState ? 240 : 60,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: toggleState ? 240 : 60,
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
            >
                <IconButton onClick={() => setToggleState(!toggleState)}>
                    <ChevronLeftIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {/* Dashboard */}
                <ListItem button component={Link} to="/dashboardhod/home">
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    {toggleState && <ListItemText primary="Dashboard" sx={{ color: 'white' }} />}
                </ListItem>

                {/* Add Faculty */}
                <ListItem button component={Link} to="/dashboardhod/add-faculty">
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <GroupIcon />
                    </ListItemIcon>
                    {toggleState && <ListItemText primary="Add Faculty" sx={{ color: 'white' }}/>}
                </ListItem>

                {/* Assign Faculty */}
                <ListItem button component={Link} to="/dashboardhod/assign-faculty">
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <GroupIcon />
                    </ListItemIcon>
                    {toggleState && <ListItemText primary="Assign Faculty" sx={{ color: 'white' }}/>}
                </ListItem>

                {/* Add Student */}
                <ListItem button component={Link} to="/dashboardhod/add-students">
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <PersonAddIcon />
                    </ListItemIcon>
                    {toggleState && <ListItemText primary="Add Student" sx={{ color: 'white' }}/>}
                </ListItem>

                {/* Add Subject */}
                <ListItem button component={Link} to="/dashboardhod/add-subject">
                    <ListItemIcon sx={{ color: 'white' }}>
                        <BookIcon />
                    </ListItemIcon>
                    {toggleState && <ListItemText primary="Add Subject" sx={{ color: 'white' }} />}
                </ListItem>
            </List>

            <Divider sx={{ backgroundColor: '#fff' }} />

            {/* Settings */}
            <ListItem button >
                <ListItemIcon sx={{ color: '#fff' }}>
                    <SettingsIcon />
                </ListItemIcon>
                {toggleState && <ListItemText primary="Settings" />}
            </ListItem>
        </Drawer>
    );
};

export default Sidebar;
