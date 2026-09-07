const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');
const { authenticateJWT, authorizeRoles } = require('../middelware/AuthMiddleWare');

router.post('/', authenticateJWT, paymentController.processPayment);

router.get('/booking/:bookingId', authenticateJWT, paymentController.getPaymentByBooking);

router.post('/:id/refund', authenticateJWT, authorizeRoles('admin', 'owner'), paymentController.refundPayment);

module.exports = router;
