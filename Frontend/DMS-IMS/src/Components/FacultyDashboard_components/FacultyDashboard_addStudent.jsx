import React, { useState } from 'react'
import { Breadcrumbs, Container, Link, TextField, Typography, Box, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EnhancedTable from '../EnhancedTable';
import { Modal } from '@mui/material';
import toast from "react-hot-toast";

const FacultyDashboard_addStudent = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = React.useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    rollno: '',
    email: '',
    section: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for form submission
    console.log(formData);
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      console.log('CSV File Selected:', file.name);
    } else {
      toast.error("Please upload a valid CSV file.");
      setCsvFile(null);
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
              onChange={handleCsvUpload}
            />
          </Button>
        </Box>
      </Box>
      <EnhancedTable searchTerm={searchTerm} />
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
                  sx={{mr: 2}}
                />
                <TextField
                  label="Roll Number"
                  variant="outlined"
                  name="rollno"
                  value={formData.rollno}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
              <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  label="Year"
                  variant="outlined"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  fullWidth
                  sx={{mr: 2}}
                />
                <TextField
                  label="Section"
                  variant="outlined"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  fullWidth
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