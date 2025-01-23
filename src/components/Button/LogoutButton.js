import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// Style
import './LogoutButton.css';

export default function LogoutButton({ icon: Icon, label }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth); // Logs out the user
      alert("Logged out successfully");
      navigate('/'); // Redirect to the SignIn page
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
        {<Icon
            className="icon"
            size={20} 
        />}
        <p>{label}</p>
    </button>
  );
}
