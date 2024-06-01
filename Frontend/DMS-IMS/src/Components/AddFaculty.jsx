import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddFaculty = () => {
  const[credentials, setCredentials] = useState({
    name: "",
    department: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  }

  const addFaculty = async() => {
    const { name, department, email, password, role } = credentials;
    const res = await fetch('http://localhost:3000/addData/user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, department, email, password, role
      })
    });
    const data = await res.json();
    if(data.success) {
      toast.success("Faculty added successfully!");
    } else {
      toast.error("Faculty addition failed!");
    }
    setCredentials({
      name: "",
      department: "",
      email: "",
      password: "",
      role: ""
    });
  }

  return (
    <div>
      {/* Main Content */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Add Faculty to Database</h1>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="row mt-4">
              <div className="col-md-6">
                {/* Faculty Name */}
                <div className="form-group">
                  <label htmlFor="name">Faculty Name</label>
                  <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={handleChange} placeholder="Enter Faculty Name" />
                </div>
              </div>
              <div className="col-md-6">
                {/* Department */}
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select className="form-control" id="department" name='department' value={credentials.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Computer Science & Designing">Computer Science & Designing</option>
                    <option value="Computer Science AI/ML">Computer Science AI/ML</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" value={credentials.email} name='email' onChange={handleChange} id="email" placeholder="Enter Email" />
                </div>
              </div>
              <div className="col-md-6">
                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="text" className="form-control" value={credentials.password} name='password' onChange={handleChange} id="password" placeholder="Password" />
                </div>
              </div>
              <div className="col-md-6">
                {/* Department */}
                <div className="form-group">
                  <label htmlFor="department">Role</label>
                  <select className="form-control" id="department" value={credentials.role} name='role' onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="HOD">HOD</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <button className="btn btn-dark btn-lg" onClick={addFaculty}>Add Faculty</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddFaculty
