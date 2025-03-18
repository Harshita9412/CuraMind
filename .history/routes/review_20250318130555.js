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
