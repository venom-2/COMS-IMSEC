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
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const FacultyDashboard_viewCO = () => {
  const [selectedValue, setSelectedValue] = useState('60');
  const [subjectCode, setSubjectCode] = useState('');
  const [semester, setSemester] = useState('');
  const [co, setCo] = useState({});
  const [value, setValue] = useState(false);
  const [reportData, setReportData] = useState({});
  const [geminiResponse, setGeminiResponse] = useState({});

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const caculateco = async () => {
    setValue(true);
    try {
      const response = await fetch('http://localhost:3000/fetch/course-outcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target: selectedValue,
          subject_code: subjectCode,
          semester_id: semester,
        }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setCo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReportData = async () => {
    try{
      const response = await fetch('http://localhost:3000/fetch/class-test-assignment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      console.log(data.response);
      setReportData(data.response);
    } catch (err) {
      console.log(err);
    }
  }

  const generateReport = async () => {
    await fetchReportData();
    console.log('Generating report...');
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCATVG1d_jRoDpaPuuWkjwP8nbRB4ED-GY', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "contents": [{
            "parts": [{ "text": JSON.stringify(reportData, null, 2)  }]
          }]
        }),
      })
      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      console.log(data);
      setGeminiResponse(data.candidates.content.parts[0].text);
      console.log('Gemini response:', geminiResponse);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = () => {
    if (subjectCode && semester) {
      caculateco();
    } else {
      alert('Please fill in all fields');
    }
  }


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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          <TextField
            label="Enter Subject Code"
            variant="outlined"
            size="small"
            sx={{ width: '200px', mt: 2, ml: 2 }}
            onChange={(e) => setSubjectCode(e.target.value)}
          />
          <TextField
            label="Enter Semester"
            variant="outlined"
            size="small"
            sx={{ width: '200px', mt: 2, ml: 2 }}
            onChange={(e) => setSemester(e.target.value)}
          />
        </Box>
        <Box>
          <Button variant="contained" sx={{ mt: 2, mr: 2, backgroundColor: '#070F2B' }} onClick={handleSubmit}>Calculate CO</Button>
          <Button variant="contained" sx={{ mt: 2, backgroundColor: '#070F2B' }} onClick={generateReport}>Generate Report</Button>
        </Box>
      </Box>

      {/* CO Calculation Section */}
      <Box sx={{ mt: 5 }}>
        {value && (
          <Box>
            <Typography variant="h6" color="text.primary">Course Outcomes Calculation:</Typography>
            <Typography variant="body1" color="text.primary">Target Value: {selectedValue}</Typography>
            <Typography variant="body1" color="text.primary">Subject Code: {subjectCode}</Typography>
            <Typography variant="body1" color="text.primary">Semester: {semester}</Typography>

            <Typography variant="body1" color="text.primary">Students above the target value {selectedValue} % in CT1  = 30</Typography>
            <Typography variant="body1" color="text.primary">Students above the target value {selectedValue} % in CT2  = 25</Typography>
            <Typography variant="body1" color="text.primary">Students above the target value {selectedValue} % in PUT  = 13</Typography>
            <Typography variant="body1" color="text.primary">Students above the target value {selectedValue} % in Assignment  = 23</Typography>
            <Typography variant="body1" color="text.primary">Students above the target value {selectedValue} % in UT  = 33</Typography>
            <Typography variant="body1" color="text.primary">CO of {subjectCode} =  60% in (CT1+CT2+PUT) +  10% in (Assignment) + 30% in (UT)</Typography>
            <Typography variant="body1" color="text.primary">CO of {subjectCode} =  60% of (68) +  10% of (23) + 30% of (33) = 53.0</Typography>
            <Typography variant="body1" color="text.primary">CO of {subjectCode} =  80% of (53.0) +  20% of (0) = 42.4</Typography>
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>Final Value of CO of {subjectCode} = 1</Typography>
            {/* <ul>
              {Object.entries(co).map(([key, value]) => (
                <li key={key}>
                  <Typography variant="body1" color="text.primary">{`${key}: ${value}`}</Typography>
                </li>
              ))}
            </ul> */}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FacultyDashboard_viewCO;
