const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const reviewRoutes = require("./routes/review");
const contactRoutes = require("./routes/contact");
const serviceRoutes = require("./routes/service");

require("dotenv").config();

// Middleware setup
app.use(express.json());

// CORS setup with environment flexibility
const allowedOrigins = [
  process.env.LOCAL_DEV_URL || "http://localhost:5173",
  "http://localhost:3000",
  process.env.PROD_URL || "https://curamind.onrender.com"
];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
  credentials: true
}));

// Handle Preflight requests (important for complex requests)
app.options('*', cors());

// MongoDB URL Validation
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error("MONGO_URL is not defined. Please check your .env file.");
  process.exit(1);
}

// MongoDB Connection with Enhanced Error Handling
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
.catch((error) => {
  console.error("❌ Error connecting to MongoDB Atlas:", error.message);
  process.exit(1);
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", serviceRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);

// Test Route for GET request
app.get("/", (req, res) => {
  res.send("✅ Server is working perfectly!");
});

// Error Handling Middleware with Enhanced Error Details
app.use((err, req, res, next) => {
  console.error("❗ Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
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
  console.log(`🚀 Server is running on port ${PORT}`);
});
