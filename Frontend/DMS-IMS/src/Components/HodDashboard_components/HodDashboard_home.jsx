import React from 'react'
import './HodDashboard_home.css'

const HodDashboard_home = () => {
  return (
    <div className='container'>
      <div className="card-container justify-content-center d-flex flex-wrap">
        <div className="card1 d-flex flex-column gap-2">
          <h1>25</h1>
          <p>No. of Faculties</p>
        </div>
        <div className="card2 d-flex flex-column gap-2">
          <h1>25</h1>
          <p>No. of Students</p>
        </div>
        <div className="card3 d-flex flex-column">
          <h1>25</h1>
          <p>No. of  Subjects</p>
        </div>
      </div>
      <div className="button-container d-flex flex-wrap justify-content-center">
        <div className="course-outcome d-flex justify-content-center col md-4">
          <button className="btn course-outcome-btn btn-primary">Course Outcome</button>
        </div>
        <div className="attendance d-flex justify-content-center col md-4">
          <button className="btn attendance-btn btn-primary">Attendance</button>
        </div>
        <div className="co-feedback d-flex justify-content-center col md-4">
          <button className="btn co-feedback-btn btn-primary">CO Feedback</button>
        </div>
      </div>
    </div>
  )
}

export default HodDashboard_home