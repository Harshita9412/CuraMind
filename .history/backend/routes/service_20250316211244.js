const express = require("express");
const router = express.Router();
const Service= require("../models/Services");
const {data} =require("../init/service");
module.exports = router;


router.get("/", async (req, res) => {
  try {
    const allServices = await Service.find({});
    console.log(allServices);  // Log the fetched data to verify it's being fetched
    res.json(allServices);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});



module.exports = router;
