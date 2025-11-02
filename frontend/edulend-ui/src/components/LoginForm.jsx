import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login details:", credentials);
    // Add your login API logic here
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light"
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
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>

          {/* Navigate to Signup */}
          <p className="text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
