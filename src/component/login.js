import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import api from '../api'; // Assuming your API instance is set up

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            navigate('/Home'); // Redirect if already logged in
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', form);
            localStorage.setItem('isAuthenticated', 'true'); // Store login state
            navigate('/Home'); // Redirect to homepage after login
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            marginTop: '20px',
            alignItems: 'center',
        },
        input: {
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            width: '100%'
        },
        button: {
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%'
        },
        error: {
            color: 'red',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
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
    );
}

export default Login;


