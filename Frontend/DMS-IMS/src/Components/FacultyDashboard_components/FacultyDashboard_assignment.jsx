import React, {useState} from 'react'
import { Breadcrumbs, Container, Link, Typography, Box, TextField } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AssignmentTable from '../AssignmentTable';

const FacultyDashboard_assignment = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Assignment Marks
    </Typography>,
  ];

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
      <AssignmentTable searchTerm={searchTerm} />
    </Container>
  )
}

export default FacultyDashboard_assignment