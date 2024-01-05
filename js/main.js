/*********************************************************** */
var userLocation;
document.addEventListener("DOMContentLoaded", function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocation);
      } else { 
        userLocation='cairo';
      }
})

function saveLocation(position) {
  userLocation =position.coords.latitude + 
  "," + position.coords.longitude;
  console.log(userLocation);
  forcastFor3days(userLocation);
}

/************************************************************* */

let cityName = document.querySelector('#searchName');
let locationName = document.querySelector('#location');
let dayName = document.querySelectorAll('#day');
let dayDate = document.querySelector('#date');
let degrees = document.querySelectorAll('#degree');
let minDegrees =document.querySelectorAll('#min-degree')
let icons = document.querySelectorAll('.heat img');
let statuses = document.querySelectorAll('.status');
let rain=document.querySelector('.rain');
let wind=document.querySelector('.wind');
let compass=document.querySelector('.compass');
let searchName=document.querySelector('#searchName');



async function forcastFor3days(cityName) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=e046e79cd42347ec841212255240201`);
    console.log(data.status);
    if(data.status==200)
    {
        data = await data.json();
        console.log(data);
        locationName.innerHTML= data.location.name; 
        changeDayAndDate(data);
        degrees[0].innerHTML=data.current.temp_c+`<sup>o</sup>`+"C";
        degrees[1].innerHTML=data.forecast.forecastday[1].day.maxtemp_c+`<sup>o</sup>`+"C";
        degrees[2].innerHTML=data.forecast.forecastday[2].day.maxtemp_c+`<sup>o</sup>`+"C";
        minDegrees[0].innerHTML=data.forecast.forecastday[1].day.mintemp_c+`<sup>o</sup>`+"C";
        minDegrees[1].innerHTML=data.forecast.forecastday[2].day.mintemp_c+`<sup>o</sup>`+"C";
        statuses[0].innerHTML=data.current.condition.text;
        statuses[1].innerHTML=data.forecast.forecastday[1].day.condition.text;
        statuses[2].innerHTML=data.forecast.forecastday[2].day.condition.text;
        rain.innerHTML=`<img src="images/icon-umberella.png" alt="" width="23" height="21"> ${data.forecast.forecastday[0].day.daily_chance_of_rain
        }%`;
        wind.innerHTML=`<img src="images/icon-wind.png" alt="" width="23" height="21"> ${data.current.wind_kph
        } k/h`;
        compass.innerHTML=`<img src="images/icon-compass.png" alt="" width="23" height="21"> ${getWindDirection(data.current.wind_dir)
        }`;
        icons[0].src=getSrc(data.current.condition.icon);
        icons[1].src=getSrc(data.forecast.forecastday[1].day.condition.icon);
        icons[2].src=getSrc(data.forecast.forecastday[2].day.condition.icon);
    }
}

forcastFor3days('Giza');

searchName.addEventListener('input' , function searchByName() {
    if(searchName.value=='')
    {
        forcastFor3days('cairo');
    }
    forcastFor3days(searchName.value);
})



function getSrc(s) {
    return s.slice(21,undefined);
}

function getWindDirection(string) {
    switch (string) {
        case "N":
            return "North";
        case "W":
            return "West";
        case "S":
            return "South";
        case "E":
            return "East";
        case "WSW":
            return "West-Southwest";
        case "NW":
            return "Northwest";
        case "NE":
            return "Northeast";
        case "SW":
            return "Southwest";
        case "SE":
            return "Southeast";
    
        default:
            break;
    }
}


function changeDayAndDate(data) {

    let currentDay= data.forecast.forecastday[0].date;
    let secondDay= data.forecast.forecastday[1].date;
    let thirdDay= data.forecast.forecastday[2].date;
    let day1= new Date(currentDay);
    let day2= new Date(secondDay);
    let day3= new Date(thirdDay);

    dayDate.innerHTML=day1.getDay()+day1.toLocaleString('default',{month:'long'});
    dayName[0].innerHTML=getDay(day1.toDateString().slice(0,3));
    dayName[1].innerHTML=getDay(day2.toDateString().slice(0,3));
    dayName[2].innerHTML=getDay(day3.toDateString().slice(0,3));
    
}

function getDay(day) {
    switch (day) {
        case "Wed":
            return "Wednesday";
        case "Mon":
            return "Monday";
        case "Sat":
            return "Saturday";
        case "Thu":
            return "Thursday";
        case "Fri":
            return "Friday";
        case "Sun":
            return "Sunday";
        case "Tue":
            return "Tuesday";
    }
}

