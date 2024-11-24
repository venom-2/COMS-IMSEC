import React, { useState, useEffect } from 'react'
import { Breadcrumbs, Container, Link, TextField, Typography, Box, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EnhancedTable from '../EnhancedTableStudent';
import { Modal } from '@mui/material';
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';

const FacultyDashboard_addStudent = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = React.useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    year: '',
    section: '',
  });
  const [files, setFiles] = useState([]);
  const [students, setStudents] = useState([]);
  const year = '2023'; // Replace with dynamic year if needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = jwtDecode(localStorage.getItem("authToken"));
      formData.branch = payload.user.department;
      console.log(formData);
      const response = await fetch('https://dms-backend-eight.vercel.app/add/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authToken": localStorage.getItem("authToken")
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success('Student added successfully!');
        setFormData({
          name: '',
          rollNumber: '',
          email: '',
          year: '',
          section: '',
        });
        handleClose(); // Close the modal
        fetchStudents(year);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add student.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  const fetchStudents = async (department) => {
    try {
      const response = await fetch('https://dms-backend-eight.vercel.app/fetch/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': `${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ year }),
      });
      const data = await response.json();
      setStudents(data.students);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    // Call fetchStudents when the component mounts
    fetchStudents(year);
  }, [year]); // Dependency array: add `year` if it can change


  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "text/csv") {
      toast.error("Please upload a valid CSV file.");
      return;
    }

    try {
      const fileData = new FormData();
      fileData.append('file', file); // Add selected file to FormData

      const response = await fetch("https://dms-backend-eight.vercel.app/csv/student", {
        method: "POST",
        headers: {
          "authToken": localStorage.getItem("authToken"), // Add auth token
        },
        body: fileData,
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Students added successfully!");
        setCsvFile(null); // Clear selected file
        fetchStudents(year);
      } else {
        toast.error(data.message || "Failed to add students!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while uploading the file.");
    }
  };


  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Add Student
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
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Button variant='contained' sx={{ width: '5rem', ml: 2, height: '55px' }} onClick={handleOpen}>
            Add
          </Button>
          <Button variant='contained' sx={{ width: '7rem', ml: 2, height: '55px' }} component="label">
            Upload
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={(e) => {
                handleCsvUpload(e);
                e.target.value = ""; // Clear the input
              }}
            />
          </Button>
        </Box>
      </Box>
      <EnhancedTable searchTerm={searchTerm} students={students}/>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: 1000, bgcolor: 'background.paper', p: 4, borderRadius: 1, boxShadow: 24 }}>
          <Container sx={{ mt: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              Add Student to Database
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: '1000px', mt: 3 }}
            >
              <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mr: 2 }}
                  required
                />
                <TextField
                  label="Roll Number"
                  variant="outlined"
                  name="rollNumber"
                  value={formData.rollno}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
              <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  label="Year"
                  variant="outlined"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mr: 2 }}
                  required
                />
                <TextField
                  label="Section"
                  variant="outlined"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Button variant="contained" type="submit" sx={{ mt: 3 }}>
                Submit
              </Button>
            </Box>
          </Container>
        </Box>
      </Modal>
    </Container>
  )
}

export default FacultyDashboard_addStudent