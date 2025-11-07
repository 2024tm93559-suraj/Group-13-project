// src/components/MyRequests.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../redux/actions/requestActions';
import { Table, Spinner, Alert, Badge } from 'react-bootstrap';

const MyRequests = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);
  
  // Filter for *only* this user's requests
  const myRequests = items.filter(req => req.user === user.id);

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      rejected: 'danger',
      issued: 'primary',
      overdue: 'danger',
      returned: 'secondary',
    };
    return <Badge bg={variants[status] || 'dark'}>{status}</Badge>;
  };

  return (
    <>
      <h1 className="h2 mb-4">My Requests</h1>
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Status</th>
              <th>Requested On</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">You have not made any requests.</td>
              </tr>
            )}
            {myRequests.map((req) => (
              <tr key={req._id}>
                <td>{req.equipment?.name || 'N/A'}</td>
                <td>{getStatusBadge(req.status)}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>{new Date(req.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyRequests;