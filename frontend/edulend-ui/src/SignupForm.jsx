import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can integrate API call here
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4">Sign Up</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="staff">Staff</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
