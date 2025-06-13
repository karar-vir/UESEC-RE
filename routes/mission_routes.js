const express = require('express');
const router = express.Router();
const Mission = require('../models/operations_model');
const Ship = require('../models/ships_model');

// GET form to create a new mission
router.get('/new', async (req, res) => {
  try {
    const ships = await Ship.find(); 
    res.render('missions/createMission', { ships });
  } catch (error) {
    console.error('Error loading mission form:', error.message);
    res.status(500).send('Error loading form');
  }
});


// POST create mission
router.post('/', async (req, res) => {
  try {
    const {
      missionId,
      shipAssigned,
      destinationPlanet,
      missionPurpose,
      missionDate
    } = req.body;

    const newMission = new Mission({
      missionId,
      shipAssigned,
      destinationPlanet,
      missionPurpose,
      missionDate
    });

    await newMission.save();
    res.redirect('/api/missions/list');  
  } catch (error) {
    console.error('Failed to create mission:', error.message);
    res.status(400).send('Failed to create mission: ' + error.message);
  }
});

// GET all missions
router.get('/list', async (req, res) => {
  try {
    const missions = await Mission.find().populate('shipAssigned');
    res.render('missions/listMission', { missions });
  } catch (error) {
    console.error('Error loading mission list:', error.message);
    res.status(500).send('Error loading mission list');
  }
});


// POST create new mission
router.post('/', async (req, res) => {
  try {
    const {
      missionId,
      shipAssigned, 
      destinationPlanet,
      missionPurpose,
      missionDate
    } = req.body;

    // Convert missionDate to a Date object
    const missionDateObj = new Date(missionDate);

    const newMission = new Mission({
      missionId,
      shipAssigned, 
      destinationPlanet,
      missionPurpose,
      missionDate: missionDateObj
    });

    await newMission.save();
    res.redirect('/api/missions/list');  
  } catch (error) {
    console.error('Failed to create mission:', error.message);
    res.status(400).send('Failed to create mission: ' + error.message);
  }
});


// Delete Mission
router.delete('/:id', async (req, res) => {
    await Mission.findByIdAndDelete(req.params.id);
    res.redirect('/api/missions/list');  
 
});

// Update Mission
router.put('/:id', async (req, res) => {
    const updatedMission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMission);
  
});


module.exports = router;
