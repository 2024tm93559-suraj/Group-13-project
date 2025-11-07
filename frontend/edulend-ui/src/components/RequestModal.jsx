import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createRequest } from '../redux/actions/requestActions';

const RequestModal = ({ show, onHide, item }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(1); // Default 1 day
  const { loading, error } = useSelector((state) => state.requests);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + parseInt(duration, 10));

    const payload = {
      equipment: item._id,
      quantity: 1, // Assuming 1 quantity per request for now
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    };

    dispatch(createRequest(payload));
    toast.success('Request submitted!');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request: {item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Borrowing Duration</Form.Label>
            <Form.Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={loading}
            >
              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
              <option value="4">4 Days</option>
              <option value="5">5 Days</option>
            </Form.Select>
          </Form.Group>

          {error && (
            <Alert variant="danger">
              Error: {error.message || 'Could not submit request.'}
            </Alert>
          )}

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100" 
            disabled={loading}
          >
            {loading ? <Spinner as="span" size="sm" /> : 'Submit Request'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestModal;