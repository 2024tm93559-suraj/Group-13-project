import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';


const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="top-navbar shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#home" style={{ opacity: 0, userSelect: 'none' }}>
          EduLend
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            
            {/* Right-aligned dropdown */}
            <NavDropdown title={user.name || 'Profile'} id="basic-nav-dropdown" align="end" className="ms-2">
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;