const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const reviewRoutes = require("./routes/review");
const contactRoutes = require("./routes/contact");
const serviceRoutes = require("./routes/service");

require("dotenv").config();
// CORS setup (adjusted for local and deployed frontend URLs)
app.use(cors({
  origin: [
    "http://localhost:5173",  // Local frontend during development
    "http://localhost:3000",  // Another potential frontend (if you're using React on port 3000)
    "https://your-frontend.onrender.com"  // Replace with your actual deployed frontend URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
  credentials: true
}));

// MongoDB URL Validation
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error("MONGO_URL is not defined. Please check your .env file.");
  process.exit(1);
}

// MongoDB Connection
mongoose.set('strictQuery', true);  // Ensures safe query behavior
mongoose.connect(MONGO_URL, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log("Successfully connected to MongoDB Atlas!"))
.catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
  process.exit(1); // Exit if MongoDB connection fails
});

// Middleware setup
app.use(express.json());



// Serve static files (e.g., images) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", serviceRoutes);        // Services route
app.use("/api/reviews", reviewRoutes); // Reviews route
app.use("/api/contact", contactRoutes); // Contact route

// Test Route for GET request
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Production Setup for React App
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
