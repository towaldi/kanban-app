import React from 'react';
import app from './firebase';
// Style
import './App.css';

export default function App() {
  console.log("Firebase app initialized:", app);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban App</h1>
      </header>
    </div>
  );
}