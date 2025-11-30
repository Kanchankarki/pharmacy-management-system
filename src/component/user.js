import React, { useState, useEffect } from 'react';
import api from '../api';

function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: '', password: '', role: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addUser = async () => {
        try {
            await api.post('/users', form);
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Styling for centering the form only
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
        list: {
            listStyleType: 'none',
            padding: '0',
            marginBottom: '20px',
        },
        listItem: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        formContainer: {
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically (only for the form)
            height: 'auto', // Auto height for form container
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
            width: '100%',
        },
        button: {
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Users</h2>
            <ul style={styles.list}>
                {users.map((user) => (
                    <li key={user.id} style={styles.listItem}>
                        {user.username} - {user.role}
                    </li>
                ))}
            </ul>

            {/* Form container to center only the form */}
            <div style={styles.formContainer}>
                <form style={styles.form}>
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
                    <input
                        name="role"
                        placeholder="Role"
                        onChange={handleChange}
                        value={form.role}
                        style={styles.input}
                        required
                    />
                    <button type="button" onClick={addUser} style={styles.button}>
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Users;

