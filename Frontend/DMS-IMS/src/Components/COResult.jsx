import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, Button, Row, Col, Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { COContext } from "../contextAPI/COContext";

const COResult = ({ showModal, setShowModal }) => {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const { coData, setCoData } = useContext(COContext);

  useEffect(() => {
    fetch("https://coms-imsec-phi.vercel.app/fetch/subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year: year }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubject(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [year]);

  const handleFetch = async (e) => {
    e.preventDefault();
    const response = await fetch("https://coms-imsec-phi.vercel.app/fetch/co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year, branch, subject }),
    });
    const parsedResponse = await response.json();
    setCoData(parsedResponse);
    // console.log("CO Data:", coData, parsedResponse);
    console.log(parsedResponse);
    toast.success("Results fetched successfully");
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Fetch CO Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleFetch}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    as="select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    {/* Add more options as needed */}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="branch">
                  <Form.Label>Branch</Form.Label>
                  <Form.Control
                    as="select"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics and Communication</option>
                    <option value="EEE">Electrical and Electronics</option>
                    <option value="ME">Mechanical Engineering</option>
                    {/* Add more options as needed */}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="branch">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    as="select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subject && Array.isArray(subject) && subject.length > 0 ? (
                      subject.map((sub) => (
                        <option key={sub._id} value={sub.subjectName}>
                          {sub.subjectName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No subjects available</option>
                    )}

                    {/* Add more options as needed */}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={handleFetch}
            >
              Fetch
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default COResult;
