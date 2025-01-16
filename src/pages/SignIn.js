import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
// Components
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
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
            setEmail("");
            setPassword("");
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
                    <Input
                        label="Email"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="remember-me">
                        <input 
                            type="checkbox"
                        />
                        <span>Remember me</span>
                    </label>
                    <Button
                        type="submit"
                        label="Sign in"
                    />
                    <p className="body-small">Don't have an account? <Link to="/signup" className="link">Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}