const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { 
    type: String, 
    required: true,   // Ensure that the name is always provided
    unique: true      // Optional: Ensures no duplicate service names
  },
  image: { 
    type: String, 
    required: true    // Ensure that an image URL/path is always provided
  }
});

const Service = mongoose.model("Service", serviceSchema); 
module.exports = Service;
