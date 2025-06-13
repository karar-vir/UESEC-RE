const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  destination: String,
  date: Date,
  purpose: { 
    type: String, 
    enum: ['exploration', 'first contact', 'support UESEC bases'] }
});

const shipSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  registryNumber: { 
    type: String, 
    unique: true, 
    required: true 
},
  missionSchedule: [missionSchema],
  crew: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Personnel' 
}]
});

module.exports = mongoose.model('Ship', shipSchema);
