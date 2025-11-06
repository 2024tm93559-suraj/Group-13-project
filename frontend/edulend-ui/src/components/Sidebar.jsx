import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HouseDoorFill, PlusSquareFill, CardChecklistFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }
  
  const isAdmin = user.role === 'admin';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Resource Hub
      </div>
      <Nav className="flex-column sidebar-nav">
        <Nav.Link as={NavLink} to="/equipment">
          <HouseDoorFill /> Dashboard
        </Nav.Link>
        
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