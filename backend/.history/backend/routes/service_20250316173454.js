const express = require("express");
const router = express.Router();
const Service = require("../models/Services");  // Assuming this model exists

// Define the route to fetch services
router.get("/", async (req, res) => {  // This matches /api/services in app.js
  try {
    const allServices = await Service.find({});
    res.json(allServices);  // Respond with all the services data
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server Error", error: err.message });  // Error handling
  }
});

module.exports = router;
