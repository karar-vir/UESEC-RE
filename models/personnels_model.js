const mongoose = require('mongoose');

const personnelSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  rank: { 
    type: String, 
    required: true 
  },
  skills: [String],
  serviceId: { 
    type: String 
  },  
  dateOfEnlistment: { 
    type: Date 
  },
  technicalSpecialty: { 
    type: String 
  },
  currentShip: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ship' }
});


module.exports = mongoose.model('Personnel', personnelSchema);
