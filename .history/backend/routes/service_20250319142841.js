const express = require("express");
const router = express.Router();
const Service = require("../models/Services");

// GET: Fetch all services
router.get("/services", async (req, res) => {
  try {
    const allServices = await Service.find(); // No need for empty object explicitly

    if (!allServices || allServices.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    res.status(200).json(allServices); // Clearer success response
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
