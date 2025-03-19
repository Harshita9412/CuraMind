const express = require("express");
const router = express.Router();
const Service= require("../models/Services");
const {data} =require("../init/service");

router.get("/", async (req, res) => {
  try {
    const allServices = await Service.find({});
    res.json(allServices);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});



module.exports = router;
