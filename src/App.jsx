import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './components/Weather';
import Login from './components/login';
import Registration from './components/registration';
import LandingPage from './components/LandingPage';
import Calendar from './components/Calendar';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/weather' element={<Weather />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
