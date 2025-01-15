import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Style
import "./AuthForm.css"

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User successfully logged in!")
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="sign-container">
            <div className="sign-components">
                <div className="sign-header">
                    <h1>Sign Up</h1>
                    <h2>Create a new account</h2>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSignUp} className="sign-form">
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
                    <button type="submit">Sign Up</button>
                    <p>have an account? <a href="/">Sign in Now</a></p>
                </form>
            </div>
        </div>
    );
};
