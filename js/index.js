const search = document.querySelector('.search-button')
const weatherStatus = document.querySelector('.weather-status');
const weatherBox = document.querySelector('.weather-box');
const weatherStatusImg = document.querySelector('.weather-status-img');
const weatherNote = document.querySelector('.weather-note');
const weatherDetail = document.querySelector('.weather-detail');
const cityName = document.querySelector('.city-name');
const humidityRate = document.querySelector('.humidity-rate');
const windspeedRate = document.querySelector('.windspeed-rate');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
weatherStatus.style.opacity = '0';

async function checkWeather(){
    const city = document.querySelector('.search-input').value;
    const APIkey = 'f658eb88f5d0c6a79a342c812a6cff76';
    let lat, lon = 0;
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`)
    .then(response => response.json()).then(json => { 
        
        if (json[0] !== undefined){
            lat = json[0].lat;
            lon = json[0].lon;
            cityName.innerHTML = `${json[0].name}`;
        }
    })
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`)
    .then(response => response.json()).then(json => {
            if(json.cod === "400"){
                weatherAnnouncement("404.jpg","",'','','')
                weatherDetail.style.opacity = '0';
                cityName.innerHTML = `Invalid Location!`
                temperature.innerHTML = '';
                return;
            }
            else{
                console.log(json);
                weatherCase(json);
            }
        })
    
}

weatherCase = (json) => {
    switch(json.weather[0].main){
        case 'Rain':
            weatherAnnouncement("Rain.jpg","Rain",json.main.humidity,json.wind.speed,json.main.temp);
        break;
        case 'Thunderstorm':
            weatherAnnouncement("Thunderstorm.jpg","Thunderstorm",json.main.humidity,json.wind.speed,json.main.temp);
        break;
        case 'Dizzle':
            weatherAnnouncement("Dizzle.jpg","Dizzle",json.main.humidity,json.wind.speed,json.main.temp);
        break;
        case 'Snow':
            weatherAnnouncement("Snow.jpg","Snow",json.main.humidity,json.wind.speed,json.main.temp);
        break;
        case 'Clouds':
            weatherAnnouncement("Clouds.jpg","Clouds",json.main.humidity,json.wind.speed,json.main.temp);
        break;
        case 'Clear':
            weatherAnnouncement("Clear.jpg","Clear",json.main.humidity,json.wind.speed,json.main.temp);
        break;
    }
}

weatherAnnouncement = (Img,Note,humidity,windspeed,temp) => {
    weatherStatus.style.opacity = '1';
    weatherBox.style.opacity = '1';
    weatherStatusImg.style.display = 'block';
    weatherStatusImg.innerHTML = `<img src="./Resources/${Img}" />`  
    weatherNote.innerHTML = `${Note}`;
    temperature.innerHTML = `${Math.floor(temp)}°C`;
    weatherDetail.style.opacity = '1';
    humidAndWinspeed(humidity,windspeed)
}

humidAndWinspeed = (humidity,windspeed) => {
    humidityRate.innerHTML = `${humidity}%`;
    windspeedRate.innerHTML = `${windspeed} mm/s`
}

search.addEventListener('click', () => {
    weatherDescription.style.display = 'block';
    cityName.innerHTML = '';
    checkWeather();
})