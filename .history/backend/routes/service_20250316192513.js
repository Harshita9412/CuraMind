const express = require("express");
const router = express.Router();
const Service = require("../models/Service"); // Ensure this points to the correct model

// Route to get all services
router.get("/", async (req, res) => {
  try {
    const allServices = await Service.find({});  // Fetch all services from the database
    res.json(allServices);  // Send the data to the frontend
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
