import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddStudent = () => {
  const[credentials, setCredentials] = useState({
    name: "",
    rollNumber: "",
    year: "",
    branch: "",
    section: "",
    email: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  }

  const addStudent = async() => {
    const { name, rollNumber, year, branch, section, email } = credentials;
    const res = await fetch('https://coms-imsec-phi.vercel.app/addData/student', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, rollNumber, year, branch, section, email
      })
    });
    const data = await res.json();
    if(data.success) {
      toast.success("Student added successfully!");
    } else {
      toast.error("Student addition failed!");
    }
    setCredentials({
      name: "",
      rollNumber: "",
      year: "",
      branch: "",
      section: "",
      email: ""
    });
  }
  return (
    <div>
      {/* Main Content */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Add Student to Database</h1>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="row mt-4">
              <div className="col-md-6">
                {/* Student Name */}
                <div className="form-group">
                  <label htmlFor="name">Student Name</label>
                  <input type="text" className="form-control" id="name" name='name' onChange={handleChange} value={credentials.name} placeholder="Enter Student Name" />
                </div>
              </div>
              <div className="col-md-6">
                {/* Roll Number */}
                <div className="form-group">
                  <label htmlFor="rollNumber">Roll Number</label>
                  <input type="text" className="form-control" id="rollNumber" name='rollNumber' onChange={handleChange} value={credentials.rollNumber} placeholder="Enter Roll Number" />
                </div>
              </div>
              <div className="col-md-4">
                {/* Year */}
                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <select className="form-control" id="year" name='year' value={credentials.year} onChange={handleChange}>
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                {/* Branch */}
                <div className="form-group">
                  <label htmlFor="branch">Branch</label>
                  <select className="form-control" id="branch" value={credentials.branch} onChange={handleChange} name='branch'>
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science</option>
                    <option value="CSD">Computer Science & Designing</option>
                    <option value="CSAI">Computer Science AI/ML</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                {/* Section */}
                <div className="form-group">
                  <label htmlFor="section">Section</label>
                  <select className="form-control" id="section" name='section' value={credentials.section} onChange={handleChange}>
                    <option value="">Select Section</option>
                    <option value="A">Section 1</option>
                    <option value="B">Section 2</option>
                    <option value="C">Section 3</option>
                    <option value="D">Section 4</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter Email" name='email' value={credentials.email} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <button className="btn btn-dark btn-lg" onClick={addStudent}>Add Student</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddStudent
