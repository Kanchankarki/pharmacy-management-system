import React, { useState, useEffect } from 'react';
import api from '../api';

function Medicines() {
    const [medicines, setMedicines] = useState([]);
    const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', expiry_date: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await api.get('/medicines');
            setMedicines(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching medicines:', err);
            setError('Failed to fetch medicines.');
        }
    };

    const addMedicine = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', form);
            await api.post('/medicines', form);
            fetchMedicines();
            setForm({ name: '', category: '', price: '', stock: '', expiry_date: '' });
            setError('');
        } catch (err) {
            console.error('Error adding medicine:', err);
            setError('Failed to add medicine.');
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
            <h2 style={styles.heading}>Medicines</h2>

            {error && <p style={styles.error}>{error}</p>}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={{ ...styles.thTd, ...styles.th }}>Name</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Category</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Price</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Stock</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.length > 0 ? (
                        medicines.map((medicine) => (
                            <tr key={medicine.id}>
                                <td style={styles.thTd}>{medicine.name}</td>
                                <td style={styles.thTd}>{medicine.category}</td>
                                <td style={styles.thTd}>${medicine.price}</td>
                                <td style={styles.thTd}>{medicine.stock}</td>
                                <td style={styles.thTd}>{medicine.expiry_date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={styles.noData}>No medicines available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <form style={styles.form} onSubmit={addMedicine}>
                <input style={styles.input} name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
                <input style={styles.input} name="category" placeholder="Category" onChange={handleChange} value={form.category} required />
                <input style={styles.input} name="price" placeholder="Price" onChange={handleChange} type="number" value={form.price} required />
                <input style={styles.input} name="stock" placeholder="Stock" onChange={handleChange} type="number" value={form.stock} required />
                <input style={styles.input} name="expiry_date" placeholder="Expiry Date" onChange={handleChange} type="date" value={form.expiry_date} required />
                <button style={styles.button} type="submit">Add Medicine</button>
            </form>
        </div>
    );
}

export default Medicines;





