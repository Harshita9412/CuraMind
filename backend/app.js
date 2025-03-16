const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const reviewRoutes = require("./routes/review");
const contactRoutes = require("./routes/contact");
const serviceRoutes = require("./routes/service");

require("dotenv").config();

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
.catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

// Middleware setup
app.use(express.json());
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:3000"], 
//   credentials: true
// }));

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:3000", 
    "https://your-frontend.onrender.com"  // ✅ Add your deployed frontend URL here
  ],
  credentials: true
}));


app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", serviceRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);

// Test Route for GET request
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
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
