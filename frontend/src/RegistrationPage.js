import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const RegistrationPage = () => {
    // State for storing registration form data and messages
    const [registrationData, setRegistrationData] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState(""); // State for displaying messages

    // Function to handle form input changes
    const handleRegistrationChange = (event) => {
        const { name, value } = event.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register', registrationData);
            console.log(response.data); // Log response for debugging

            // Handle success message
            setMessage("Registration successful!");

            // Reset form fields
            setRegistrationData({
                username: "",
                password: ""
            });
        } catch (error) {
            console.error("Registration error:", error);

            // Handle error message
            setMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name='username'
                        value={registrationData.username}
                        onChange={handleRegistrationChange}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name='password'
                        value={registrationData.password}
                        onChange={handleRegistrationChange}
                        required
                    />
                </div>
                <br />
                <button type="submit">Register</button>
            </form>
            
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
{message && (
                <div className={message.includes("successful") ? "success-message" : "error-message"}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;


