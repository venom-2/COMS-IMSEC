import React, { useEffect,useState } from 'react'
import './HodDashboard_addFaculty.css'

const HodDashboard_addFaculty = () => {

  const [faculties, setFaculties] = useState([]);

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
              <input className='form-control' type="text" id="name" name="name" placeholder="Enter name" required />
            </div>
            <div className="department d-flex flex-column flex-fill">
              <label htmlFor="department">Department</label>
              <input className='form-control' type="text" id="department" name="department" placeholder="Enter department" required />
            </div>
          </div>
          <div className="email d-flex flex-column flex-wrap">
            <label htmlFor="email">Email</label>
            <input className='form-control' type="email" id="email" name="email" placeholder="Enter email" required />
          </div>
          <div className="third-row d-flex gap-5 flex-wrap">
            <div className="password d-flex flex-column flex-fill">
              <label htmlFor="password">Password</label>
              <input className='form-control' type="password" id="password" name="password" placeholder="Enter password" required />
            </div>
            <div className="confirm-password d-flex flex-column flex-fill">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input className='form-control' type="password" id="confirm-password" name="confirm-password" placeholder="Confirm password" required />
            </div>
          </div>
          <div className="submit d-flex justify-content-center">
            <input className='submit-btn' type="submit" value="Add Faculty" />
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