const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const serviceSchema = new Schema({
    image: { 
        type: String 
      }, 
      
    name: { 
    type: String, 
    
  },
  
  
});

const Service = mongoose.model("Product", serviceSchema); 
module.exports = Service;