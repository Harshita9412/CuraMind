const express = require("express");
const router = express.Router();
const Service = require("../models/Services");  // Ensure the correct path to your Service model

// Fetch services from MongoDB
router.get("/services", async (req, res) => {
  try {
    const allServices = await Service.find({}); // Fetch all services
    res.json(allServices);  // Return the services as JSON
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
