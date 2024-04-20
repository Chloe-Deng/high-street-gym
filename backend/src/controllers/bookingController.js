import { Router } from 'express';
import * as Bookings from '../models/bookings.js';
import auth from '../middleware/auth.js';

const bookingController = Router();

bookingController.get('/', async (req, res) => {
  try {
    const bookings = await Bookings.getBookings();
    res.status(200).json({
      status: 'Success',
      message: 'Get all Bookings',
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).send('Internal Server Error');
  }
});

bookingController.get(
  '/member-bookings',
  auth(['member']),
  async (req, res) => {
    try {
      // Get user ID from the authenticated user object
      const userId = req.user.id;
      console.log(userId);

      // Call your function to get bookings for this member
      const bookings = await Bookings.getBookingsByMember(userId);

      res.json({
        status: 'success',
        data: bookings,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
);

bookingController.get(
  '/bookings',
  auth(['admin', 'trainer', 'member']),
  async (req, res) => {
    // Extract user information from request, added by your auth middleware
    const { id: userId, role } = req.user;
    console.log(userId, role);

    try {
      const bookings = await Bookings.getConditionalBookings(userId, role);
      res.json({ status: 'success', data: bookings });
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message });
    }
  }
);

bookingController.post('/', async (req, res) => {
  try {
    const newBooking = await Bookings.createBooking(req.body);
    res.status(201).json({
      status: 'Success',
      message: 'Booking created successfully',
      data: newBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({ status: 'Error', message: error.message });
  }
});

bookingController.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Bookings.deleteBooking(id);
    res.status(200).json({
      status: 'Success',
      message: 'Booking deleted successfully',
      data: null,
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(404).json({ status: 'Error', message: error.message });
  }
});

export default bookingController;
