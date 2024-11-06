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

function createData(name) {
    return { name, a: '', b: '', c: '', d: '', e: '', f: '' };
}

const initialRows = [
    createData('Q-01'),
    createData('Q-02'),
    createData('Q-03'),
    createData('Q-04'),
    createData('Q-05'),
];

const CTMarksgrid = ({ subjectName }) => {
    const [rows, setRows] = React.useState(initialRows);
    const [allFilled, setAllFilled] = React.useState(false);
    const [showErrors, setShowErrors] = React.useState(false);

    const maxMarks = {
        'Q-01': 2,
        'Q-02': 5,
        'Q-03': 10,
        'Q-04': 10,
        'Q-05': 10,
    };

    const requirements = {
        'Q-01': { minFields: 0, maxFields: 5 },
        'Q-02': { minFields: 0, maxFields: 4 },
        'Q-03': { minFields: 0, maxFields: 1 },
        'Q-04': { minFields: 0, maxFields: 1 },
        'Q-05': { minFields: 0, maxFields: 1 },
    };

    const handleChange = (e, rowIndex, fieldName) => {
        const value = e.target.value;
        const rowName = rows[rowIndex].name;

        // Restrict marks based on question number
        if (value && (isNaN(value) || value > maxMarks[rowName])) return;

        const updatedRows = rows.map((row, idx) => {
            if (idx === rowIndex) {
                return { ...row, [fieldName]: value };
            }
            return row;
        });
        setRows(updatedRows);

        // Check if all required input fields are filled
        checkCompletion(updatedRows);
    };

    const checkCompletion = (updatedRows) => {
        const filled = updatedRows.every(row => {
            const { minFields, maxFields } = requirements[row.name];
            const filledCount = Object.values(row).filter(val => val !== '').length;
            return filledCount >= minFields && filledCount <= maxFields;
        });
        setAllFilled(filled);
    };

    const handleSubmit = () => {
        const filledCorrectly = rows.every(row => {
            const { minFields, maxFields } = requirements[row.name];
            const filledCount = Object.values(row).filter(val => val !== '').length;
            return filledCount >= minFields && filledCount <= maxFields;
        });

        if (filledCorrectly) {
            console.log("Data ready to upload:", rows);
        } else {
            setShowErrors(true);
        }
    };

    const getCellStyle = (row, field) => {
        const { minFields, maxFields } = requirements[row.name];
        const filledCount = Object.values(row).filter(val => val !== '').length;
        const showError = showErrors && (filledCount < minFields || filledCount > maxFields);

        return {
            borderColor: showError && row[field] === '' ? 'error.main' : 'grey.300',
            borderWidth: 2,
            '& input': { textAlign: 'center' },
        };
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                {subjectName}
            </Typography>
            <TableContainer component={Paper} elevation={4} sx={{ maxWidth: 800, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="CT Marks Table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Question No</TableCell>
                            {['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'].map((label, index) => (
                                <TableCell key={index} align="center" sx={{ fontWeight: 'bold' }}>{label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={row.name} hover>
                                <TableCell align="center" component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {row.name}
                                </TableCell>
                                {['a', 'b', 'c', 'd', 'e', 'f'].map((field, colIndex) => (
                                    <TableCell key={colIndex} align="center">
                                        <TextField
                                            variant="outlined"
                                            value={row[field]}
                                            onChange={(e) => handleChange(e, rowIndex, field)}
                                            size="small"
                                            sx={{
                                                width: 60,
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    borderColor: getCellStyle(row, field).borderColor,
                                                    borderWidth: getCellStyle(row, field).borderWidth,
                                                    '&:hover': { borderColor: 'primary.main' },
                                                },
                                                '& input': { textAlign: 'center' },
                                            }}
                                            error={showErrors && row[field] === '' && rowIndex < requirements[row.name].minFields}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 3, width: 200 }}
            >
                Upload
            </Button>
        </Box>
    );
};

export default CTMarksgrid;
