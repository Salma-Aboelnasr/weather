async function search(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    if (response.ok && 400 != response.status) {
        let data = await response.json();
        displayCurrent(data.location, data.current);
        displayForecast(data.forecast.forecastday);
    }
}

document.getElementById("search").addEventListener("keyup", (e) => {
    search(e.target.value);
});

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, current) {
    if (current) {
        var date = new Date(current.last_updated.replace(" ", "T"));
        let content = `
        <div class="card sizze">
            <div class="card-header d-flex flex-row justify-content-between cardhead">
                <span>${days[date.getDay()]}</span>
                <span>${date.getDate()} ${monthNames[date.getMonth()]}</span>
            </div>
            <div class="card-body pb-5">
                <div class="content">
                    <div class="city">${location.name}</div>
                    <div class="degree">
                        <div class="num">${current.temp_c}<span class="osss">°</span>C</div>
                    </div>
                    <div class="img1">
                        <img src="https:${current.condition.icon}" alt="Weather Icon">
                    </div>
                    <div class="special">${current.condition.text}</div>
                </div>
                <div class="wind">
                    <span class="px-2"><img src="./imgs/icon-umberella.png"> ${current.precip_mm}%</span>
                    <span class="px-2"><img src="./imgs/icon-wind.png"> ${current.wind_kph} km/h</span>
                    <span class="px-2"><img src="./imgs/icon-compass.png"> ${current.wind_dir}</span>
                </div>
            </div>
        </div>`;
        document.querySelector('.container2').innerHTML = content;
    }
}

function displayForecast(forecast) {
    let forecastContent = "";
    forecast.forEach((day, index) => {
        if (index !== 0) { // Skip the current day
            let date = new Date(day.date);
            forecastContent += `
            <div class="card size">
                <div class="card-header cardhead">
                    <span>${days[date.getDay()]}</span>
                </div>
                <div class="card-body">
                    <div class="content d-flex flex-column justify-content-center align-items-center">
                        <div class="img2">
                            <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                        </div>
                        <div class="degree">
                            <div>${day.day.maxtemp_c}<span class="osss">°</span>C</div>
                        </div>
                        <div class="w-1-7 min">
                            ${day.day.mintemp_c}<span class="osss">°</span>
                        </div>
                        <div class="special">${day.day.condition.text}</div>
                    </div>
                </div>
            </div>`;
        }
    });
    document.querySelector('.container2').innerHTML += forecastContent;
}

// Call with a default city to show initial weather
search("Cairo");

// Function to get the user's location using Geolocation API
    // function getUserLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showWeather, showError);
    //   } else {
    //     alert("Geolocation is not supported by this browser.");
    //   }
    // }

    // // Callback function if geolocation is successful
    // function showWeather(position) {
    //   const lat = position.coords.latitude;
    //   const lon = position.coords.longitude;
    //   const location = `${lat},${lon}`;
    //   search(location); // Make API request with latitude and longitude
    // }

    // // Callback function if there is an error in geolocation
    // function showError(error) {
    //   console.error(error);
    //   alert("Unable to retrieve your location. Defaulting to Cairo.");
    //   search("Cairo"); // Default location if geolocation fails
    // }

    // // Weather API fetch and display logic
    // async function search(location) {
    //   const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`);
    //   if (response.ok && response.status !== 400) {
    //     const data = await response.json();
    //     displayWeather(data.location, data.forecast.forecastday);
    //   }
    // }

    // // Function to display weather data
    // function displayWeather(location, forecast) {
    //   const container = document.getElementById('forecastContainer');
    //   container.innerHTML = '';  // Clear previous content

    //   // Loop through the forecast for each day
    //   forecast.forEach((day, index) => {
    //     // Determine background color for middle card (2nd card)
    //     let backgroundColor = '';
    //     if (index === 1) { // Middle card (second day's forecast)
    //       if (day.day.condition.text.toLowerCase().includes('sunny')) {
    //         backgroundColor = '#262936'; // Yellow for sunny
    //       }else {
    //         backgroundColor = '#323544'; // Default background for others
    //       }
    //     }

    //     // Create card for each day
    //     const card = `
    //       <div class="card size" style="background-color: ${backgroundColor};">
    //         <div class="card-header cardhead">
    //           <span>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
    //         </div>
    //         <div class="card-body">
    //           <div class="content d-flex flex-column justify-content-center align-items-center">
    //             <div class="img2">
    //               <img src="https:${day.day.condition.icon}" alt="Weather icon">
    //             </div>
    //             <div class="degree">
    //               <div>
    //                 ${day.day.avgtemp_c} <span class="osss">o</span>C
    //               </div>
    //             </div>
    //             <div class="w-1-7 min">
    //               ${day.day.mintemp_c} <span class="osss">o</span>
    //             </div>
    //             <div class="special">
    //               ${day.day.condition.text}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     `;
    //     container.innerHTML += card;  // Append each card to the container
    //   });
    // }

    // // Event listener for search input
    // document.getElementById('search').addEventListener('keyup', (event) => {
    //   search(event.target.value);
    // });
    // // Initial search based on user's location or default to Cairo if location fails
    // getUserLocation();
