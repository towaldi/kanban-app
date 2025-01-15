import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// Style
import './AuthForm.css';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("User successfully logged in!");
        } catch (error) {
            setError(error.message);
        }
    }; 

    return (
        <div className="sign-container">
            <div className="sign-components">
                <div className="sign-header">
                    <h1>Sign In</h1>
                    <h2>Welcome back, please enter your details.</h2>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSignIn} className="sign-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="remember-me">
                        <input 
                            type="checkbox"
                        />
                        <label>Remember me</label>
                    </div>
                    <button type="submit">Sign In</button>
                    <p>Don't have an account? <a href="/">Sign up</a></p>
                </form>
            </div>
        </div>
    );
}