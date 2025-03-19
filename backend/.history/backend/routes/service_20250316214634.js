const express = require("express");
const router = express.Router();
const Service = require("../models/Services");
const { data } = require("../init/service");  // It's not being used, so you might want to remove it if unnecessary

// Define the GET route to fetch all services
router.get("/services", async (req, res) => {
  try {
    const allServices = await Service.find({});  // Fetch all services from the database
    console.log(allServices);  // Log the fetched data to verify it's being fetched
    res.json(allServices);  // Send the fetched services as JSON response
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;  // Only one module.exports here
