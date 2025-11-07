import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { addEquipment } from '../redux/actions/equipmentActions';
import { toast } from 'react-toastify';

const AddEquipmentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { error, loading } = useSelector((state) => state.equipment);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: 'good',
    quantity: 1,
  });

  useEffect(() => {
    if (user === null) return; // wait for auth load
    if (!user || user.role !== "admin") {
      toast.error("You are not authorized to access this page.");
      navigate("/equipment");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isSubmitting && !loading) {
      if (!error) {
        toast.success('Equipment added successfully!');
        navigate('/equipment');
      }
      setIsSubmitting(false);
    }
  }, [loading, isSubmitting, error, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(addEquipment(formData));
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <Card style={{ width: '40rem' }} className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Add New Equipment</h2>
          
          {error && isSubmitting && (
            <Alert variant="danger">
              Failed to add equipment: {error.message || 'Unknown error'}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Equipment Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., DSLR Camera"
                required
                disabled={loading}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Electronics"
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Condition</Form.Label>
              <Form.Select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="needs_repair">Needs Repair</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required
                disabled={loading}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mt-2"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Equipment'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddEquipmentForm;