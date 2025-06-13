const express = require("express")
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const personnelRoutes = require('./routes/personnel_routes');
const shipsRoutes = require('./routes/ships_routes');
const missionsRoutes = require('./routes/mission_routes');
require('dotenv').config();

//Import dbInit() from the configuration to inherit the connection string here use to make the database connection secure.
const { dbInit } = require('./config/db');  


const app = express()
const PORT = 3000;

dbInit();

//Set the Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use('/api/personnel', personnelRoutes);
app.use('/api/ships', shipsRoutes);
app.use('/api/missions', missionsRoutes);




//Home Route
app.get('/home',async(req,res)=>{

    res.render('index' )
})



app.listen(PORT,function(req, res){
    console.log(`You are on the PORT ${PORT}`)
})