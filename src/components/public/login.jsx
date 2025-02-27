import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../../config';
import { callAuthInit } from '../../utils/authUtils';
import './loginsStyle.css';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("User logged in successfully:", response.data);
      
      // Save token first
      localStorage.setItem("token", response.data.data.access_token);
      
      // Then call auth init
      // try {
      //   await callAuthInit();
      //   toast.success("Login successful");
      // } catch (error) {
      //   console.error("Error initializing user:", error);
      //   toast.error('Error initializing user session');
      // }

      // Navigate to weather page regardless of auth init success
      navigate('/weather');
    } catch (error) {
      console.error("Error logging in user:", error);
      const errorMessage = error.response?.data?.message || 'Error logging in';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>


          <button type="submit" className="login-button">
            Login
          </button>


        <div className="linkeding">
          <h1>
            Don't have an account?{' '}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Login;