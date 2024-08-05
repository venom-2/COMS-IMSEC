import React from 'react'
import './HodDashboard_addFaculty.css'

const HodDashboard_assignFaculty = () => {
  return (
    <div className='add-faculty-container d-flex flex-column align-items-center'>
      <div className="heading-faculty h-20 d-flex justify-content-center mt-2">
        <h2>Assign Faculty to courses</h2>
      </div>
      <div className="form-faculty d-flex justify-content-center mt-2">
        <form className="d-flex flex-column gap-3">
          <div className="first-row d-flex gap-5 flex-wrap">
            <div className="name d-flex flex-column flex-fill">
              <label htmlFor="name">Faculty</label>
              <select className='form-control' id="name" name="name" required>
                <option value="">Select Faculty</option>
                <option value="faculty1">Faculty 1</option>
                <option value="faculty2">Faculty 2</option>
                <option value="faculty3">Faculty 3</option>
              </select>
            </div>
            <div className="department d-flex flex-column flex-fill">
              <label htmlFor="department">Department</label>
              <input className='form-control' type="text" id="department" name="department" value='Computer Science' required />
            </div>
          </div>
          <div className="email d-flex flex-column flex-wrap">
            <label htmlFor="year">Year</label>
            <select className='form-control' id="name" name="name" required>
              <option>Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div className="third-row d-flex gap-5 flex-wrap">
            <div className="password d-flex flex-column flex-fill">
              <label htmlFor="subject">Subject</label>
              <select className='form-control' id="password" name="password" required>
                <option value="">Select Subject</option>
                <option value="subject1">Subject 1</option>
                <option value="subject2">Subject 2</option>
                <option value="subject3">Subject 3</option>
              </select>
            </div>
            <div className="confirm-password d-flex flex-column flex-fill">
              <label htmlFor="section">Section</label>
              <select className='form-control' id="section" name="section" required>
                <option value="">Select Section</option>
                <option value="A">Section-01</option>
                <option value="B">Section-02</option>
                <option value="C">Section-03</option>
                <option value="D">Section-04</option>
              </select>
            </div>
          </div>
          <div className="submit d-flex justify-content-center">
            <input className='submit-btn' type="submit" value="Assign Faculty" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default HodDashboard_assignFaculty