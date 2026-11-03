const Tour = require("../models/tourmodels");

exports.getHomeData = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }

    const tours = await Tour.find(filter).sort({ createdAt: -1 });

    const categories = [
      "All", "Temples", "Palaces", "Beaches",
      "Deserts", "Heritage", "Hill Stations", "Wildlife",
    ];

    res.status(200).json({
      success: true,
      count: tours.length,
      categories,
      data: tours,
    });
  } catch (error) {
    console.error("Home API error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};