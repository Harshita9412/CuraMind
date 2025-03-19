const express = require("express");
const router = express.Router();
const Service = require("../models/Services");
const { data } = require("../init/service");  // assuming this contains mock data for seeding

// Seed the database with data if it's empty
const seedDatabase = async () => {
  try {
    const count = await Service.countDocuments();  // Count existing documents in the database
    if (count === 0) {
      await Service.insertMany(data);  // Insert mock data if no services are found
      console.log("Database seeded with initial data.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the seeding function on server startup
seedDatabase();

// Fetch all services
router.get("/services", async (req, res) => {
  try {
    const allServices = await Service.find({});
    res.json(allServices);  // Send services as JSON response
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
