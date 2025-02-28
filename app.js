const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
app.use(express.json()); // This is crucial to parse incoming JSON
const cors = require("cors");

const serviceRoute=require("./routes/service");
// const submitRoute = require("./routes/submit");
// const officeRoute = require("./routes/office");
// const craftRoute = require("./routes/craft");

require("dotenv").config();

// MongoDB URL
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  
  serverSelectionTimeoutMS: 5000,  // Timeout for selecting server (5 seconds)
  socketTimeoutMS: 45000          // Socket timeout duration (45 seconds)
})
.then(() => {
  console.log("Successfully connected to MongoDB Atlas!");
})
.catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});

// mongoose.set('debug', true);


// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173'  // Allow requests only from this frontend URL
}));

app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.log("DB connection error:", err);
  }
}


app.use("/", require("./routes/service"));
// app.use("/submit", submitRoute);  
// app.use("/office_essentials", officeRoute);
// app.use("/craft", craftRoute);

// Test Route for GET request
app.get("/", (req, res) => {
  console.log("Received GET request at /");
  res.send("Server is working");
});

// Production setup for serving React app
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
