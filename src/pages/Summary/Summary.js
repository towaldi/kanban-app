import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// Components
import Navbar from '../../components/Navbar/Navbar';
// Style
import './Summary.css';

export default function Summary() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth = getAuth();

        try {
            await signOut(auth);
            alert("Logged out successfully");
            navigate("/");
        } catch (error) {
            console.log("Error logging out:", error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='app-bar'>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <main>

            </main>
        </div>
    )
}
