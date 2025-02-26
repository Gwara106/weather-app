import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
    <div className="sidebar">
        <div className='sidebarhead'><h1>Menu</h1></div>
        
        <Link to="/weather" role='button'>
        <button className='weather-btn'>
            Weather</button>
            </Link>

        
        <Link to='/calendar' role='button'>
        <button className='calendar-btn'>
            Calendar</button>
        </Link>

        <button className='Logout-btn' onClick={() => {
            navigate('/');
        }}>
            Logout
        </button>
        
    </div>
    );
};

export default Sidebar;
