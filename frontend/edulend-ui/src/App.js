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
import EquipmentAnalytics from "./components/EquipmentAnalytics";
import MyRequests from "./components/MyRequests";
import ApproveRequests from "./components/ApproveRequests";


// --- Layout for Login & Signup ---
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
    <div className="app-wrapper d-flex">
      <Sidebar />
      <div className="content-wrapper flex-grow-1">
        <AppNavbar />
        <div className="equipment-dashboard p-3">
          <Routes>
            <Route path="/equipment" element={<Equipment />} />
            {isAdminOrStaff && (
              <Route path="/approve-requests" element={<ApproveRequests />} />
            )}
            <Route path="/equipment-analytics" element={<EquipmentAnalytics />} />
            {/* Student Only Route */}
            {user?.role === 'student' && (
              <Route path="/my-requests" element={<MyRequests />} />
            )}
            <Route path="/add-equipment" element={<AddEquipmentForm />} />
            {/* Default route inside authenticated area */}
            <Route path="*" element={<Equipment />} />
          </Routes>
        </div>
      </div>
    </div>)
};

// --- Main App Component ---
export default function App() {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <Router>
      {user && token ? <MainLayout /> : <AuthLayout />}
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}
