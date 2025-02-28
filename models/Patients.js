const mongoose = require('mongoose');

// Define the schema for the patient
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures the name field is always provided
    trim: true, // Removes any extra spaces around the name
  },
  email: {
    type: String,
    required: true, // Ensures the email field is always provided
    unique: true, // Ensures the email is unique
    lowercase: true, // Converts the email to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Simple email validation
  },
  message: {
    type: String,
    required: true, // Ensures the message field is always provided
    minlength: 10, // Minimum length for message
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Create the model from the schema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
