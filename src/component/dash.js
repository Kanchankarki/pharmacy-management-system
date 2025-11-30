import React from "react";
import { useNavigate } from "react-router-dom";

const Dash = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path); // Navigate to different pages based on the button clicked
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the Dashboard</h1>
            <div>
                <button
                    onClick={() => handleNavigation("/medicine")}
                    style={buttonStyle}
                >
                    Medicine
                </button>
                <button
                    onClick={() => handleNavigation("/supplier")}
                    style={buttonStyle}
                >
                    Supplier
                </button>
                <button
                    onClick={() => handleNavigation("/sale")}
                    style={buttonStyle}
                >
                    Sale
                </button>
                <button
                    onClick={() => handleNavigation("/customer")}
                    style={buttonStyle}
                >
                    Customer
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    margin: "10px",
    padding: "15px 25px",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
};

export default Dash;

