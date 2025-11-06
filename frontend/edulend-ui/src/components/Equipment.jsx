import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEquipment, updateEquipment, deleteEquipment } from '../redux/actions/equipmentActions';
import { Button, Card, Col, Row, Spinner, Alert, Form, Modal } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

// --- Edit Modal Component ---
const EditEquipmentModal = ({ show, onHide, item, dispatch, loading }) => {
  
  const [formData, setFormData] = useState({
    name: item.name || '',
    category: item.category || '',
    condition: item.condition || 'good',
    quantity: item.quantity || 1,
    available: item.available || 0,
  });
  
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || '',
        condition: item.condition || 'good',
        quantity: item.quantity || 1,
        available: item.available || 0,
      });
      setValidationError('');
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    if (name === 'available' || name === 'quantity') {
      const total = parseInt(newFormData.quantity, 10);
      const avail = parseInt(newFormData.available, 10);

      if (avail > total) {
        setValidationError('Available quantity cannot exceed total quantity.');
      } else {
        setValidationError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const total = parseInt(formData.quantity, 10);
    const avail = parseInt(formData.available, 10);

    if (avail > total) {
      setValidationError('Available quantity cannot exceed total quantity.');
      return;
    }
    
    setValidationError('');
    dispatch(updateEquipment(item._id, formData));
    toast.success('Equipment updated!');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Equipment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Form.Group for Name */}
          <Form.Group className="mb-3">
            <Form.Label>Equipment Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Form.Group>
          
          {/* Form.Group for Category */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Form.Group>

          {/* Form.Group for Condition */}
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

          <Row>
            {/* Form.Group for Total Quantity */}
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Total Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  required
                  disabled={loading}
                />
              </Form.Group>
            </Col>
            {/* Form.Group for Available */}
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Available</Form.Label>
                <Form.Control
                  type="number"
                  name="available"
                  value={formData.available}
                  onChange={handleChange}
                  min="0"
                  max={formData.quantity}
                  required
                  disabled={loading}
                  isInvalid={!!validationError}
                />
                {validationError && (
                  <Form.Text className="text-danger">
                    {validationError}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 mt-2"
            disabled={loading || !!validationError}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


// --- Main Equipment Component ---
const Equipment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.equipment);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [availabilityFilter, setAvailabilityFilter] = useState('All Statuses');
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const isAdmin = user && user.role === 'admin';
  const isStudent = user && user.role === 'student';

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchEquipment());
    }
  }, [dispatch, token, navigate]);

  const getFilteredItems = () => {
    return items
      .filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .filter((item) => {
        if (categoryFilter === 'All Categories') return true;
        return item.category === categoryFilter;
      })
      .filter((item) => {
        if (availabilityFilter === 'All Statuses') return true;
        if (availabilityFilter === 'Available') return item.available > 0;
        if (availabilityFilter === 'Unavailable') return item.available === 0;
        return true;
      });
  };

  const filteredItems = getFilteredItems();
  const categories = ['All Categories', ...new Set(items.map(item => item.category))];

  const getStatusBadge = (item) => {
    if (item.condition === 'needs_repair' || item.condition === 'damaged') {
      return <span className="badge bg-warning text-dark card-status-badge">Maintenance</span>;
    }
    if (item.available > 0) {
      return <span className="badge bg-success card-status-badge">Available</span>;
    }
    return <span className="badge bg-secondary card-status-badge">Unavailable</span>;
  };
  
  const formatCondition = (condition) => {
    switch (condition) {
      case 'good':
        return 'Good';
      case 'fair':
        return 'Fair';
      case 'needs_repair':
        return 'Needs Repair';
      default:
        return condition.charAt(0).toUpperCase() + condition.slice(1);
    }
  };

  const handleShowEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteEquipment(id));
      toast.success('Equipment deleted');
    }
  };

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="h2 mb-0">Equipment Dashboard</h1>
        </Col>
      </Row>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <Row className="g-3">
          <Col md={4}>
            <Form.Label>Search by Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search for equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label>Availability</Form.Label>
            <Form.Select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Available</option>
              <option>Unavailable</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          <strong>Error:</strong> {error.message || 'Failed to fetch equipment.'}
        </Alert>
      )}

      {!loading && !error && items.length === 0 && (
        <Alert variant="info">
          No equipment has been added yet.
          {isAdmin && ' Click "Add New Equipment" to get started.'}
        </Alert>
      )}
      
      {!loading && !error && items.length > 0 && filteredItems.length === 0 && (
        <Alert variant="secondary">
          No equipment matches your current filters.
        </Alert>
      )}

      <Row>
        {filteredItems.map((item) => (
          <Col md={6} lg={4} key={item._id} className="mb-4">
            <Card className="equipment-card h-100">
              
              {isAdmin && (
                <div className="card-action-buttons">
                  <Button variant="light" size="sm" className="me-2" onClick={() => handleShowEdit(item)}>
                    <PencilSquare />
                  </Button>
                  <Button variant="light" size="sm" onClick={() => handleDelete(item._id)}>
                    <Trash />
                  </Button>
                </div>
              )}

              <Card.Body>
                {getStatusBadge(item)}
                <Card.Title className="mt-2">{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.category}
                </Card.Subtitle>
                
                <Card.Text className="mb-1">
                  <strong>Condition:</strong> {formatCondition(item.condition)}
                </Card.Text>
                
                <Card.Text>
                  <strong>Quantity:</strong> {item.available} / {item.quantity}
                </Card.Text>

                {isStudent && (
                  <Button variant="primary" className="w-100 mt-2">
                    Request to Borrow
                  </Button>
                )}
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {selectedItem && (
        <EditEquipmentModal
          show={showEditModal}
          onHide={handleCloseEdit}
          item={selectedItem}
          dispatch={dispatch}
          loading={loading}
        />
      )}
    </>
  );
};

export default Equipment;