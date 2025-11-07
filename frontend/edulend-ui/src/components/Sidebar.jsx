import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HouseDoorFill, PlusSquareFill, CardChecklist } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }
  
  const isAdmin = user.role === 'admin';
  const isStaff = user.role === 'staff';
  const isStudent = user.role === 'student';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Resource Hub
      </div>
      <Nav className="flex-column sidebar-nav">
        <Nav.Link as={NavLink} to="/equipment" end>
          <HouseDoorFill /> Dashboard
        </Nav.Link>
        
        {isStudent && (
          <Nav.Link as={NavLink} to="/my-requests">
            <CardChecklist /> My Requests
          </Nav.Link>
        )}
        
        {(isAdmin || isStaff) && (
          <Nav.Link as={NavLink} to="/approve-requests">
            <CardChecklist /> Approve Requests
          </Nav.Link>
        )}
        
        {isAdmin && (
          <Nav.Link as={NavLink} to="/add-equipment">
            <PlusSquareFill /> Add Equipment
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;