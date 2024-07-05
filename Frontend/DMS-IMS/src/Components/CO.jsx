import React, { useState } from 'react';
import COResult from './COResult';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const CO = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container className="my-4">
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
      <COResult showModal={showModal} setShowModal={setShowModal} />
    </Container>
  );
};

export default CO;
