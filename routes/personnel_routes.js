const express = require('express');
const router = express.Router();
const Personnel = require('../models/personnels_model');

// GET form to create new personnel
router.get('/new', (req, res) => {
  res.render('personnel/createPersonnel');
});

// This will show the edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const personnel = await Personnel.findById(req.params.id);
    if (!personnel) {
      return res.status(404).send('Personnel not found');
    }
    res.render('personnel/editPersonnel', { personnel });
  } catch (error) {
    console.error('Error fetching personnel:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { name, rank, skills, serviceId, dateOfEnlistment, technicalSpecialty } = req.body;
    const skillsArray = Array.isArray(skills) ? skills : (skills ? [skills] : []);

    await Personnel.findByIdAndUpdate(req.params.id, {
      name,
      rank,
      skills: skillsArray,
      serviceId,
      dateOfEnlistment,
      technicalSpecialty
    });

    res.redirect('/api/personnel/list');
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).send('Failed to update personnel');
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      name,
      rank,
      skills,
      serviceId,
      dateOfEnlistment,
      technicalSpecialty
    } = req.body;

    const skillsArray = Array.isArray(skills) ? skills : (skills ? [skills] : []);

    const newPersonnel = new Personnel({
      name,
      rank,
      skills: skillsArray,
      serviceId: serviceId || null,
      dateOfEnlistment: dateOfEnlistment || null,
      technicalSpecialty: technicalSpecialty || null
    });

    await newPersonnel.save();

    res.redirect('/api/personnel/list');
  } catch (error) {
    console.error('Error creating personnel:', error.message);
    res.status(400).send('Failed to create personnel: ' + error.message);
  }
});


// GET list of personnel
router.get('/list', async (req, res) => {
  try {
    const allPersonnel = await Personnel.find();
    res.render('personnel/listPersonnel', { personnels: allPersonnel });
  } catch (error) {
    console.error('Error fetching personnel:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE /api/personnel/:id
router.delete('/:id', async (req, res) => {
  try {
    await Personnel.findByIdAndDelete(req.params.id);
    res.redirect('/api/personnel/list');
  } catch (error) {
    console.error('Delete failed:', error);
    res.status(500).send('Failed to delete personnel');
  }
});






module.exports = router;
