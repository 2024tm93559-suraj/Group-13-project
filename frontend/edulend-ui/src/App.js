// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Equipment from "./components/Equipment";
import AppNavbar from "./components/AppNavbar";
import AddEquipmentForm from "./components/AddEquipmentForm";
import Sidebar from "./components/Sidebar";
import { useSelector } from 'react-redux';

// --- NEW: Import the new pages ---
import MyRequests from "./components/MyRequests";
import ApproveRequests from "./components/ApproveRequests";

const AuthLayout = () => (
  <Routes>
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="*" element={<LoginForm />} />
  </Routes>
);

const MainLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdminOrStaff = user?.role === 'admin' || user?.role === 'staff';
  
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <AppNavbar />
        <div className="equipment-dashboard">
          <Routes>
            <Route path="/equipment" element={<Equipment />} />
            
            {/* Admin/Staff Only Routes */}
            {isAdminOrStaff && (
              <Route path="/add-equipment" element={<AddEquipmentForm />} />
            )}
            {isAdminOrStaff && (
              <Route path="/approve-requests" element={<ApproveRequests />} />
            )}

            {/* Student Only Route */}
            {user?.role === 'student' && (
              <Route path="/my-requests" element={<MyRequests />} />
            )}
            
            <Route path="*" element={<Equipment />} /> {/* Default to dashboard */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      {user ? <MainLayout /> : <AuthLayout />}
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}