import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipment } from "../redux/actions/equipmentActions";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const EquipmentAnalytics = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.equipment);

  useEffect(() => {
    dispatch(fetchEquipment());
  }, [dispatch]);

  // 📊 Prepare data for charts
  const chartData = items.map((item) => ({
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    available: item.available,
  }));

  // 🧠 Optional grouping by category
  const categoryData = Object.values(
    items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          category: item.category,
          quantity: 0,
          available: 0,
        };
      }
      acc[item.category].quantity += item.quantity;
      acc[item.category].available += item.available;
      return acc;
    }, {})
  );

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📊 Equipment Analytics</h2>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {error && (
        <Alert variant="danger">
          <strong>Error:</strong>{" "}
          {error.message || "Failed to fetch analytics."}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <Row className="mb-5">
            <Col>
              <Card className="p-3 shadow-sm">
                <h5 className="text-center mb-3">
                  Category-wise Quantity vs Available
                </h5>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={categoryData}
                    margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="quantity"
                      fill="#8884d8"
                      name="Total Quantity"
                    />
                    <Bar dataKey="available" fill="#82ca9d" name="Available" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="p-3 shadow-sm">
                <h5 className="text-center mb-3">
                  Equipment-wise Quantity vs Available
                </h5>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="quantity"
                      fill="#8884d8"
                      name="Total Quantity"
                    />
                    <Bar dataKey="available" fill="#82ca9d" name="Available" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default EquipmentAnalytics;
