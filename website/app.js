/* Global Variables */
const apiKey = '807c48ad020e32dacfe41c4adc023848&units=imperial';
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
let subURL = ",us&appid="
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();
//POST route to save data entered to weatherData Object
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url,{
        method : 'POST',
        credentials : 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    })
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error: " + error);
    }
}
//Event listener to do print the data when clicking generate button
document.getElementById('generate').addEventListener('click' , performAction);
function performAction(event){
    const zipcode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getWeather(baseURL + zipcode +  subURL + apiKey)
    .then(function (data){
        postData('/weatherData' , {date : newDate , temp: data['main']['temp'] , feeling: feeling});
        retrieveData();
    })
}
//Get Route to recieve weatherData Obje
const getWeather = async (url) =>{
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    }catch(error) {
        console.log("Error: Please Enter a correct zipcode");
    }
}
//Updata the UI with the data stored in the weatherData Object
const retrieveData = async () =>{
    const request = await fetch('/weatherData');
    try {
    // Transform into JSON
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('date').innerHTML = allData.date;
    const feel = document.getElementById('content').innerHTML;
    document.getElementById('content').innerHTML =allData.feeling;
    }
    catch(error) {
        console.log("error: ", error);
      // appropriately handle the error
    }
}