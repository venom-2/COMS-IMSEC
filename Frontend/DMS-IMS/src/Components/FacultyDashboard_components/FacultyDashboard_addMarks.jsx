import React from 'react'
import { Breadcrumbs, Container, Link, Typography} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const FacultyDashboard_addMarks = () => {

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      CT Marks
    </Typography>,
  ];

  return (
    <Container sx={{mt: 10}}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mt: '20px' }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Container>
  )
}

export default FacultyDashboard_addMarks