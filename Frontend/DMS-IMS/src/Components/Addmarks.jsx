import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

const Addmarks = () => {
  const [formState, setFormState] = useState({
    year: "",
    subject: "",
    branch: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState({
    A: {},
    B: {},
    C: {},
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleMarksChange = (section, part, value) => {
    setMarks((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [part]: value,
      },
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
          setStudents(data || []);
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
          setSubjects(data || []);
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubjects([]);
        });
    } else {
      setSubjects([]);
    }
  }, [formState.year]);

  const handleAddMarksClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleSubmitMarks = () => {
    // Handle submitting marks
    console.log("Submitted marks for student:", selectedStudent);
    console.log("Marks:", marks);
    // You can call an API to save these marks or perform other actions
    setShowModal(false);
    toast.success("Marks submitted successfully!");
  };

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
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAddMarksClick(student)}
                        >
                          Add Marks
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Marks for {selectedStudent?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <h4>Section A</h4>
              <Form.Group controlId="A1a">
                <Form.Label>1(a)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    handleMarksChange("A", "1a", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group controlId="A1b">
                <Form.Label>1(b)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    handleMarksChange("A", "1b", e.target.value)
                  }
                />
              </Form.Group>
              {/* Add other fields for Section A */}

              <h4>Section B</h4>
              <Form.Group controlId="B2a">
                <Form.Label>2(a)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    handleMarksChange("B", "2a", e.target.value)
                  }
                />
              </Form.Group>
              {/* Add other fields for Section B */}

              <h4>Section C</h4>
              <Form.Group controlId="C3">
                <Form.Label>3</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    handleMarksChange("C", "3", e.target.value)
                  }
                />
              </Form.Group>
              {/* Add other fields for Section C */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitMarks}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default Addmarks;
