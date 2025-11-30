import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./assets/hi.jpg"; // Ensure this path is correct
import api from "../api"; // Assuming your API instance is set up

const Home = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/login", form); // Call the login API
            localStorage.setItem("isAuthenticated", "true"); // Store login state
            navigate("/dash"); // Redirect to dashboard after successful login
        } catch (err) {
            setError("Invalid username or password"); // Set error message
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const styles = {
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        },
        content: {
            flex: 1,
            textAlign: "center",
            color: "black",
        },
        heading: {
            fontSize: "36px",
            fontWeight: "bold",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "10px",
            borderRadius: "10px",
            display: "inline-block",
        },
        subheading: {
            fontSize: "18px",
            marginTop: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "8px",
            borderRadius: "8px",
            display: "inline-block",
        },
        manageContainer: {
            marginTop: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        },
        manageText: {
            fontSize: "22px",
            fontWeight: "bold",
            color: "#333",
        },
        loginContainer: {
            width: "300px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
        },
        error: {
            color: "red",
            marginBottom: "10px",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.heading}>Pharmacy Management System</h1>
              

                {/* Manage section */}
                <div style={styles.manageContainer}>
                    <p style={styles.manageText}>Manage Medicine, Suppliers, Sales, and Customers</p>
                </div>
            </div>

            <div style={styles.loginContainer}>
                <h2>Login</h2>
                {error && <div style={styles.error}>{error}</div>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={form.username}
                        style={styles.input}
                        required
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={form.password}
                        type="password"
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;
