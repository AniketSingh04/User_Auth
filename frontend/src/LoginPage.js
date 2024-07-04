import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import './styles.css';  // Import custom CSS

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

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
                toast.success("Login Successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // Reset form fields after successful login
                setLoginData({ username: "", password: "" });
            } else {
                console.log(message);
                toast.success(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(`Login error`, error);
            toast.error("Login failed. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">Login Page</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        name='username'
                                        placeholder='Enter username'
                                        value={loginData.username}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type='password'
                                        className="form-control"
                                        name='password'
                                        placeholder='Enter password'
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <button type='submit' className="btn btn-primary btn-block mt-4">Login</button>
                            </form>
                            <br />
                            <p className="text-center">Not registered yet? <Link to="/register">Register Here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


