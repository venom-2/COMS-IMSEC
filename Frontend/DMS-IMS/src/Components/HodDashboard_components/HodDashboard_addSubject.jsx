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

const HodDashboard_addSubject = () => {
    const [search, setSearch] = useState('');
    const [semesterFilter, setSemesterFilter] = useState('');
    const [subjects, setSubjects] = useState([]);
    // const [genderFilter, setGenderFilter] = useState('');
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        subject_code: '',
        nba_code: '',
        subject_name: '',
        subject_type: '',
        subject_year: '',
        subject_semester_id: '',
        department_id: '',
    });

    const departmentMapping = {
        'Computer Science': 1,
        'Computer Science & Design': 2,
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
            department_id: departmentMapping[formData.department_id] || formData.department_id
        };

        console.log('Subject Data:', mappedFormData);

        try {
            const response = await fetch('http://localhost:3000/add/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mappedFormData),
            });

            const data = await response.json();

            if (response.status === 201) {
                console.log('Subject added successfully:', data);
                setFormData({
                    subject_code: '',
                    nba_code: '',
                    subject_name: '',
                    subject_type: '',
                    subject_year: '',
                    subject_semester_id: '',
                    department_id: ''
                });
                handleClose();
                toast.success('Subject added successfully!');
            } else {
                console.error('Error adding subject:', data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
    const handleSemesterChange = (e) => setSemesterFilter(e.target.value);
    // const handleGenderChange = (e) => setGenderFilter(e.target.value);
    const handleChangePage = (_, newPage) => setPage(newPage);

    const filteredData = subjects.filter((student) => {
        const matchesSearch =
            student.subject_code.toLowerCase().includes(search) ||
            student.nba_code.toLowerCase().includes(search) ||
            student.subject_name.toLowerCase().includes(search) ||
            student.subject_type.toLowerCase().includes(search) ||
            String(student.subject_year).toLowerCase().includes(search);
        const matchesSemester = semesterFilter ? String(student.subject_semester_id) === semesterFilter : true;
        // const matchesGender = genderFilter ? student.gender === genderFilter : true;

        return matchesSearch && matchesSemester;
    });

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const breadcrumbs = [
        <Link underline="none" key="1" color="inherit">
            HoD Dashboard
        </Link>,
        <Typography key="2" sx={{ color: 'text.primary' }}>
            Add Subject
        </Typography>,
    ];

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/fetch/subject', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setSubjects(data.subject);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchSubjects();
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
                    sx={{ width: 865 }}
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
                <Button variant="contained" color="primary" sx={{ backgroundColor: '#070F2B' }} onClick={handleOpen}>
                    Add Subject
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
                                <TableCell sx={{ color: 'white' }}>Subject Code</TableCell>
                                <TableCell sx={{ color: 'white' }}>NBA Code</TableCell>
                                <TableCell sx={{ color: 'white' }}>Subject Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Subject Type</TableCell>
                                <TableCell sx={{ color: 'white' }}>Subject Year</TableCell>
                                <TableCell sx={{ color: 'white' }}>Subject Semester</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{student.subject_code}</TableCell>
                                    <TableCell>{student.nba_code}</TableCell>
                                    <TableCell>{student.subject_name}</TableCell>
                                    <TableCell>{student.subject_type}</TableCell>
                                    <TableCell>{student.subject_year}</TableCell>
                                    <TableCell>{student.subject_semester_id}</TableCell>
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

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>


                    <Grid container spacing={2}>
                        {[
                            { label: 'Subject Code', name: 'subject_code' },
                            { label: 'NBA Code', name: 'nba_code' },
                            { label: 'Subject Name', name: 'subject_name' },
                            { label: 'Subject Type', name: 'subject_type', type: 'select', options: ['Theory', 'Practical'] },
                            { label: 'Subject Year', name: 'subject_year' },
                            { label: 'Subject Semester', name: 'subject_semester_id' },
                            { label: 'Department', name: 'department_id', type: 'select', options: ['Computer Science', 'Computer Science & Design'] }
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

export default HodDashboard_addSubject;
