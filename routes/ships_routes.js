const express = require('express');
const router = express.Router();
const Ship = require('../models/ships_model');
const Personnel = require('../models/personnels_model');
const methodOverride = require('method-override');

// Use method-override for PUT and DELETE requests
router.use(methodOverride('_method'));

// Show ship creation form
router.get('/new', async (req, res) => {
  try {
    const personnel = await Personnel.find(); 
    res.render('ships/createShip', { personnel });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET List all ships
router.get('/list', async (req, res) => {
  try {
    const ships = await Ship.find().populate('crew'); 
    res.render('ships/listShip', { ships });
  } catch (err) {
    console.error('Error fetching ships:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// GET show ship edit form
router.get('/:id/edit', async (req, res) => {
  const shipId = req.params.id;
  const ship = await Ship.findById(shipId).populate('crew');
  const personnel = await Personnel.find();
  res.render('ships/editShip', { ship, personnel });
});

//Create new ship
router.post('/', async (req, res) => {
  try {
    const { name, registryNumber, missionSchedule, crew } = req.body;

    // This will split missionSchedule and create an array of mission objects
    const missionArray = missionSchedule.split(',').map(item => ({
      destination: item.trim(),
      date: new Date(),
      purpose: 'exploration'
    }));

    const newShip = new Ship({
      name,
      registryNumber,
      missionSchedule: missionArray,
      crew
    });

    await newShip.save();
    res.redirect('/api/ships/list');
  } catch (err) {
    console.error('Error creating ship:', err.message);
    res.status(400).send('Failed to create ship: ' + err.message);
  }
});

// PUT /api/ships/:id – Update a ship
router.put('/:id', async (req, res) => {
  await Ship.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.redirect('/api/ships/list'); 
});



// DELETE ship by
router.delete('/:id', async (req, res) => {
  try {
    await Ship.findByIdAndDelete(req.params.id);
    res.redirect('/api/ships/list'); 
  } catch (err) {
    console.error('Delete failed:', err.message);
    res.status(500).send('Failed to delete ship');
  }
});

module.exports = router;
