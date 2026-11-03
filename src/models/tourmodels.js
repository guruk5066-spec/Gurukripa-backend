const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, default: "4.5" },
    category: {
      type: String,
      required: true,
      enum: ["Temples", "Palaces", "Beaches", "Deserts", "Heritage", "Hill Stations", "Wildlife"],
    },
    description: { type: String, default: "" },
    color: { type: Number, required: true },
    reviews: { type: Number, default: 0 },
    duration: { type: String, default: "2 Days" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);