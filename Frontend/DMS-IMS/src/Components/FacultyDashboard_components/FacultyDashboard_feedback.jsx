import React, { useState } from "react";
import {
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Box,
  Button,
  TextField
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EnhancedTable from '../EnhancedTableStudent';
import toast from "react-hot-toast";

const FacultyDashboardFeedback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [excelFile, setExcelFile] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setExcelFile(file);
      toast.success(`Excel File Selected: ${file.name}`);
    } else {
      toast.error("Please upload a valid Excel file.");
      setExcelFile(null);
    }
  };

  // Breadcrumbs for navigation
  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: "text.primary" }}>
      Student Feedback
    </Typography>,
  ];

  return (
    <Container sx={{ mt: 10 }}>
      {/* Breadcrumbs for navigation */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mt: "20px" }}
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
          <Button variant='contained' sx={{ width: '7rem', ml: 2, height: '55px' }} component="label">
            Upload
            <input
              type="file"
              accept=".xlsx"
              hidden
              onChange={handleExcelUpload}
            />
          </Button>
        </Box>
      </Box>
      {/* <EnhancedTable searchTerm={searchTerm} /> */}

    </Container>
  );
};

export default FacultyDashboardFeedback;
