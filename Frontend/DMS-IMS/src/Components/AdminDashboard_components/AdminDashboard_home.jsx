import React, {useState, useEffect} from 'react';
import {
  Box, Container, Grid, Paper, Typography
} from '@mui/material';
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const studentPerformance = [
  { department: 'CS', score: 85 },
  { department: 'IT', score: 80 },
  { department: 'CSE', score: 75 },
  { department: 'CSD', score: 70 },
  { department: 'AIML', score: 65 }
];

const facultyPerformance = [
  { department: 'CS', score: 90 },
  { department: 'IT', score: 88 },
  { department: 'CSE', score: 82 },
  { department: 'CSD', score: 85 },
  { department: 'AIML', score: 78 }
];

const AdminDashboard_home = () => {
  const [dashboardData, setDashboardData] = useState({
    authorisedUsers: 0,
    totalStudents: 0,
    totalFaculties: 0,
    departments: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:3000/fetch/admin-data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        setDashboardData({
          authorisedUsers: data.authorisedUsers.count,
          totalStudents: data.totalStudents.count,
          totalFaculties: data.totalFaculties.count,
          departments: data.departments.count
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    }

    fetchDashboardData();  
  }, []);

  const cards = [
    { label: 'Authorised Users', value: dashboardData.authorisedUsers },
    { label: 'Total Students', value: dashboardData.totalStudents },
    { label: 'Total Faculties', value: dashboardData.totalFaculties },
    { label: 'Departments', value: dashboardData.departments }
  ];

  return (
    <Container sx={{ mt: 15 }}>
      <Grid container spacing={3}>
        {cards.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper sx={{ height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2 }}>
              <Typography variant="h5">{item.value}</Typography>
              <Typography>{item.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>Student Performance</Typography>
            <Box sx={{ height: '85%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentPerformance}>
                  <Line type="monotone" dataKey="score" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>Faculty Performance</Typography>
            <Box sx={{ height: '85%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={facultyPerformance}>
                  <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard_home;
