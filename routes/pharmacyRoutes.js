const express = require('express');
const router = express.Router();
const pharmacyController = require('./controller');

// Medicine routes
router.get('/medicines', pharmacyController.getMedicines);
router.post('/medicines', pharmacyController.addMedicine);

// Customer routes
router.get('/customers', pharmacyController.getCustomers);
router.post('/customers', pharmacyController.addCustomer);

// Sales routes
router.get('/sales', pharmacyController.getSales);
router.post('/sales', pharmacyController.addSale);

// Supplier routes
router.get('/suppliers', pharmacyController.getSuppliers);
router.post('/suppliers', pharmacyController.addSupplier);

// User routes
router.get('/users', pharmacyController.getUsers);
router.post('/users', pharmacyController.addUser);
router.post('/login', pharmacyController.loginUser);

module.exports = router;
