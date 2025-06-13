const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  missionId: { 
    type: String, 
    unique: true, 
    required: true 
},
  shipAssigned: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ship', 
    required: true 
},
  destinationPlanet: { 
    type: String, 
    required: true 
},
  missionPurpose: { 
    type: String, 
    enum: ['exploration', 'first contact', 'support UESEC bases'], required: true },
  missionDate: { 
    type: Date, 
    required: true 
}
});

module.exports = mongoose.model('Mission', missionSchema);
