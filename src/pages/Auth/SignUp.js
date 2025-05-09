import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
// Components
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
// Style
import "./AuthForm.css"

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

export default function SignUp({ showSnackbar }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
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
            await createUserWithEmailAndPassword(auth, email, password);
            await signOut(auth); // Immediately sign out the newly created user
            showSnackbar("Account created successfully! Please sign in.");
            setEmail("");
            setPassword("");
            navigate("/");  // Navigate to the SignIn page
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="sign-container">
            <div className="sign-components">
                <div className="sign-header">
                    <h1>Sign Up</h1>
                    <h2>Create a new account</h2>
                </div>
                {/*{error && <p style={{ color: "red" }}>{error}</p>} */}
                <form onSubmit={handleSignUp} className="sign-form">
                    <Input
                        label="Email"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        validate={validateEmail}    // Pass validation function to Input
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validate={validatePassword} // Pass validation function to Input
                        required
                    />
                    <Button
                        style="btn-primary"
                        type="submit"
                        label="Sign Up"
                    />
                    <p className="body-small">Have an account? 
                        <Link to="/" className="link"> Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
