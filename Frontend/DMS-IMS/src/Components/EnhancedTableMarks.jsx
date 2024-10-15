import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Modal } from '@mui/material';

function createData(id, name, year, branch, rollno, ct1, ct2) {
    return {
        id,
        name,
        year,
        branch,
        rollno,
        ct1,
        ct2,
    };
}

const rows = [
    createData(1, 'Akshat', 4, 'CS', 2101430120000, '60/60', '60/60'),
    createData(2, 'Krishna', 4, 'CS', 2101430120001, '58/60', '58/60'),
    createData(3, 'Khushi', 4, 'CS', 2101430120002, '56/60', '56/60'),
    createData(4, 'Divyanshi', 4, 'CS', 2101430120003, '53/60', '53/60'),
    createData(5, 'Harsh', 4, 'CS', 2101430120004, '46/60', '46/60'),
    createData(6, 'Ayush', 4, 'CS', 2101430120005, '42/60', '42/60'),
    createData(7, 'Lalit', 4, 'CS', 2101430120006, '43/60', '43/60'),
    createData(8, 'Chandni', 4, 'CS', 2101430120007, '48/60', '48/60'),
    createData(9, 'Shweta', 4, 'CS', 2101430120008, '50/60', '50/60'),
    createData(10, 'Sunny', 4, 'CS', 2101430120009, '58/60', '58/60'),
    createData(11, 'Amit', 4, 'CS', 2101430120010, '41/60', '41/60'),
    createData(12, 'Aditya', 4, 'CS', 2101430120011, '38/60', '38/60'),
    createData(13, 'Krishna Kant', 4, 'CS', 2101430120012, '10/60', '10/60'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'year',
        numeric: true,
        disablePadding: true,
        label: 'Year',
    },
    {
        id: 'branch',
        numeric: false,
        disablePadding: true,
        label: 'Branch',
    },
    {
        id: 'rollno',
        numeric: true,
        disablePadding: false,
        label: 'Roll Number',
    },
    {
        id: 'ct1',
        numeric: false,
        disablePadding: false,
        label: 'CT-1',
    },
    {
        id: 'ct2',
        numeric: false,
        disablePadding: false,
        label: 'CT-2',
    },
];


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'center'}
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Student Performance
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ searchTerm }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openModal, setOpenModal] = React.useState(false);
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

    const handleOpen = () => setOpenModal(true);

    const handleClose = () => setOpenModal(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.rollno.toString().includes(searchTerm) ||
        row.year.toString().includes(searchTerm)
    );

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...filteredRows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, filteredRows]
    );

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="small" // Set small size for dense padding by default
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={filteredRows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                onClick={(event) => handleClick(event, row.id)}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="normal" align="center">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.year}</TableCell>
                                        <TableCell align="center">{row.branch}</TableCell>
                                        <TableCell align="center">{row.rollno}</TableCell>
                                        <TableCell align="center" onClick={handleOpen}>{row.ct1}</TableCell>
                                        <TableCell align="center">{row.ct2}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 25, 50]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={openModal}
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
                                    sx={{ mr: 2 }}
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
        </Box>
    );
}
