import React, { Suspense } from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
// import Weather from './components/Weather';
// import Login from './components/login';
// import Registration from './components/registration';
// import LandingPage from './components/LandingPage';
// import Calendar from './components/Calendar';
import ProtectedRoute from './utils/ProtectedRoute';
const Login = React.lazy(() => import("./components/public/login"));
const Registration = React.lazy(() => import("./components/public/registration"));
const LandingPage = React.lazy(() => import("./components/public/LandingPage"));
const Weather = React.lazy(() => import("./components/Weather"));
const Calendar = React.lazy(() => import("./components/Calendar"));

// const App = () => {
//   return (
//     <Router>
//       <div className='app'>
//         <Routes>
//           <Route path='/weather' element={<Weather />} />
//           <Route path='/calendar' element={<Calendar />} />
//           <Route path="/register" element={<Registration />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<LandingPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              {/* Protected Routes */}
              <Route path="/weather" element={<Weather />} />
              <Route path="/calendar" element={<Calendar />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
