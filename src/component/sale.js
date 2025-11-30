import React, { useState, useEffect } from 'react';
import api from '../api';

function Sales() {
    const [sales, setSales] = useState([]);
    const [form, setForm] = useState({
        medicine_id: '',
        customer_id: '',
        quantity: '',
        sale_date: '',
        total_price: '', // Add total_price in the form state
    });
    const [error, setError] = useState(''); // State for error messages

    useEffect(() => {
        fetchSales();
    }, []);

    // Fetch sales from the backend
    const fetchSales = async () => {
        try {
            const response = await api.get('/sales');
            setSales(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching sales:', err);
            setError('Failed to fetch sales.');
        }
    };

    // Add a new sale
    const addSale = async () => {
        try {
            // Calculate total_price as quantity * price (assuming price comes from the backend)
            const total_price = parseFloat(form.quantity) * 100; // Replace `100` with actual price logic
            await api.post('/sales', { ...form, total_price });
            fetchSales(); // Refresh the sales list
            setForm({ medicine_id: '', customer_id: '', quantity: '', sale_date: '', total_price: '' }); // Clear the form
            setError('');
        } catch (err) {
            console.error('Error adding sale:', err);
            setError('Failed to add sale.');
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => {
            const updatedForm = { ...prevState, [name]: value };
            
            // Recalculate total_price if quantity or medicine_id is updated
            if (name === 'quantity' && value) {
                const total_price = parseFloat(value) * 100; // Replace `100` with actual price logic
                updatedForm.total_price = total_price.toFixed(2);
            }
            
            return updatedForm;
        });
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
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            marginTop: '20px',
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
            <h2 style={styles.heading}>Sales</h2>
            {/* Display error messages, if any */}
            {error && <p style={styles.error}>{error}</p>}

            <p style={styles.subheading}>List of Sales</p>

            {/* Table for displaying sales */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Medicine ID</th>
                        <th style={styles.tableCell}>Customer ID</th>
                        <th style={styles.tableCell}>Quantity</th>
                        <th style={styles.tableCell}>Total Price</th>
                        <th style={styles.tableCell}>Sale Date</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{sale.medicine_id}</td>
                            <td style={styles.tableCell}>{sale.customer_id}</td>
                            <td style={styles.tableCell}>{sale.quantity}</td>
                            <td style={styles.tableCell}>${sale.total_price}</td>
                            <td style={styles.tableCell}>{new Date(sale.sale_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add a new sale */}
            <h3>Add New Sale</h3>
            <form style={styles.form}>
                <input
                    name="medicine_id"
                    placeholder="Medicine ID"
                    onChange={handleChange}
                    value={form.medicine_id}
                    style={styles.input}
                    required
                />
                <input
                    name="customer_id"
                    placeholder="Customer ID"
                    onChange={handleChange}
                    value={form.customer_id}
                    style={styles.input}
                    required
                />
                <input
                    name="quantity"
                    placeholder="Quantity"
                    onChange={handleChange}
                    type="number"
                    value={form.quantity}
                    style={styles.input}
                    required
                />
                <input
                    name="sale_date"
                    type="datetime-local"
                    onChange={handleChange}
                    value={form.sale_date}
                    style={styles.input}
                />
                <input
                    name="total_price"
                    placeholder="Total Price"
                    value={form.total_price}
                    style={styles.input}
                    readOnly
                />
                <button type="button" onClick={addSale} style={styles.button}>
                    Add Sale
                </button>
            </form>
        </div>
    );
}

export default Sales;

