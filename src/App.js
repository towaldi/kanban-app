import React from 'react';
import app from './firebase';
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
  console.log("Firebase app initialized:", app);

  return (
    <Router>
      <div className='app'>
        <div className='content-container'>
          <Navbar />
          <div className='main'>
            <Appbar />
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/board" element={<Board />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal-notice" element={<LegalNotice />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}