import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Addmarks = () => {
  const [formState, setFormState] = useState({
    year: "",
    subject: "",
    branch: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]); // State for students

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const fetchStudents = async (e) => {
    e.preventDefault();
    if (formState.year && formState.branch && formState.subject) {
      console.log("Fetching students for:", formState);
      try {
        const response = await fetch("http://localhost:3000/fetch/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Students fetched successfully!");
          console.log("Students:", data);
          setStudents(data || []); // Update state with fetched students or empty array
        } else {
          toast.error("Failed to fetch students.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching students.");
      }
    } else {
      console.log(formState.year, formState.branch, formState.subject);
      toast.error("Please fill out all fields.");
    }
  };

  useEffect(() => {
    if (formState.year) {
      fetch("https://coms-imsec-backend.vercel.app/fetch/subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: formState.year }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSubjects(data || []); // Ensure subjects are an array
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubjects([]); // Fallback to empty array on error
        });
    } else {
      setSubjects([]);
    }
  }, [formState.year]);

  return (
    <div className="container-fluid">
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Fetch Students</h1>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={fetchStudents}>
              <div className="row mt-4">
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <select
                      className="form-control"
                      id="year"
                      value={formState.year}
                      onChange={handleChange}
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      className="form-control"
                      id="subject"
                      value={formState.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select Subject</option>
                      {subjects.length > 0 ? (
                        subjects.map((subject) => (
                          <option key={subject._id} value={subject.subjectName}>
                            {subject.subjectName}
                          </option>
                        ))
                      ) : (
                        <option disabled>No subjects available</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label htmlFor="branch">Branch</label>
                    <select
                      className="form-control"
                      id="branch"
                      value={formState.branch}
                      onChange={handleChange}
                    >
                      <option value="">Select Branch</option>
                      <option value="CSE">Computer Science</option>
                      <option value="CSD">Computer Science & Designing</option>
                      <option value="CSAI">Computer Science AI/ML</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-dark btn-lg">
                    Fetch Students
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Conditionally render the table if students are available */}
        {students.length > 0 && (
          <div className="card mt-4 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Students List</h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Serial No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Roll Number</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Year</th>
                    <th scope="col">Add Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.rollNumber}>
                      <th scope="row">{index + 1}</th>
                      <td>{student.name}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.branch}</td>
                      <td>{student.year}</td>
                      <td>
                        <button className="btn btn-primary btn-sm">Add Marks</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Addmarks;
