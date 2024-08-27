import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HodDashboard_components/HodDashboard_addFaculty.css';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const FacultyDashboard_addStudent = () => {
  const [files, setFiles] = useState([]);
  const [students, setStudents] = useState({
    name: '',
    rollNumber: '',
    email: '',
    year: '',
    section: ''
  });

  const handleChange = (e) => {
    setStudents({ ...students, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = jwtDecode(localStorage.getItem("authToken"));
      students.branch = payload.user.department;
      console.log(students);
      const response = await fetch("https://dms-backend-eight.vercel.app/add/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem("authToken")
        },
        body: JSON.stringify(students)
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Student added successfully!");
        setStudents({
          name: '',
          rollNumber: '',
          email: '',
          year: '',
          section: ''
        });
      } else {
        toast.error("Failed to add student!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add student!");
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("No files selected!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      const response = await fetch("https://dms-backend-eight.vercel.app/csv/student", {
        method: "POST",
        headers: {
          "authToken": localStorage.getItem("authToken")
        },
        body: formData
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Students added successfully!");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add students!");
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: '.csv',
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const handleUploadClick = () => {
    open();
  };

  return (
    <div className='add-faculty-container d-flex flex-column align-items-center'>
      <div className="heading-faculty h-20 d-flex justify-content-center mt-2">
        <h2>Add Student</h2>
      </div>
      <div className="form-faculty d-flex justify-content-center mt-2">
        <form className="d-flex flex-column gap-3">
          <div className="first-row d-flex gap-5 flex-wrap">
            <div className="name d-flex flex-column col md-6">
              <label htmlFor="name">Name</label>
              <input className='form-control' onChange={handleChange} value={students.name} type="text" id="name" name="name" placeholder="Enter name" required />
            </div>
            <div className="roll-no d-flex flex-column col md-6">
              <label htmlFor="rollNumber">Roll No</label>
              <input className='form-control' onChange={handleChange} value={students.rollNumber} type="text" id="rollNumber" name="rollNumber" placeholder="Enter roll no" required />
            </div>
          </div>
          <div className="email d-flex flex-column flex-wrap">
            <label htmlFor="email">Email</label>
            <input className='form-control' type="email" onChange={handleChange} value={students.email} id="email" name="email" placeholder="Enter email" required />
          </div>
          <div className="third-row d-flex gap-5 flex-wrap">
            <div className="year d-flex flex-column col md-6">
              <label htmlFor="year">Year</label>
              <select className='form-control' id="year" name="year" onChange={handleChange} value={students.year} required>
                <option value="" disabled>Select year</option>
                <option value="1st year">1st year</option>
                <option value="2nd year">2nd year</option>
                <option value="3rd year">3rd year</option>
                <option value="4th year">4th year</option>
              </select>
            </div>
            <div className="section d-flex flex-column col md-6">
              <label htmlFor="section">Section</label>
              <select className='form-control' id="section" name="section" onChange={handleChange} value={students.section} required>
                <option value="" disabled>Select section</option>
                <option value="section-01">Section-01</option>
                <option value="section-02">Section-02</option>
                <option value="section-03">Section-03</option>
                <option value="section-04">Section-04</option>
              </select>
            </div>
          </div>
          <div className="submit d-flex justify-content-center">
            <input className='submit-btn btn btn-primary' type="submit" onClick={handleSubmit} value="Add Student" />
          </div>
        </form>
      </div>
      <div className="d-flex align-items-center my-2">
        <div className="mx-3 text-center fw-bold">Or</div>
      </div>

      <div className="faculty-table mt-0">
        <div className="upload-file" {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="dropzone upload-input p-3 text-center bg-light" onClick={handleUploadClick}>
            <div className="upload-icon mb-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 5L7 10M12 5L17 10M4 15H20" stroke="#17153B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p>Choose a file or drag it here.</p>
          </div>
        </div>
        <div className="mt-0">
          <button className="btn upload-btn" onClick={handleFileSubmit}>Upload CSV</button>
        </div>
      </div>
    </div>
  )
}

export default FacultyDashboard_addStudent