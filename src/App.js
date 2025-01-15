import React from 'react';
import app from './firebase';
// Style
import './App.css';
import SignUp from './components/SignUp';

export default function App() {
  console.log("Firebase app initialized:", app);

  return (
    <div className="app">
      <SignUp />
    </div>
  );
}