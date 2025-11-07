// src/components/ApproveRequests.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests, updateRequestStatus } from '../redux/actions/requestActions';
import { Table, Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ApproveRequests = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const pendingRequests = items.filter((req) => req.status === 'pending');
  // Note: We cannot get the student name as the backend doesn't populate it.
  // This would require a backend change to .populate('user') in requestController.js
  
  const handleApprove = (id) => {
    dispatch(updateRequestStatus(id, 'approve'));
    toast.success('Request Approved');
  };
  
  const handleReject = (id) => {
    dispatch(updateRequestStatus(id, 'reject'));
    toast.error('Request Rejected');
  };

  return (
    <>
      <h1 className="h2 mb-4">Approve Requests</h1>
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Equipment</th>
              <th>Requested On</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No pending requests.</td>
              </tr>
            )}
            {pendingRequests.map((req) => (
              <tr key={req._id}>
                <td title={req.user}>{req.user.slice(-6)}...</td>
                <td>{req.equipment?.name || 'N/A'}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>{new Date(req.dueDate).toLocaleDateString()}</td>
                <td>
                  <ButtonGroup size="sm">
                    <Button variant="success" onClick={() => handleApprove(req._id)}>Approve</Button>
                    <Button variant="danger" onClick={() => handleReject(req._id)}>Reject</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ApproveRequests;