import React, { useState } from 'react'
import { Breadcrumbs, Container, Link, Typography, Box, Button, TextField } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EnhancedTable from '../../Components/EnhancedTableMarks';


const FacultyDashboard_addMarks = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      CT Marks
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
      </Box>
      <EnhancedTable searchTerm={searchTerm} />
    </Container>
  )
}

export default FacultyDashboard_addMarks