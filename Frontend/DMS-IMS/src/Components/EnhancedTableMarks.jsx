import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Modal } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";

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
  createData(1, "Akshat", 4, "CS", 2101430120000, "60/60", "60/60"),
  createData(2, "Krishna", 4, "CS", 2101430120001, "58/60", "58/60"),
  createData(3, "Khushi", 4, "CS", 2101430120002, "56/60", "56/60"),
  createData(4, "Divyanshi", 4, "CS", 2101430120003, "53/60", "53/60"),
  createData(5, "Harsh", 4, "CS", 2101430120004, "46/60", "46/60"),
  createData(6, "Ayush", 4, "CS", 2101430120005, "42/60", "42/60"),
  createData(7, "Lalit", 4, "CS", 2101430120006, "43/60", "43/60"),
  createData(8, "Chandni", 4, "CS", 2101430120007, "48/60", "48/60"),
  createData(9, "Shweta", 4, "CS", 2101430120008, "50/60", "50/60"),
  createData(10, "Sunny", 4, "CS", 2101430120009, "58/60", "58/60"),
  createData(11, "Amit", 4, "CS", 2101430120010, "41/60", "41/60"),
  createData(12, "Aditya", 4, "CS", 2101430120011, "38/60", "38/60"),
  createData(13, "Krishna Kant", 4, "CS", 2101430120012, "10/60", "10/60"),
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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: true,
    label: "Year",
  },
  {
    id: "branch",
    numeric: false,
    disablePadding: true,
    label: "Branch",
  },
  {
    id: "rollno",
    numeric: true,
    disablePadding: false,
    label: "Roll Number",
  },
  {
    id: "ct1",
    numeric: false,
    disablePadding: false,
    label: "CT-1",
  },
  {
    id: "ct2",
    numeric: false,
    disablePadding: false,
    label: "CT-2",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
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
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
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
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
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

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function EnhancedTable({ searchTerm }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openModal, setOpenModal] = React.useState(false);
  const [formData, setFormData] = useState("");
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

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
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.rollno.toString().includes(searchTerm) ||
      row.year.toString().includes(searchTerm)
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
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
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.id)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.year}</TableCell>
                    <TableCell align="center">{row.branch}</TableCell>
                    <TableCell align="center">{row.rollno}</TableCell>
                    <TableCell align="center" onClick={handleOpen}>
                      {row.ct1}
                    </TableCell>
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 800, // Increased width to keep subject names in one line
            bgcolor: "#fff", // Light background
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            color: "#070f2b", // Main text color
          }}
        >
          <Container>
            {/* Heading */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#070f2b", // Dark navy for heading
              }}
            >
              Select Subject to Upload Marks
            </Typography>

            {/* Instruction */}
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: "center", mb: 3, color: "#6b6b6b" }} // Subtle text for instructions
            >
              Choose a subject to upload or update the marks. Assigned subjects are
              highlighted.
            </Typography>

            {/* List of Subjects */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* First Row - Side by Side Layout */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#f0f8f5", // Light green for high marks or assigned subjects
                    cursor: "pointer", // Make it clickable
                    "&:hover": {
                      backgroundColor: "#e0f4eb", // Slightly darker green on hover
                    },
                  }}
                  onClick={() => handleSubjectClick("Digital Electronics")}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2, bgcolor: "#070f2b", color: "#fff" }}>
                      <BookIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Digital Electronics
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
                        Marks: 85
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#f9f9f9", // Grey for normal subjects
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#ececec", // Slightly darker grey on hover
                    },
                  }}
                  onClick={() => handleSubjectClick("Computer Networks")}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2, bgcolor: "#070f2b", color: "#fff" }}>
                      <BookIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Computer Networks
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
                        Marks: 72
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Second Row - Single Column Layout */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#f0f8f5", // Light green for high marks or assigned subjects
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e0f4eb",
                  },
                }}
                onClick={() => handleSubjectClick("Mathematics")}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ mr: 2, bgcolor: "#070f2b", color: "#fff" }}>
                    <BookIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Mathematics
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
                      Marks: 90
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Third Row - Side by Side Layout */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#ececec",
                    },
                  }}
                  onClick={() => handleSubjectClick("Software Engineering")}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2, bgcolor: "#070f2b", color: "#fff" }}>
                      <BookIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Software Engineering
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
                        Marks: 65
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#f0f8f5", // Light green for high marks or assigned subjects
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#e0f4eb",
                    },
                  }}
                  onClick={() => handleSubjectClick("Microprocessors")}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2, bgcolor: "#070f2b", color: "#fff" }}>
                      <BookIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Microprocessors
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
                        Marks: 78
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Fourth Row - Single Column Layout */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#f0f8f5", // Light green for high marks or assigned subjects
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e0f4eb",
                  },
                }}
                onClick={() => handleSubjectClick("Data Structures")}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ mr: 2, bgcolor: "#070f2b", color: "#fff" }}>
                    <BookIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Data Structures
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
                      Marks: 92
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </Box>
  );
}
