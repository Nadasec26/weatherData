var rowData = document.querySelector('.rowData');
var searchInput = document.querySelector("input");
var forecast;
var cityName;

async function getWeather(city){
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4f946241e3a74a7e8d3125359252004&q=${city}&days=3`);
        var data = await response.json();
        forecast = data.forecast.forecastday;
        cityName = data.location.name;
        displayData();
    } catch(error) {
        console.log(error);
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            getWeather(`${lat},${lon}`);
            },
            function() {
            console.log("Location blocked, using default.");
            getWeather("Cairo");
            }
        );
        } else {
        getWeather("Cairo");
    }
}



searchInput.addEventListener('input', function(){
    var city = searchInput.value.trim();
    
    if (city.length >= 3) {
        getWeather(city);
    }
});

getUserLocation();

function displayData(){
    var cartona = '';
    for(var i = 0 ; i < forecast.length ; i++ ){ 
        var day = new Date(forecast[i].date).toLocaleDateString('en-US', { weekday: 'long' });

    cartona += `
        <div class="col-md-4 p-0">
            <div class="card ${i % 2 === 0 ? 'bg-dark' : 'bg-secondary'} text-white rounded-0 border-0">
            <div class="list-group text-center ${i % 2 === 0 ? 'bg-secondary' : 'bg-dark'} bg-opacity-25 p-2">
                <h5>${day}</h5>
            </div>
            <div class="data p-5 text-center">
                ${i === 0 ? `<h2>${cityName}</h2>` : ""}
                <h3 class="h1 display-1 fw-bold">${forecast[i].day.avgtemp_c}°C</h3>
                ${i >= 1 ? `<p class="fs-5">${forecast[i].day.mintemp_c}°</p>` : ""}
                <img src="https:${forecast[i].day.condition.icon}" alt="${forecast[i].day.condition.text}">
                <p class="text-primary">${forecast[i].day.condition.text}</p>
            </div>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = cartona;
}