import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper, TextField, MenuItem, Box, Typography, Breadcrumbs, Container, Link,
  Button, Modal, Grid
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import toast from "react-hot-toast";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const FacultyDashboard_addStudent = () => {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [students, setStudents] = useState([]);
  const [genderFilter, setGenderFilter] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    roll_no: '',
    first_name: '',
    last_name: '',
    department_id: '',
    semester_id: '',
    phone_no: '',
    admission_type: '',
    admission_id: '',
    passing_year: '',
    section: '',
    email: '',
    admission_year: '',
    course_id: '',
    gender: '',
    disability: '',
    category: '',
    dob: ''
  });

  const departmentMapping = {
    'Computer Science': 1,
    'Computer Science & Design': 2,
  };

  const courseMapping = {
    'B.Tech': 1,
    'MBA': 3,
    'MCA': 2,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = async () => {
    const mappedFormData = {
      ...formData,
      department_id: departmentMapping[formData.department_id] || formData.department_id,
      course_id: courseMapping[formData.course_id] || formData.course_id,
    };
  
    console.log('Student Data:', mappedFormData);
  
    try {
      const response = await fetch('http://localhost:3000/add/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappedFormData),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        console.log('Student added successfully:', data);
        setFormData({
          roll_no: '',
          first_name: '',
          last_name: '',
          department_id: '',
          semester_id: '',
          phone_no: '',
          admission_type: '',
          admission_id: '',
          passing_year: '',
          section: '',
          email: '',
          admission_year: '',
          course_id: '',
          gender: '',
          disability: '',
          category: '',
          dob: ''
        });
        handleClose();
        toast.success('Student added successfully!');
      } else {
        console.error('Error adding student:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
  const handleSemesterChange = (e) => setSemesterFilter(e.target.value);
  const handleGenderChange = (e) => setGenderFilter(e.target.value);
  const handleChangePage = (_, newPage) => setPage(newPage);

  const filteredData = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.roll_no.toLowerCase().includes(search);
    const matchesSemester = semesterFilter ? String(student.semester) === semesterFilter : true;
    const matchesGender = genderFilter ? student.gender === genderFilter : true;

    return matchesSearch && matchesSemester && matchesGender;
  });

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Add Student
    </Typography>,
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/fetch/students', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setStudents(data.studentsResult);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

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
          sx={{ width: 725 }}
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
        <TextField
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
        </TextField>
        <Button variant="contained" color="primary" sx={{ backgroundColor: '#070F2B' }} onClick={handleOpen}>
          Add Student
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
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Semester</TableCell>
                <TableCell sx={{ color: 'white' }}>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.roll_no}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
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

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>


          <Grid container spacing={2}>
            {[
              { label: 'Roll No', name: 'roll_no' },
              { label: 'First Name', name: 'first_name' },
              { label: 'Last Name', name: 'last_name' },
              { label: 'Department', name: 'department_id', type: 'select', options: ['Computer Science', 'Computer Science & Design'] },
              { label: 'Semester', name: 'semester_id', type: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8] },
              { label: 'Phone No', name: 'phone_no' },
              { label: 'Admission Type', name: 'admission_type', type: 'select', options: ['Regular', 'Lateral', 'Readmitted'] },
              { label: 'Admission Id', name: 'admission_id' },
              { label: 'Passing Year', name: 'passing_year' },
              { label: 'Section', name: 'section' },
              { label: 'Email', name: 'email' },
              { label: 'Admission Year', name: 'admission_year' },
              { label: 'Course', name: 'course_id', type: 'select', options: ['B.Tech', 'MBA', 'MCA'] },
              { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female'] },
              { label: 'Disability', name: 'disability', type: 'select', options: ['Yes', 'No'] },
              { label: 'Category', name: 'category', type: 'select', options: ['General', 'OBC', 'SC', 'ST', 'EWS'] },
            ].map(({ label, name, type, options }) => (
              <Grid item xs={12} sm={6} key={name}>
                {type === 'select' ? (
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label={label}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                  >
                    {options.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    label={label}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                )}
              </Grid>
            ))}

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                size="small"
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dob}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleClose} sx={{ mr: 1, color: '#070F2B' }} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddStudent} sx={{ backgroundColor: '#070F2B' }}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default FacultyDashboard_addStudent;
