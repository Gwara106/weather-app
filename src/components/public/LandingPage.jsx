import * as React from "react";
import { Link } from 'react-router-dom';
import landingPageImage from '../../assets/landingpagefront.png';
import About from './about';
import './LandingPage.css';
import Login from './login.jsx';
import Navigation from './Navigation.jsx';
import Registration from './registration.jsx';

function LandingPage() {
  const [showComponent, setShowComponent] = React.useState('home');

  const handleNavigationClick = (component) => {
    setShowComponent(component);
  };

  return (
    <div className="landing-page">
      <div className="content-container">
        <div className="left-column">
          <img src={landingPageImage} alt="Landing Page Image" />
          
        </div>
        <div className="right-column">
          <div className="right-content">
            <Navigation
              onHomeClick={() => handleNavigationClick('home')}
              onLoginClick={() => handleNavigationClick('login')}
              onRegisterClick={() => handleNavigationClick('registration')}
              onAboutClick={() => handleNavigationClick('about')}
            />
            {showComponent === 'home' && (
            <div>
              <div className="weather-calendar">WEATHER AND CALENDAR</div>
              <p className="description">
                This is a webpage dedicated for you to know the weather of any
                city in the world in Realtime while you plan activities in our
                calendar. We provide you with easy feature to add your favorite
                cities for easy access in seeing the weather of your cities.
                Join us today and be the person who makes perfect plans under
                perfect weather conditions.
              </p>
              <Link to="/register" role = 'button'>
                <button className="join-button">JOIN NOW!</button>
              </Link>
            </div>
          )}
            {showComponent === 'login' && <Login />}
            {showComponent === 'registration' && <Registration />}
            {showComponent === 'about' && <About />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;