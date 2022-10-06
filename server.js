// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
app.listen(port, listening);
function listening(){
    console.log("Server is running");
    console.log(`Running on local host: ${port}`)
}
//POST route to recieve data from client side POST.
app.post('/weatherData', addWeatherData);
function addWeatherData(req,res){
    projectData = {
    date: req.body.date,
    temp: req.body.temp,
    feeling: req.body.feeling
    }
}
//GET Route to return weatherData Object
app.get('/weatherData' , (req ,res) =>{
    res.send(projectData);
})