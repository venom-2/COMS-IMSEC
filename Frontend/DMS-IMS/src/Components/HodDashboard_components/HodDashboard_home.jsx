import React from 'react'
import { Breadcrumbs, Container, Link, Typography, Grid2, Grid, Paper, Box, LinearProgress } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

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

const studentPerformance = [
  { semester: '1', score: 85 },
  { semester: '2', score: 80 },
  { semester: '3', score: 75 },
  { semester: '4', score: 70 },
  { semester: '5', score: 65 },
  { semester: '6', score: 65 },
  { semester: '7', score: 67 },
  { semester: '8', score: 65 }
];

const facultyPerformance = [
  { semester: '1', score: 90 },
  { semester: '2', score: 88 },
  { semester: '3', score: 82 },
  { semester: '4', score: 85 },
  { semester: '5', score: 78 },
  { semester: '6', score: 65 },
  { semester: '7', score: 65 },
  { semester: '8', score: 65 }
];

const HodDashboard_home = () => {
  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      HoD Dashboard
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
          <Paper sx={{ width: '270px', height: '100px', backgroundColor: '#ffffff' }}>
            <Box sx={{ paddingX: '10px', marginLeft: '5px', fontSize: '20px', paddingY: '10px', color: 'black' }}>
              {/* <SparkLineChart data={smallValues} colors={['red']} {...settings} /> */}
              5
            </Box>
            <Typography sx={{ px: 2, py: 1, color: 'black' }}>
              Total Subjects
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item md={3} lg={3}>
          <Paper sx={{ width: '270px', height: '100px', backgroundColor: '#fff' }}>
            <Box sx={{ paddingX: '10px', marginLeft: '5px', fontSize: '20px', paddingY: '10px', color: 'black' }}>
              {/* <SparkLineChart data={smallValues} colors={['orange']} {...settings} /> */}
              250
            </Box>
            <Typography sx={{ px: 2, py: 1, color: 'black' }}>
              Total Students
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item md={3} lg={3}>
          <Paper sx={{ width: '270px', height: '100px', backgroundColor: '#fff' }}>
            <Box sx={{ paddingX: '10px', marginLeft: '5px', fontSize: '20px', paddingY: '10px', color: 'black' }}>
              {/* <SparkLineChart data={smallValues} colors={['green']} {...settings} /> */}
              2
            </Box>
            <Typography sx={{ px: 2, py: 1, color: 'black' }}>
              Course Outcome
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item md={3} lg={3}>
          <Paper sx={{ width: '270px', height: '100px', backgroundColor: '#fff' }}>
            <Box sx={{ paddingX: '10px', marginLeft: '5px', fontSize: '20px', paddingY: '10px', color: 'black' }}>
              {/* <SparkLineChart data={smallValues} colors={['purple']} {...settings} /> */}
              45
            </Box>
            <Typography sx={{ px: 2, py: 1, color: 'black' }}>
              Total Faculties
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
      <Box>
        <ProgressCard title="Semester Progress" progress={70} />
      </Box>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>Semester Wise Student Performance (Avg)</Typography>
            <Box sx={{ height: '85%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentPerformance}>
                  <Line type="monotone" dataKey="score" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="semester"/>
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>Semester Wise Faculty Performance (Avg)</Typography>
            <Box sx={{ height: '85%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={facultyPerformance}>
                  <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="semester" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HodDashboard_home