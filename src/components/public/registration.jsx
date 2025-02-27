import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./registrationStyle.css";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger, // Added to manually trigger validation
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Validate on every change
  });
  const navigate = useNavigate();
  const password = watch("password"); // Watch password field

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", data);
      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
        <h2>Register</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Enter your password"
            onChange={() => trigger("confirmPassword")} // Trigger validation on change
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
            onChange={() => trigger("confirmPassword")} // Trigger validation on change
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="registration-button">
          Register
        </button>

        <div className="linkeding">
          <h1>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Registration;