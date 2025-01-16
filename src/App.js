import React from 'react';
import app from './firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Style
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default function App() {
  console.log("Firebase app initialized:", app);

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </div>
    </Router>
  );
}