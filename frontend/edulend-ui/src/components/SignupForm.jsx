import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.user && auth.token) {
      navigate("/equipment");
    }
  }, [auth.user, auth.token]);

  useEffect(() => {
    if (auth.user && !auth.token) {
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
      toast.success("Signup successful! Logging you in...");
    }
  }, [auth.user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Name"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Email"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="form-control mb-3"
            placeholder="Password"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select mb-3"
          >
            <option value="">Select Role</option>
            <option value="staff">Staff</option>
            <option value="student">Student</option>
          </select>
          <button className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
