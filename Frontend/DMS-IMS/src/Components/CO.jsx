import React, { useContext, useState } from "react";
import COResult from "./COResult";
import { COContext } from "../contextAPI/COContext";
import { Button, Container, Row, Col, Card, Table } from "react-bootstrap";

const CO = () => {
  const { coData } = useContext(COContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <Container className="my-4">
      <COResult showModal={showModal} setShowModal={setShowModal} />
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Course Outcome Results</Card.Title>
              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="w-100"
              >
                Open COResult
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Display the table if coData is available */}
      {coData.length > 0 && (
        <Row className="justify-content-center mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Roll Number</th>
                  <th>Year</th>
                  <th>Branch</th>
                  <th>Section</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {coData.map((co, index) => (
                  <tr key={co._id}>
                    <td>{index + 1}</td>
                    <td>{co.rollNumber}</td>
                    <td>{co.year}</td>
                    <td>{co.branch}</td>
                    <td>{co.section}</td>
                    <td>{co.subject}</td>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CO;
