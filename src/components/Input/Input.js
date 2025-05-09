import React, { useState } from 'react';
// Style
import './Input.css';

export default function Input({ label, name, type, placeholder, value, onChange, required, validate }) {
    const [error, setError] = useState("");

    // Validate when the user leaves the input field
    const handleBlur = () => {
        if (validate) {
            const validationError = validate(value);
            setError(validationError);
        } else if (required && !value.trim()) {
            setError(`${label || name} is required`);
        }
    };

    // Clear errors when the user starts typing
    const handleChange = (e) => {
        onChange(e);
        if (error) {
            setError(""); 
        }
    };

    return (
        <div className='input-field'>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                className={`input ${error ? "input-error" : ""}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e);
                    if (error) {
                        setError("");
                    }
                }}
                onBlur={handleBlur}
                required={required}
            />
            {error && <label className='input-helper-text'>{error}</label>}
        </div>
    )
}
