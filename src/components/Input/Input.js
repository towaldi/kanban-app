import React, { useState } from 'react';
// Style
import './Input.css';

export default function Input({ label, type, placeholder, value, onChange, required, validate }) {
    const [error, setError] = useState("");
    const handleBlur = () => {
        if (validate) {
            const validationError = validate(value);
            setError(validationError);
        }
    }

    return (
        <div className='input-field'>
            {label && <label>{label}</label>}
            <input 
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
