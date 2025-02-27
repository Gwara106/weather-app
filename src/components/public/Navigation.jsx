import * as React from "react";
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({onHomeClick, onLoginClick, onRegisterClick, onAboutClick }) => {
    
  return (
    <div className="navigation">

      <button className='home-btn' onClick={onHomeClick}>
        HOME
      </button>
      
      <button className='ABOUT-btn' onClick={onAboutClick}>
        ABOUT
      </button>

      <button className='login-btn' onClick={onLoginClick}>
        LOGIN
      </button>

      <button className='register-btn' onClick={onRegisterClick}>
        REGISTER
      </button>
    </div>
  );
}

export default Navigation;