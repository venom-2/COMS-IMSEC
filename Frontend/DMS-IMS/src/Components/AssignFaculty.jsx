import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AssignFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [subject, setSubject] = useState([]);
  const [credentials, setCredentials] = useState({
    branch: "",
    year : "",
    subjectID : "",
    userID : ""
  });

  const assignSubject = async()=> {
    const response = await fetch('https://coms-imsec-backend.vercel.app/assign', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subjectID: credentials.subjectID, userID : credentials.userID }),
    })
    const parsedResponse = await response.json();
    if(parsedResponse.success) {
      toast.success("Faculty assigned successfully!");
    } else {
      toast.error("Faculty assignment failed!");
    }
    setCredentials({
      branch: "",
      year : "",
      subjectID : "",
      userID : ""
    });
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    fetch("https://coms-imsec-backend.vercel.app/fetch/faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department: credentials.branch }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFaculty(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [credentials.branch]);

  useEffect(() => {
    fetch("https://coms-imsec-backend.vercel.app/fetch/subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year: credentials.year }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubject(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [credentials.year]);

  return (
    <div>
      {/* Main Content */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Assign Faculty to Courses</h1>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="row mt-4">
              <div className="col-md-4">
                {/* Year */}
                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <select className="form-control" id="year" value={credentials.year} name="year" onChange={handleChange}>
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
                  <select
                    className="form-control"
                    id="branch"
                    onChange={handleChange}
                  >
                    <option value="">Select Branch</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Computer Science & Designing">
                      Computer Science & Designing
                    </option>
                    <option value="Computer Science AI/ML">
                      Computer Science AI/ML
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                {/* Section */}
                <div className="form-group">
                  <label htmlFor="section">Section</label>
                  <select className="form-control" id="section">
                    <option value="">Select Section</option>
                    <option value="A">Section 1</option>
                    <option value="B">Section 2</option>
                    <option value="C">Section 3</option>
                    <option value="D">Section 4</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                {/* Subject */}
                <div className="form-group">
                  <label htmlFor="subjectID">Subject</label>
                  <select className="form-control" id="subjectID" value={credentials.subjectID} onChange={handleChange} name="subjectID">
                    <option value="">Select Subject</option>
                    {subject.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.subjectName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                {/* Assign Faculty */}
                <div className="form-group">
                  <label htmlFor="userID">Assign Faculty</label>
                  <select className="form-control" id="userID" value={credentials.userID} name="userID" onChange={handleChange}>
                    <option value="">Select Faculty</option>
                    {faculty.map((faculty) => (
                      <option key={faculty._id} value={faculty._id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <button className="btn btn-dark btn-lg" onClick={assignSubject}>Assign Now</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssignFaculty;
