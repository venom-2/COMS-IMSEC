import React, { useState } from 'react';
import {
  Breadcrumbs,
  Container,
  Link,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const FacultyDashboard_viewCO = () => {
  const [selectedValue, setSelectedValue] = useState('60');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit">
      Faculty Dashboard
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      View CO
    </Typography>,
  ];

  return (
    <Container sx={{ mt: 10 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mt: '20px' }}
      >
        {breadcrumbs}
      </Breadcrumbs>

      {/* Radio Button Section */}
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControl>
          <FormLabel id="radio-buttons-group-label" color='text.primary'>Choose Target Value</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            name="percentage"
            value={selectedValue}
            onChange={handleChange}
          >
            <FormControlLabel value="60" control={<Radio />} label="60" />
            <FormControlLabel value="70" control={<Radio />} label="70" />
            <FormControlLabel value="80" control={<Radio />} label="80" />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" sx={{ mt: 2, backgroundColor: '#070F2B' }}>Calculate CO</Button>
      </Box>
    </Container>
  );
};

export default FacultyDashboard_viewCO;
