import { useState } from "react";
import "./Login.css";

function Login({ onLogin, onBack }) {

    const [isRegister, setIsRegister] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    console.log("BUTTON CLICKED");
        const url = isRegister
    ? "http://localhost:5000/api/register"
    : "http://localhost:5000/api/login";

        const body = isRegister
            ? formData
            : {
                email: formData.email,
                password: formData.password
            };
            console.log("URL:", url);
            console.log("DATA:", body);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (response.ok) {

                if (isRegister) {
                    setMessage("Registration successful! Please login.");
                    setIsRegister(false);
                } else {
                    setMessage("Login successful!");

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                    onLogin(data.user);
                }

            } else {
                setMessage(data.message || "Something went wrong");
            }

        } catch (error) {
            setMessage("Server connection failed");
        }
    };

    return (
        <div className="login-page">

            <div className="login-box">

                <button
                    className="login-back-btn"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <h1>
                    {isRegister ? "Create Account" : "Welcome Back"}
                </h1>

                <p className="login-subtitle">
                    {isRegister
                        ? "Register to book home services"
                        : "Login to continue"}
                </p>

                <form onSubmit={handleSubmit}>

                    {isRegister && (
                        <>
                            <label>Full Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label>Phone Number</label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="login-submit-btn"
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>

                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

                <p className="switch-login">

                    {isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}

                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setMessage("");
                        }}
                    >
                        {isRegister ? " Login" : " Register"}
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Login;