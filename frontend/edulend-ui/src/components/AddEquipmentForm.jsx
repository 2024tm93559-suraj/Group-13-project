import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { addEquipment } from "../redux/actions/equipmentActions";
import { toast } from "react-toastify";

const AddEquipmentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, loading } = useSelector((state) => state.equipment);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🧠 School Equipment AI Suggestions
  const aiEquipmentSuggestions = [
    {
      name: "Projector",
      category: "Classroom Equipment",
      condition: "good",
      quantity: 2,
    },
    {
      name: "Microscope",
      category: "Science Lab",
      condition: "fair",
      quantity: 5,
    },
    {
      name: "Basketball",
      category: "Sports Equipment",
      condition: "good",
      quantity: 10,
    },
    {
      name: "Cricket Kit",
      category: "Sports Equipment",
      condition: "good",
      quantity: 4,
    },
    {
      name: "Laptop",
      category: "Computer Lab",
      condition: "good",
      quantity: 8,
    },
    {
      name: "Whiteboard Markers",
      category: "Stationery",
      condition: "fair",
      quantity: 15,
    },
    {
      name: "Physics Experiment Kit",
      category: "Science Lab",
      condition: "good",
      quantity: 6,
    },
    {
      name: "Tablet",
      category: "Digital Learning",
      condition: "fair",
      quantity: 12,
    },
    {
      name: "Digital Camera",
      category: "Media Lab",
      condition: "good",
      quantity: 3,
    },
    {
      name: "Volleyball Net",
      category: "Sports Equipment",
      condition: "good",
      quantity: 1,
    },
  ];

  // 📝 Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    condition: "",
    quantity: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("You are not authorized to access this page.");
      navigate("/equipment");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isSubmitting && !loading) {
      if (!error) {
        toast.success("Equipment added successfully!");
        navigate("/equipment");
      }
      setIsSubmitting(false);
    }
  }, [loading, isSubmitting, error, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.category ||
      !formData.condition ||
      !formData.quantity
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    setIsSubmitting(true);
    dispatch(addEquipment(formData));
  };

  // ✨ AI Suggestion Handler
  const handleAISuggestion = () => {
    const randomIndex = Math.floor(
      Math.random() * aiEquipmentSuggestions.length
    );
    const suggestion = aiEquipmentSuggestions[randomIndex];
    setFormData(suggestion);
    toast.info(`AI suggested: ${suggestion.name}`);
  };

  // 🔄 Clear form handler
  const handleClear = () => {
    setFormData({
      name: "",
      category: "",
      condition: "",
      quantity: "",
    });
    toast.info("Form cleared!");
  };

  if (user?.role !== "admin") {
    return null;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <Card style={{ width: "40rem" }} className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Add New Equipment (AI-Assisted)</h2>

          {error && isSubmitting && (
            <Alert variant="danger">
              Failed to add equipment: {error.message || "Unknown error"}
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
                placeholder="e.g., Microscope"
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
                placeholder="e.g., Science Lab"
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
                required
              >
                <option value="">Select</option>
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
                placeholder="Please enter"
                required
                disabled={loading}
              />
            </Form.Group>

            <Row className="mt-3">
              <Col xs={12} md={6}>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Equipment"}
                </Button>
              </Col>
              <Col xs={12} md={3}>
                <Button
                  variant="secondary"
                  type="button"
                  className="w-100"
                  onClick={handleAISuggestion}
                >
                  AI Suggest
                </Button>
              </Col>
              <Col xs={12} md={3}>
                <Button
                  variant="outline-danger"
                  type="button"
                  className="w-100"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddEquipmentForm;
