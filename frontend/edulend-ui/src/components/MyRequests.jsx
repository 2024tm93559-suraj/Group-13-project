import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../redux/actions/requestActions';
import { Table, Spinner, Alert, Badge } from 'react-bootstrap';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

const MyRequests = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);
  
  const myRequests = items.filter(req => req.user === user.id);

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      rejected: 'dark', 
      issued: 'primary',
      overdue: 'danger',
      returned: 'secondary',
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

  return (
    <>
      <h1 className="h2 mb-4">My Requests</h1>
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
            {myRequests.map((req) => (
              <tr key={req._id}>
                <td>{req.equipment?.name || 'N/A'}</td>
                
                <td className="text-center" style={{verticalAlign: 'middle', width: '130px'}}>
                  {getStatusBadge(req.status)}
                </td>
                
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                
                <td>
                  {req.status === 'returned' || req.status === 'rejected'
                    ? ' - ' 
                    : new Date(req.dueDate).toLocaleDateString()}
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyRequests;