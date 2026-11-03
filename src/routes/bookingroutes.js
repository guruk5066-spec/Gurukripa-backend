
const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  updateBookingStatus,
} = require("../controllers/bookingcontroller");

router.post("/", createBooking);
router.get("/", getBookings);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;
