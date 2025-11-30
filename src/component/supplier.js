import React, { useState, useEffect } from 'react';
import api from '../api';

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [form, setForm] = useState({ name: '', contact: '', address: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await api.get('/suppliers');
            setSuppliers(response.data);
        } catch (err) {
            console.error('Error fetching suppliers:', err);
        }
    };

    const addSupplier = async (e) => {
        e.preventDefault();
        try {
            // Prepare the data to match the backend's expected fields
            const dataToSend = {
                iname: form.name, // 'iname' is expected by the backend
                contact: form.contact,
                address: form.address
            };

            // Send the data to the backend
            await api.post('/suppliers', dataToSend);

            // Refresh the suppliers list
            fetchSuppliers();

            // Clear the form and any previous errors
            setForm({ name: '', contact: '', address: '' });
            setError('');
        } catch (err) {
            console.error('Error adding supplier:', err);
            setError('Failed to add supplier.');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '20px auto',
            padding: '20px',
            background: '#f4f4f4',
            borderRadius: '10px',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            textAlign: 'center',
            color: '#333',
        },
        error: {
            color: 'red',
            textAlign: 'center',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            margin: '20px 0',
        },
        thTd: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'center',
        },
        th: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        noData: {
            textAlign: 'center',
            fontStyle: 'italic',
            color: 'gray',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        input: {
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        button: {
            padding: '10px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
        },
        buttonHover: {
            background: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Suppliers</h2>

            {/* Display error message if any */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Suppliers Table */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={{ ...styles.thTd, ...styles.th }}>Name</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Contact</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.length > 0 ? (
                        suppliers.map((supplier) => (
                            <tr key={supplier.id}>
                                <td style={styles.thTd}>{supplier.name}</td>
                                <td style={styles.thTd}>{supplier.contact}</td>
                                <td style={styles.thTd}>{supplier.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={styles.noData}>No suppliers available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add Supplier Form */}
            <form style={styles.form} onSubmit={addSupplier}>
                <input
                    style={styles.input}
                    name="name"
                    placeholder="Supplier Name"
                    onChange={handleChange}
                    value={form.name}
                    required
                />
                <input
                    style={styles.input}
                    name="contact"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    value={form.contact}
                    required
                />
                <input
                    style={styles.input}
                    name="address"
                    placeholder="Supplier Address"
                    onChange={handleChange}
                    value={form.address}
                    required
                />
                <button
                    style={styles.button}
                    type="submit"
                >
                    Add Supplier
                </button>
            </form>
        </div>
    );
}

export default Suppliers;
