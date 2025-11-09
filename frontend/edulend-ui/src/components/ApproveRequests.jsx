import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests, updateRequestStatus } from '../redux/actions/requestActions';
import { Table, Spinner, Alert, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

const ApproveRequests = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);
  
  const actionableRequests = items.filter(
    (req) => req.status === 'pending' || req.status === 'approved' || req.status === 'issued' || req.status === 'overdue'
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const handleAction = (id, action) => {
    dispatch(updateRequestStatus(id, action));
    toast.success(`Request ${action.charAt(0).toUpperCase() + action.slice(1)}d!`);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      issued: 'primary',
      overdue: 'danger',
    };
    
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <Badge 
        bg={variants[status] || 'dark'} 
        className="d-inline-flex align-items-center"
      >
        {status === 'overdue' && <ExclamationCircleFill className="me-1" />}
        {statusText}
      </Badge>
    );
  };
  
  const renderActions = (req) => {
    switch (req.status) {
      case 'pending':
        return (
          <ButtonGroup size="sm">
            <Button variant="success" onClick={() => handleAction(req._id, 'approve')}>Approve</Button>
            <Button variant="danger" onClick={() => handleAction(req._id, 'reject')}>Reject</Button>
          </ButtonGroup>
        );
      case 'approved':
        return (
          <Button variant="primary" size="sm" onClick={() => handleAction(req._id, 'issue')}>
            Mark as Issued
          </Button>
        );
      case 'issued':
        return (
          <Button variant="secondary" size="sm" onClick={() => handleAction(req._id, 'return')}>
            Mark as Returned
          </Button>
        );
      case 'overdue':
        return (
          <Button variant="danger" size="sm" onClick={() => handleAction(req._id, 'return')}>
            Mark as Returned
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h1 className="h2 mb-4">Manage Requests</h1>
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Equipment</th>
              <th>Status</th>
              <th>Issued On</th> 
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actionableRequests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No actionable requests.</td>
              </tr>
            )}
            {actionableRequests.map((req) => (
              <tr key={req._id}>
                <td title={req.user}>{req.uname}</td>
                <td>{req.equipment?.name || 'N/A'}</td>
                <td style={{width: '120px'}}>{getStatusBadge(req.status)}</td>
                <td>{req.status === 'issued' || req.status === 'overdue' ? new Date(req.issueDate).toLocaleDateString() : 'N/A'}</td>
                <td>{new Date(req.dueDate).toLocaleDateString()}</td>
                <td>
                  {renderActions(req)}
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