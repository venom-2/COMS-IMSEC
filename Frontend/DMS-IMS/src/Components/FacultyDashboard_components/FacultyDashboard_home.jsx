import React from 'react'
import { Container, Grid2, Card, CardContent, Typography } from '@mui/material';

const FacultyDashboard_home = () => {
  return (
    <Container sx={{ mt: 1, ml: '240px' }}>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Students
              </Typography>
              <Typography variant="body2" color="text.secondary">
                150
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Courses Taught
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Assignments Given
              </Typography>
              <Typography variant="body2" color="text.secondary">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default FacultyDashboard_home