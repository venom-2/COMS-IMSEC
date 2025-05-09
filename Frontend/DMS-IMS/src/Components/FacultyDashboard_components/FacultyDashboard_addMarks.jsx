import React, { useState, useEffect } from 'react'
import { Breadcrumbs, Container, Link, Typography, Box, Button, TextField, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const FacultyDashboard_addMarks = () => {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [students, setStudents] = useState([]);
  // const [genderFilter, setGenderFilter] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
  const handleSemesterChange = (e) => setSemesterFilter(e.target.value);
  // const handleGenderChange = (e) => setGenderFilter(e.target.value);
  const handleChangePage = (_, newPage) => setPage(newPage);

  const filteredData = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search) ||
      student.subject_code.toLowerCase().includes(search) ||
      student.roll_no.toLowerCase().includes(search) ||
      student.type_name.toLowerCase().includes(search) ||
      String(student.marks_obtained).includes(search);
    const matchesSemester = semesterFilter ? String(student.semester_id) === semesterFilter : true;
    // const matchesGender = genderFilter ? student.gender === genderFilter : true;

    return matchesSearch && matchesSemester;
  });

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/fetch/class-test', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setStudents(data.response);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      CT Marks
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
      {/* Search and Filters */}
      <Box display="flex" gap={2} mb={2} mt={2} flexWrap="wrap">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          sx={{ width: 880 }}
        />
        <TextField
          label="Semester"
          select
          variant="outlined"
          size="small"
          value={semesterFilter}
          onChange={handleSemesterChange}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <MenuItem key={sem} value={String(sem)}>{sem}</MenuItem>
          ))}
        </TextField>
        {/* <TextField
          label="Gender"
          select
          variant="outlined"
          size="small"
          value={genderFilter}
          onChange={handleGenderChange}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField> */}
        <Button variant="contained" color="primary" sx={{ backgroundColor: '#070F2B' }}>
          Add Marks
        </Button>
      </Box>

      {/* Table */}
      <Paper borderRadius={6} elevation={1}>
        <TableContainer>
          <Table size="small" sx={{
            '& .MuiTableCell-root': { border: '2px solid #ddd' },
          }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#070F2B' }}>
                <TableCell sx={{ color: 'white' }}>Roll No</TableCell>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Subject</TableCell>
                <TableCell sx={{ color: 'white' }}>Semester</TableCell>
                <TableCell sx={{ color: 'white' }}>Assessment Type</TableCell>
                <TableCell sx={{ color: 'white' }}>Marks Obtained</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.roll_no}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.subject_code}</TableCell>
                  <TableCell>{student.semester_id}</TableCell>
                  <TableCell>{student.type_name}</TableCell>
                  <TableCell>{student.marks_obtained}</TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </Paper>
    </Container>
  )
}

export default FacultyDashboard_addMarks