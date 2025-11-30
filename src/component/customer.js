import React, { useState, useEffect } from 'react';
import api from '../api';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: '', contact: '', address: '' });
    const [error, setError] = useState(''); // For handling error messages

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/customers');
            setCustomers(response.data);
            setError(''); // Clear any previous errors
        } catch (err) {
            console.error('Error fetching customers:', err);
            setError('Failed to fetch customers.');
        }
    };

    const addCustomer = async () => {
        try {
            await api.post('/customers', form);
            fetchCustomers(); // Refresh the customer list
            setForm({ name: '', contact: '', address: '' }); // Clear form fields
            setError(''); // Clear any previous errors
        } catch (err) {
            console.error('Error adding customer:', err);
            setError('Failed to add customer.');
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
        subheading: {
            fontSize: '18px',
            color: '#555',
            marginBottom: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
        },
        tableHeader: {
            backgroundColor: '#f4f4f4',
            textAlign: 'left',
            padding: '10px',
        },
        tableRow: {
            borderBottom: '1px solid #ddd',
        },
        tableCell: {
            padding: '10px',
        },
        formWrapper: {
            display: 'flex',
            justifyContent: 'center', // Center form horizontally
            marginTop: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
        input: {
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
        },
        button: {
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
        error: {
            color: 'red',
            marginBottom: '15px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Customers</h2>
            {error && <p style={styles.error}>{error}</p>} {/* Display errors if any */}

            <p style={styles.subheading}>List of Customers</p>

            {/* Table for displaying customers */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Name</th>
                        <th style={styles.tableCell}>Contact</th>
                        <th style={styles.tableCell}>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{customer.name}</td>
                            <td style={styles.tableCell}>{customer.contact}</td>
                            <td style={styles.tableCell}>{customer.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add a new customer */}
            <h3>Add New Customer</h3>

            <div style={styles.formWrapper}>
                <form style={styles.form}>
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={form.name}
                        style={styles.input}
                    />
                    <input
                        name="contact"
                        placeholder="Contact"
                        onChange={handleChange}
                        value={form.contact}
                        style={styles.input}
                    />
                    <input
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                        value={form.address}
                        style={styles.input}
                    />
                    <button type="button" onClick={addCustomer} style={styles.button}>
                        Add Customer
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Customers;

