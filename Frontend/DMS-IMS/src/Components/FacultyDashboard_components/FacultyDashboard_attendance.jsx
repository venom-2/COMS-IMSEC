import React, { useState } from "react";
import {
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Pagination,
  Grid,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { CheckCircle, Cancel, WatchLater } from "@mui/icons-material";

const FacultyDashboardAttendance = () => {
  // State to store the selected subject, date, and attendance data
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Dummy data for subjects and students
  const subjects = [
    "Digital Electronics",
    "Mathematics",
    "Computer Networks",
    "Software Engineering",
  ];

  const students = [
    { id: 1, name: "John Doe", rollNumber: "101", year: "2023" },
    { id: 2, name: "Jane Smith", rollNumber: "102", year: "2023" },
    { id: 3, name: "Alice Brown", rollNumber: "103", year: "2022" },
    { id: 4, name: "Michael Johnson", rollNumber: "104", year: "2022" },
    { id: 5, name: "Emily Davis", rollNumber: "105", year: "2024" },
    { id: 6, name: "Chris Evans", rollNumber: "106", year: "2024" },
    { id: 7, name: "Sarah Connor", rollNumber: "107", year: "2023" },
    { id: 8, name: "Bruce Wayne", rollNumber: "108", year: "2023" },
    { id: 9, name: "Peter Parker", rollNumber: "109", year: "2022" },
    { id: 10, name: "Clark Kent", rollNumber: "110", year: "2024" },
    { id: 11, name: "Diana Prince", rollNumber: "111", year: "2023" },
    { id: 12, name: "Natasha Romanoff", rollNumber: "112", year: "2024" },
  ];

  // Handle subject selection
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setAttendance({});
  };

  // Handle attendance change for each student
  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Attendance data:", attendance);
    alert("Attendance updated successfully!");
  };

  // Handle pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate displayed students based on pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedStudents = students.slice(startIndex, endIndex);

  // Breadcrumbs for navigation
  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: "text.primary" }}>
      Attendance
    </Typography>,
  ];

  return (
    <Container sx={{ mt: 10}}>
      {/* Breadcrumbs for navigation */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mt: "20px", mb: 4 }}
      >
        {breadcrumbs}
      </Breadcrumbs>

      {/* Subject Selection and Date Picker in a single row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="subject-select-label">Select Subject</InputLabel>
            <Select
              labelId="subject-select-label"
              id="subject-select"
              value={selectedSubject}
              label="Select Subject"
              onChange={handleSubjectChange}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      {/* Attendance Table */}
      {selectedSubject && selectedDate && (
        <Box>
          <Typography variant="h6" gutterBottom>
            {`Mark Attendance for ${selectedSubject} on ${selectedDate?.format(
              "MM/DD/YYYY"
            )}`}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Roll Number</TableCell>
                  <TableCell align="center">Year</TableCell>
                  <TableCell align="center">Attendance Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedStudents.map((student) => (
                  <TableRow key={student.id} sx={{ height: '40px' }}> {/* Adjust row height here */}
                    <TableCell align="center">{student.name}</TableCell>
                    <TableCell align="center">{student.rollNumber}</TableCell>
                    <TableCell align="center">{student.year}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <IconButton
                          color={
                            attendance[student.id] === "present"
                              ? "success"
                              : "default"
                          }
                          onClick={() =>
                            handleAttendanceChange(student.id, "present")
                          }
                        >
                          <CheckCircle />
                        </IconButton>
                        <IconButton
                          color={
                            attendance[student.id] === "absent"
                              ? "error"
                              : "default"
                          }
                          onClick={() =>
                            handleAttendanceChange(student.id, "absent")
                          }
                        >
                          <Cancel />
                        </IconButton>
                        <IconButton
                          color={
                            attendance[student.id] === "late"
                              ? "warning"
                              : "default"
                          }
                          onClick={() =>
                            handleAttendanceChange(student.id, "late")
                          }
                        >
                          <WatchLater />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ mt: 2, mb: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(students.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>

          {/* Submit Button only on the last page */}
          {page === Math.ceil(students.length / rowsPerPage) && (
            <Box sx={{ mt: 4, mb: 4, textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ bgcolor: "#070f2b", color: "#fff", py: 1.5, px: 4 }}
              >
                Save Attendance
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default FacultyDashboardAttendance;
