const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const BookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData,
);

router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.use(authController.isLoggedIn);

router.get(
  '/',
  BookingController.createBookingCheckout,
  viewsController.getOverview,
);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
