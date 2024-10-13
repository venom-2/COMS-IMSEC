import React, { useState } from 'react'
import { Breadcrumbs, Container, Link, TextField, Typography, Box, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../Table';

const FacultyDashboard_addStudent = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Add Student
    </Typography>,
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mt: '20px' }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box component="div" sx={{ display: 'flex', height: '80px', alignItems: 'center' }} >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          sx={{ mt: 2 }}
        >
        </TextField>
        <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
          <Button variant='contained' sx={{ width: '5rem', ml: 2, height: '55px' }}>
            Add
          </Button>
        </Box>
      </Box>
      <Table/>
    </Container>
  )
}

export default FacultyDashboard_addStudent