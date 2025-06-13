const express = require('express');
const Mission = require('../models/missions_model');
const router = express.Router();

// Create Mission
router.post('/', async (req, res) => {
  try {
    const mission = new Mission(req.body);
    await mission.save();
    res.status(201).json(mission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read All Missions
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find().populate('shipAssigned');
    res.json(missions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Mission
router.put('/:id', async (req, res) => {
  try {
    const updatedMission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Mission
router.delete('/:id', async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
