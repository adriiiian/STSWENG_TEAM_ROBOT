const express = require('express');
const loginController = require('../controllers/login-controller');
const registerController = require('../controllers/register-controller');
const bookingController = require('../controllers/booking-controller');
const adminController = require('../controllers/admin-controller');

const router = express.Router()

router.get('/', loginController.viewIndex)

router.get('/index', loginController.viewIndex)

router.get('/check-fields-reg', registerController.CheckFields)

router.get('/check-reg-info', registerController.IsValid)

router.post('/register', registerController.Register)

router.get('/check-login-info', loginController.Login)

router.get('/logout', loginController.Logout)

router.get('/services', loginController.viewServices)

router.get('/view_services', loginController.viewViewServices)

router.get('/rooms', loginController.viewRooms)

router.get('/view_rooms', loginController.viewViewRooms)

router.get('/cancel-reservation', bookingController.cancelReservation)

router.get('/transactions', loginController.viewTransactions)

router.get('/view_transactions', loginController.viewViewTransactions)

router.get('/booking', loginController.viewBooking)

router.get('/check-fields-booking', bookingController.CheckFields)

router.post('/book_reservation', bookingController.Book)

router.get('/check_available_rooms', bookingController.CheckAvailableRooms)

router.get('/admin-login', loginController.adminLogin)

router.get('/admin', adminController.viewOccupiedRooms)

router.get('/filter-occupied-rooms', adminController.viewViewOccupiedRooms)

module.exports = router