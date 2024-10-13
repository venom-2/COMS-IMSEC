import React from 'react'
import { Container, Grid2, Typography, Breadcrumbs, Link, Paper, Card, CardContent, Box, LinearProgress } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

const ProgressCard = ({ title, progress }) => {
  return (
    <Paper variant="outlined" sx={{ width: '100%', backgroundColor: '#ffffff', mt: 2, px: 2, py: 2 }}>
      <Typography variant="h6" color="black" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 10 }} />
        </Box>
        <Box>
          <Typography variant="body2" color="black">{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const FacultyDashboard_home = () => {

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Home
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
      <Typography variant="h6" gutterBottom sx={{ mt: '10px', fontWeight: 'bold' }}>
        Overview
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 item md={3} lg={3}>
          <Paper sx={{ width: '270px', height: '170px', backgroundColor: '#ffffff' }}>
            <Typography sx={{px: 2, py: 2, color: 'black'}}>
              Assigned Subjects
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item md={3} lg={3}>
          <Paper sx={{ width: '270px', height: '170px', backgroundColor: '#fff' }}>
            <Typography sx={{px: 2, py: 2, color: 'black'}}>
              Total Students
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item md={3} lg={3}>
          <Paper sx={{ width: '270px', height: '170px', backgroundColor: '#fff' }}>
            <Typography sx={{px: 2, py: 2, color: 'black'}}>
              Assigned Subjects
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item md={3} lg={3}>
          <Paper sx={{ width: '270px', height: '170px', backgroundColor: '#fff' }}>
            <Typography sx={{px: 2, py: 2, color: 'black'}}>
              Assigned Subjects
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
      <Box>
        <ProgressCard title="Semester Progress" progress={70} />
      </Box>
      <Grid2 container spacing={6} sx={{ mt: 2 }}>
        <Grid2 item md={6} lg={6}>
          <Paper>
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
              ]}
              xAxis={[{ data: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              width={552}
              height={310}
            />
          </Paper>
        </Grid2>
        <Grid2 item md={6} lg={6}>
          <Paper>
            <LineChart
              series={[
                { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
                { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
              ]}
              width={552}
              height={310}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default FacultyDashboard_home