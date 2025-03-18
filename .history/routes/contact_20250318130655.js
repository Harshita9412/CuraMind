const express = require("express");
const router = express.Router();
const Contact = require("../models/Contacts");

// POST: Save contact form data
router.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Input Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Contact details submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact details:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
