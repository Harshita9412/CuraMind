const mongoose = require("mongoose");
const initData = require("./services.js");
const Service = require('../models/Services');

const Patient=require("../models/Patients");
const initPatient=require("./patients.js");
const MONGO_URL = "mongodb+srv://hackathon9412:SJSx2uRfGeWh0W94@cluster0.bbipg.mongodb.net/hackathonDB?retryWrites=true&w=majority";

main()
  .then(() => {
    console.log("Connected to DB");
    initDB();  // Make sure initDB is only called after DB connection is established
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });  // Added options to ensure proper connection handling
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  // Exit if connection fails
  }
}

const initDB = async () => {
  try {
    // Deleting existing data and inserting new data
    await Service.deleteMany({});
    await Service.insertMany(initData.data);

    await Patient.insertMany(initPatient.data);

    console.log("Data was initialized");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
};
