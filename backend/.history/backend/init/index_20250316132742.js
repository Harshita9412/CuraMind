const mongoose = require("mongoose");
const initServiceData = require("./service.js"); // Import services data
const initReviewData = require("./reviews.js");  // Import reviews data (create this file)
const Service = require("../models/Services"); 
const Review = require("../models/Reviews"); // Import Review model

const MONGO_URL = "mongodb+srv://hackathon9412:SJSx2uRfGeWh0W94@cluster0.bbipg.mongodb.net/hackathonDB?retryWrites=true&w=majority";

main()
  .then(() => {
    console.log("✅ Connected to DB");
    initDB();  
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1); 
  }
}

const initDB = async () => {
  try {
    // Initialize Services
    await Service.deleteMany({});
    await Service.insertMany(initServiceData.data);  
    console.log("✅ Services initialized successfully");

    // Initialize Reviews (only if there are none)
    const existingReviews = await Review.find();
    if (existingReviews.length === 0) {
      await Review.insertMany(initReviewData.data);
      console.log("✅ Reviews initialized successfully");
    } else {
      console.log("⚠️ Reviews already exist, skipping insertion.");
    }
    
  } catch (err) {
    console.error("❌ Error initializing data:", err);
  }
};
