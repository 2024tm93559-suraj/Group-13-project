// src/components/NotificationBell.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown, Badge } from 'react-bootstrap';
import { BellFill } from 'react-bootstrap-icons';
import { fetchNotifications } from '../redux/actions/notificationActions';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.notifications);
  
  useEffect(() => {
    // Fetch notifications when component mounts
    dispatch(fetchNotifications());
    
    // Optional: Set up an interval to poll for new notifications
    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 60000); // Poll every 60 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const unreadItems = items.filter(item => !item.read);
  const unreadCount = unreadItems.length;

  const title = (
    <span style={{ position: 'relative' }}>
      <BellFill />
      {unreadCount > 0 && (
        <Badge 
          pill 
          bg="danger"
          style={{ 
            position: 'absolute', 
            top: -5, 
            right: -10,
            fontSize: '0.6em'
          }}
        >
          {unreadCount}
        </Badge>
      )}
    </span>
  );

  return (
    <NavDropdown title={title} id="notification-dropdown" align="end">
      {loading && <NavDropdown.Item disabled>Loading...</NavDropdown.Item>}
      
      {!loading && unreadItems.length === 0 && (
        <NavDropdown.Item disabled>No unread notifications</NavDropdown.Item>
      )}

      {!loading && unreadItems.map(item => (
        <NavDropdown.Item key={item._id} href="#">
          {item.message}
          <div className="text-muted" style={{ fontSize: '0.8em' }}>
            {new Date(item.createdAt).toLocaleString()}
          </div>
        </NavDropdown.Item>
      ))}
      
      {/* We would add a "Mark all as read" button here */}
    </NavDropdown>
  );
};

export default NotificationBell;