import React, { useState, useEffect } from 'react'
import { Breadcrumbs, Container, Link, Typography, Box, Button, TextField, MenuItem } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EnhancedTable from '../../Components/EnhancedTableMarks';
import { jwtDecode } from 'jwt-decode';

const FacultyDashboard_addMarks = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = React.useState('');
  const [session, setSession] = React.useState('');
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  const years = ['1st year', '2nd year', '3rd year', '4th year'];
  const sessions = ['2021-22', '2022-23', '2023-24', '2024-25'];

  const fetchCTMarks = async () => {
    try {
      const response = await fetch("https://dms-backend-eight.vercel.app/fetch/ctmarks", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authToken": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ year, session }),
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  const fetchStudents = async (e) => {
    try {
      console.log("Year: " + year, "Session:" + session);
      const response = await fetch("https://dms-backend-eight.vercel.app/fetch/students", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authToken": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ year, session }),
      });
      const data = await response.json();
      if (response.status === 404) {
        setStudents([]);
        return;
      }
      setStudents(data.students);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchSubjects = async () => {
    try {
      console.log("Year: " + year);
      const response = await fetch(`https://dms-backend-eight.vercel.app/fetch/subject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authToken": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ year }),
      });
      const data = await response.json();
      console.log("Data:", data);
      setSubjects(data.subjects);
      console.log("Subjects: ", subjects);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (year !== null && session !== null) {
      fetchStudents();
    }
  }, [year, session]);

  useEffect(() => {
    const token = jwtDecode(localStorage.getItem("authToken")).user.assignedSubjects;
    setAssignedSubjects(token);
    fetchSubjects();
    console.log("Assigned Subjects: ", assignedSubjects);
    console.log("Subjects: ", subjects);
  }, [year, session]);

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
      <Box component="div" display="flex" gap={2} >
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
      <Box display="flex" gap={2} sx={{ mt: 2 }}>
        {/* Dropdown for Year Selection */}
        <TextField
          select
          label="Select Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          variant="outlined"
          fullWidth
        >
          {years.map((yearOption) => (
            <MenuItem key={yearOption} value={yearOption}>
              {yearOption}
            </MenuItem>
          ))}
        </TextField>

        {/* Dropdown for Session Selection */}
        <TextField
          select
          label="Select Session"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          variant="outlined"
          fullWidth
        >
          {sessions.map((sessionOption) => (
            <MenuItem key={sessionOption} value={sessionOption}>
              {sessionOption}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Subject"
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          select
        >
          <MenuItem disabled>Select Subject
          </MenuItem>
          {subjects.length > 0 ? (
            subjects.map((sub) => (
              <MenuItem key={sub._id} value={sub._id}>
                {sub.subjectName}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No subjects available</MenuItem>
          )}
        </TextField>
      </Box>
      {students.length !== 0 ? <EnhancedTable searchTerm={searchTerm} students={students} subject={subject}/> : <Typography variant="h6" sx={{ mt: 5 }}>No students found</Typography>}
    </Container>
  )
}

export default FacultyDashboard_addMarks