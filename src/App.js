import React, { useState, useEffect } from 'react';
import app from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Summary from './pages/Summary/Summary';
import AddTask from './pages/AddTask/AddTask';
import Board from './pages/Board/Board';
import Contacts from './pages/Contacts/Contacts';
import Privacy from './pages/Privacy/Privacy';
import LegalNotice from './pages/LegalNotice/LegalNotice';
import Navbar from './components/Navbar/Navbar.js';
import Appbar from './components/Appbar/Appbar.js';
// Style
import './App.css';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    // Check auth state only once on app mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
  };

  {/*console.log("Firebase app initialized:", app);*/}

  return (
    <Router>
      <div className='app'>
        {/* Show Navbar and Appbar only if authenticated */}
        {isAuthenticated && (
          <div className='content-container'>
            {isNavbarVisible && <Navbar />}
            <div className='main'>
              <Appbar toggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible}/>
              <Routes>
                <Route path="/summary" element={<Summary />} />
                <Route path="/add-task" element={<AddTask />} />
                <Route path="/board" element={<Board />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/legal-notice" element={<LegalNotice />} />
              </Routes>
            </div>
          </div>
        )}

        {/* Unauthenticated users only see SignIn/SignUp */}
        {!isAuthenticated && (
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}