
const Booking = require("../models/bookingmodel");
const { messaging } = require("../config/firebase");

// Customer app se booking save karna
exports.createBooking = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      vehicleName,
      pickupLocation,
      dropLocation,
      travelDate,
      amount,
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !vehicleName ||
      !pickupLocation ||
      !dropLocation ||
      !travelDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required booking details",
      });
    }

    const booking = await Booking.create({
      customerName,
      phone,
      vehicleName,
      pickupLocation,
      dropLocation,
      travelDate,
      amount: amount ?? 0,
    });
    // Admin app ko booking notification bhejna
try {
  const adminToken = process.env.ADMIN_FCM_TOKEN;

  if (adminToken) {
    await messaging.send({
      token: adminToken,
      notification: {
        title: "New Car Booking 🚗",
        body: `${customerName} ne ${vehicleName} book ki hai: ${pickupLocation} se ${dropLocation}`,
      },
      data: {
        bookingId: booking._id.toString(),
        customerName: customerName,
        vehicleName: vehicleName,
        status: "Pending",
      },
      android: {
        priority: "high",
      },
    });

    console.log("Admin booking notification sent");
  } else {
    console.log("ADMIN_FCM_TOKEN .env mein nahi mila");
  }
} catch (notificationError) {
  // Notification fail ho, tab bhi booking successful rahegi
  console.error("FCM notification error:", notificationError.message);
}

    return res.status(201).json({
      success: true,
      message: "Booking submitted successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create booking",
    });
  }
};

// Admin panel mein saari bookings lana
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch bookings",
    });
  }
};

// Admin se booking status update karna
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking status updated",
      data: booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update booking status",
    });
  }
};
