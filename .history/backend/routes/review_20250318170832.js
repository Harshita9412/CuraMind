const express = require("express");
const router = express.Router();
const Review = require("../models/Reviews");

// Predefined reviews
const defaultReviews = [
  { name: "Alice", rating: 5, comment: "Amazing experience!" },
  { name: "Bob", rating: 4, comment: "Great service, will come again." },
  { name: "Charlie", rating: 5, comment: "Highly recommend!" },
  { name: "David", rating: 3, comment: "Good, but room for improvement." }
];

// GET: Fetch all reviews
router.get("/", async (req, res) => {
  try {
    let reviews = await Review.find().sort({ createdAt: -1 });

    if (reviews.length === 0) {
      console.log("No reviews found, inserting default reviews...");
      try {
        await Review.insertMany(defaultReviews);
        reviews = await Review.find().sort({ createdAt: -1 });
      } catch (insertError) {
        console.error("Error inserting default reviews:", insertError);
        return res.status(500).json({ message: "Error inserting default reviews" });
      }
    }

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// POST: Add a new review
router.post("/add", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ message: "Name and comment are required" });
    }

    if (rating < 1 || rating > 5 || typeof rating !== "number") {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
    }

    const newReview = new Review({ name, rating, comment });
    await newReview.save();

    res.status(201).json({ success: true, newReview });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
