import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
// Components
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
// Style
import './AuthForm.css';

// Validation functions (placed outside the component)
const validateEmail = (email) => {
    if (!email) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email address.";
};

const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password should be at least 6 characters.";
    return "";
};

export default function SignIn({ showSnackbar }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        // Trigger validation for email and password
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setError(emailError || passwordError);  // Display the first error found
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showSnackbar("User successfully logged in!");
            setEmail("");
            setPassword("");
            navigate("/summary");
        } catch (error) {
            // Show user-friendly error in snackbar
            showSnackbar("Wrong email and/or password. Please retry.");
            // Clear input fields
            setEmail("");
            setPassword("");
            // Optionally keep technical error for debugging (not shown to user)
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
                <form onSubmit={handleSignIn} className="sign-form">
                    <Input
                        label="Email"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        validate={validateEmail}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        validate={validatePassword}
                        required
                    />
                    <label className="remember-me">
                        <input 
                            type="checkbox"
                        />
                        <span>Remember me</span>
                    </label>
                    <Button
                        style="btn-primary"
                        type="submit"
                        label="Sign in"
                    />
                    <p className="body-small">Don't have an account?
                        <Link to="/signup" className="link"> Sign up</Link>
                    </p>
                    <p className="body-small">Test Account: <br />Email: thorsten.test@test.com <br />Password: test123
                    
                    </p>
                </form>
            </div>
        </div>
    );
}