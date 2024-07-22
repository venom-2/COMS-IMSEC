import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaChalkboardTeacher, FaBook, FaProjectDiagram } from 'react-icons/fa';

const MainDashboard = () => {
  return (
    <Container fluid className="px-4">
      {/* Dashboard Header */}
      {/* <Row className="mb-4 mx-5">
        <Col>
          <h1 className="h2">Main Dashboard</h1>
        </Col>
      </Row> */}

      {/* Dashboard Cards */}
      <Row className="g-4 mt-4" style={{ marginLeft: '10rem' }}>
        <Col md={3} className="d-flex">
          <Card className="shadow-sm border-light flex-fill d-flex flex-column justify-content-center text-center">
            <Card.Body>
              <FaChalkboardTeacher size={50} className="text-primary mb-2" />
              <Card.Title className="h4">Total Faculties</Card.Title>
              <Card.Text className="display-4">120</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="d-flex">
          <Card className="shadow-sm border-light flex-fill d-flex flex-column justify-content-center text-center">
            <Card.Body>
              <FaUsers size={50} className="text-success mb-2" />
              <Card.Title className="h4">Total Students</Card.Title>
              <Card.Text className="display-4">1500</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="d-flex">
          <Card className="shadow-sm border-light flex-fill d-flex flex-column justify-content-center text-center">
            <Card.Body>
              <FaBook size={50} className="text-warning mb-2" />
              <Card.Title className="h4">Active Courses</Card.Title>
              <Card.Text className="display-4">45</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="d-flex">
          <Card className="shadow-sm border-light flex-fill d-flex flex-column justify-content-center text-center">
            <Card.Body>
              <FaProjectDiagram size={50} className="text-danger mb-2" />
              <Card.Title className="h4">Completed Projects</Card.Title>
              <Card.Text className="display-4">75</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainDashboard;
