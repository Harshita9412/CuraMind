
const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const serviceSchema = new Schema({
  name: { 
    type: String, 
    required: true ,
  },
  image: { 
    type: String 
  }, 
  
  
});

const Services = mongoose.model("Services", serviceSchema); 
module.exports = Services;  