import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState(""); // State for displaying messages

    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login', loginData);
            console.log(response.data);
            const { success, message } = response.data;
            if (success) {
                console.log(`Login Successful`);
                setMessage("Login Successful!");
                // Reset form fields after successful login
                setLoginData({ username: "", password: "" });
            } else {
                console.log(message);
                setMessage(message);
                // Optionally handle unsuccessful login case
            }
        } catch (error) {
            console.log(`Login error`, error);
            setMessage("Login failed. Please try again.");
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={loginData.username}
                    onChange={handleLoginChange}
                />
                <br />
                <br />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={loginData.password}
                    onChange={handleLoginChange}
                />
                <br />
                <br />
                <button type='submit'>Login</button>
            </form>
            
            <br />
            <p>Not registered yet? <Link to="/register">Register Here</Link></p>
        {message && (
                <div className={message.includes("Successful") ? "success-message" : "error-message"}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default LoginPage;

