import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const Signup = () => (
  <div className="text-center mt-5">
    <h2>Signup Page</h2>
    <p>
      Already have an account? <Link to="/login">Login here</Link>
    </p>
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
