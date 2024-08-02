import React, { useEffect, useState } from 'react'
import './HodDashboard_addFaculty.css'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

const HodDashboard_addFaculty = () => {

  const [faculties, setFaculties] = useState([]);
  const [dept, setDept] = useState("");
  const [faculty, setFaculty] = useState({
    name: "",
    role: "faculty",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const payload = jwtDecode(localStorage.getItem('authToken'));
    setDept(payload.user.department);
    console.log(payload.user.department);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (faculty.password !== document.getElementById('confirm-password').value) {
      toast('Passwords do not match');
      return;
    }
    faculty.department = dept;
    try {
      const response = await fetch('https://dms-backend-eight.vercel.app/add/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': `${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(faculty)
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success('Faculty added successfully');
        setFaculties([...faculties, faculty]);
        setFaculty({
          name: "",
          role: "faculty",
          email: "",
          password: ""
        });
      }
      else {
        toast.error(data.message);
      }
    }
    catch (err) {
      console.log(err);
    }
  }


useEffect(() => {
  const arr = [
    { name: 'John Doe', department: 'Computer Science', email: 'email@imsec.ac.in' },
    { name: 'Jane Doe', department: 'Electronics', email: 'email@imsec.ac.in' },
    { name: 'John Doe', department: 'Computer Science', email: 'email@imsec.ac.in' },
    { name: 'John Doe', department: 'Computer Science', email: 'email@imsec.ac.in' },
    { name: 'John Doe', department: 'Computer Science', email: 'email@imsec.ac.in' },
    { name: 'John Doe', department: 'Computer Science', email: 'email@imsec.ac.in' }
  ];

  setFaculties(arr);
}, []);



return (
  <div className='add-faculty-container d-flex flex-column align-items-center'>
    <div className="heading-faculty h-20 d-flex justify-content-center mt-2">
      <h2>Add Faculty</h2>
    </div>
    <div className="form-faculty d-flex justify-content-center mt-2">
      <form className="d-flex flex-column gap-3">
        <div className="first-row d-flex gap-5 flex-wrap">
          <div className="name d-flex flex-column flex-fill">
            <label htmlFor="name">Name</label>
            <input className='form-control' onChange={handleChange} value={faculty.name} type="text" id="name" name="name" placeholder="Enter name" required />
          </div>
          <div className="department d-flex flex-column flex-fill">
            <label htmlFor="department">Department</label>
            <input className='form-control' type="text" value={dept} id="department" name="department" required />
          </div>
        </div>
        <div className="email d-flex flex-column flex-wrap">
          <label htmlFor="email">Email</label>
          <input className='form-control' type="email" onChange={handleChange} value={faculty.email} id="email" name="email" placeholder="Enter email" required />
        </div>
        <div className="third-row d-flex gap-5 flex-wrap">
          <div className="password d-flex flex-column flex-fill">
            <label htmlFor="password">Password</label>
            <input className='form-control' type="password" onChange={handleChange} value={faculty.password} id="password" name="password" placeholder="Enter password" required />
          </div>
          <div className="confirm-password d-flex flex-column flex-fill">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input className='form-control' type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm password" required />
          </div>
        </div>
        <div className="submit d-flex justify-content-center">
          <input className='submit-btn' type="submit" onClick={handleSubmit} value="Add Faculty" />
        </div>
      </form>
    </div>
    <div className="faculty-table mt-2">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{faculty.name}</td>
              <td>{faculty.department}</td>
              <td>{faculty.email}</td>
              <td><button className='btn btn-primary'>Edit</button></td>
              <td><button className='btn btn-danger'>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
}

export default HodDashboard_addFaculty