const db = require('./db');  // Import the database connection

// Get all medicines
exports.getMedicines = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM medicines');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new medicine
exports.addMedicine = async (req, res) => {
    const { name, category, price, stock, expiry_date } = req.body;
    try {
        await db.query('INSERT INTO medicines (name, category, price, stock, expiry_date) VALUES (?, ?, ?, ?, ?)', [name, category, price, stock, expiry_date]);
        res.status(201).json({ message: 'Medicine added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all customers
exports.getCustomers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customers');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new customer
exports.addCustomer = async (req, res) => {
    const { name, contact, address } = req.body;
    try {
        await db.query('INSERT INTO customers (name, contact, address) VALUES (?, ?, ?)', [name, contact, address]);
        res.status(201).json({ message: 'Customer added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all sales
exports.getSales = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM sales');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new sale
exports.addSale = async (req, res) => {
    const { medicine_id, customer_id, quantity, total_price } = req.body;
    try {
        await db.query('INSERT INTO sales (medicine_id, customer_id, quantity, total_price) VALUES (?, ?, ?, ?)', [medicine_id, customer_id, quantity, total_price]);
        res.status(201).json({ message: 'Sale added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all suppliers
exports.getSuppliers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM suppliers');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new supplier
exports.addSupplier = async (req, res) => {
    const { iname, contact, address } = req.body;
    try {
        await db.query('INSERT INTO suppliers (name, contact, address) VALUES (?, ?, ?)', [iname, contact, address]);
        res.status(201).json({ message: 'Supplier added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new user
exports.addUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Login a user
// Login a user and include role
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Query to check if the user exists with the given username, password, and fetch their role
        const [rows] = await db.query(
            'SELECT id, username, role FROM users WHERE username = ? AND password = ?',
            [username, password]
        );

        // If the user exists
        if (rows.length > 0) {
            const user = rows[0];
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });
        }

        // If no user is found
        return res.status(401).json({ error: 'Invalid username or password' });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'An error occurred during login' });
    }
};


