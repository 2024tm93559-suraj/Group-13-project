import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const Signup = () => (
  
  <div
      className="d-flex align-items-center justify-content-center vh-100 position-relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1740&q=80')", // ✅ background with lab/school vibe
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      ></div>

      {/* Signup Card */}
      <div
        className="card shadow-lg text-center p-5 position-relative"
        style={{
          width: "430px",
          borderRadius: "20px",
          backgroundColor: "rgba(255,255,255,0.95)",
          zIndex: 1,
        }}
      >
        <h2 className="fw-bold mb-3 text-primary">
          Manage & Borrow School Equipment Easily
        </h2>

        <p className="text-muted mb-4">
          Streamline borrowing and returning of school resources like lab tools,
          sports gear, and media kits — all in one place.
        </p>

        <Link
          to="/signup"
          className="btn btn-primary w-100 fw-semibold py-2 mb-3"
        >
          Create Your Account
        </Link>

        <p className="mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-decoration-none text-primary fw-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
);

const Login = () => (
  <div className="text-center mt-5">
    <h2>Login Page</h2>
    <p>
      Don’t have an account? <Link to="/signup">Sign up here</Link>
    </p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Signup />} />
      </Routes>
    </Router>
  );
}
