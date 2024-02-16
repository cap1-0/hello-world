import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function TransactionFormModal({ show, handleClose, addTransaction, customer }) {
  const [quantity, setQuantity] = useState('');
  const [fat, setFat] = useState('');
  const [degree, setDegree] = useState('');
  const [date, setDate] = useState(getCurrentDate());

  useEffect(() => {
    if (customer) {
      // Set default values based on customer data
      setQuantity('');
      setFat('');
      setDegree('');
      setDate(getCurrentDate());
    }
  }, [customer]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zeros to month and day if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  const calculateRate = () => {
    // Sample rate calculation logic, replace it with your actual calculation logic
    const baseRate = 12.5;
    const fatRate = parseFloat(fat) * 0.5;
    const degreeRate = parseFloat(degree) * 0.3;
    return baseRate + fatRate + degreeRate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customer && quantity && fat && degree && date) {
      const rate = calculateRate();
      const transactionData = {
        date,
        degree: parseFloat(degree),
        fat: parseFloat(fat),
        quantity: parseFloat(quantity),
        rate,
        total: parseFloat(quantity) * rate,
      };
      addTransaction(transactionData);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add Transaction {customer ? `for ${customer.name}` : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="fat">
                <Form.Label>Fat:</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="Enter fat content"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="degree">
                <Form.Label>Degree:</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="Enter degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
            SAVE Transaction
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TransactionFormModal;
