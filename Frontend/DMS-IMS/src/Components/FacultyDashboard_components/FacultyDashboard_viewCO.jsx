import React, { useState, useEffect } from 'react';
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
  const [pdfUrl, setPdfUrl] = useState(null);
  const [subjectCode, setSubjectCode] = useState('');
  const [semester, setSemester] = useState('');
  const [co, setCo] = useState({});
  const [value, setValue] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [reportData, setReportData] = useState(
    {
      "targetValue": 60,
      "subjectCode": "KCS-302",
      "semester": 3,
      "assessmentData": {
        "CT1": {
          "studentsAboveTarget": 30
        },
        "CT2": {
          "studentsAboveTarget": 25
        },
        "PUT": {
          "studentsAboveTarget": 13
        },
        "Assignment": {
          "studentsAboveTarget": 23
        },
        "UT": {
          "studentsAboveTarget": 33
        }
      },
      "coCalculationDetails": {
        "formula": "60% in (CT1+CT2+PUT) + 10% in (Assignment) + 30% in (UT)",
        "step1Calculation": "60% of (68) + 10% of (23) + 30% of (33) = 53.0",
        "step2Calculation": "80% of (53.0) + 20% of (0) = 42.4",
        "finalCOValue": 1
      }
    }
  );

  // Effect to clean up the object URL when pdfUrl changes or component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl);
        console.log('PDF object URL revoked:', pdfUrl);
      }
    };
  }, [pdfUrl]);

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
    try {
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
    setValue(false);
    await fetchReportData();
    console.log('Generating report...');
    setStatusMessage('Generating PDF... Please wait.'); // Set loading message
    setStatusType(''); // Clear any previous type
    setPdfUrl(null); // Clear previous PDF if any
    try {
      const response = await fetch('http://localhost:3000/report/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      if (!response.ok) {
        // If backend sends JSON error, try to parse it
        const errorResponse = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Server error: ${response.status} - ${errorResponse.error || errorResponse.message || 'Unknown error'}`);
      }
      
      // IMPORTANT: Get response as Blob for PDF
      const pdfBlob = await response.blob();
      console.log('PDF Blob received:', pdfBlob);
      if (!pdfBlob || pdfBlob.size === 0) {
        throw new Error('Received empty PDF blob. Please check the server response.');
      }

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(pdfBlob);
      setPdfUrl(url); // Set the PDF URL in state

      console.log('PDF URL:', url);

      // Create a temporary <a> tag for download
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'college_co_report.pdf'; // Suggested filename for download
      // document.body.appendChild(a); // Append to body to make it clickable

      // // Programmatically click the link to trigger download
      // a.click();

      // // Clean up by revoking the object URL and removing the link
      // window.URL.revokeObjectURL(url);
      // a.remove();

      setStatusMessage('PDF generated and downloaded successfully!');
      setStatusType('success'); // Set type for styling
    }
    catch (err) {
      console.error('Error during PDF generation or download:', error);
      setStatusMessage(`Error: ${err.message}`);
      setStatusType('error');
      setPdfUrl(null); // Clear PDF URL on error
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
          {/* Display the status message */}
          <Typography variant="body2" sx={{ mt: 2 }} className={statusType}>
            {statusMessage}
          </Typography>
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

      {/* PDF Display Section */}
      {pdfUrl && (
        <Box sx={{ mt: 5, width: '100%', height: '800px', border: '1px solid #ccc' }}>
          <iframe
            src={pdfUrl}
            title="Generated Report PDF"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </Box>
      )}

    </Container>
  );
};

export default FacultyDashboard_viewCO;
