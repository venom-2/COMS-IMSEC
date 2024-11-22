import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function createData(assignment) {
    return { assignment, marks: '' };
}

const initialRows = [
    createData('Assignment 1'),
    createData('Assignment 2'),
    createData('Assignment 3'),
    createData('Assignment 4'),
    createData('Assignment 5'),
];

const AssignmentMarksgrid = ({ subjectName }) => {
    const [rows, setRows] = React.useState(initialRows);
    const [showErrors, setShowErrors] = React.useState(false);

    const handleChange = (e, rowIndex) => {
        const value = e.target.value;

        // Restrict marks to numbers between 0 and 20
        if (value && (isNaN(value) || value < 0 || value > 20)) return;

        const updatedRows = rows.map((row, idx) => {
            if (idx === rowIndex) {
                return { ...row, marks: value };
            }
            return row;
        });
        setRows(updatedRows);
    };

    const handleSubmit = () => {
        const allFilled = rows.every(row => row.marks !== '');
        if (allFilled) {
            console.log("Data ready to upload:", rows);
        } else {
            setShowErrors(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                {subjectName}
            </Typography>
            <TableContainer component={Paper} elevation={4} sx={{ maxWidth: 700, borderRadius: 2 }}>
                <Table sx={{ minWidth: 400 }} aria-label="Assignment Marks Table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Assignment</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Marks (out of 20)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={row.assignment} hover>
                                <TableCell align="center" component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {row.assignment}
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        variant="outlined"
                                        value={row.marks}
                                        onChange={(e) => handleChange(e, rowIndex)}
                                        size="small"
                                        sx={{
                                            width: 80,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                            },
                                            '& input': { textAlign: 'center' },
                                        }}
                                        error={showErrors && row.marks === ''}
                                        helperText={showErrors && row.marks === '' ? "Required" : ''}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2, width: 200 }}
            >
                Upload
            </Button>
        </Box>
    );
};

export default AssignmentMarksgrid;
