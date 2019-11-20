/******************************************************************************
 * OnLoad()
 * Check local Storage for saved City, if there,
 * display weather information to user
 *******************************************************************************/
function onLoad() {
    if (localStorage.getItem('City') != null) {
        var cityData = JSON.parse(localStorage.getItem('City'));
        loadWeather(cityData.city, cityData.unit);
    }
    else {
        // We are going to append a Message to the user to Add a City
        var prompt = document.createElement("h2");
        prompt.setAttribute("id", "cityPrompt");
        prompt.innerHTML = "Please enter your city name to see todays weather conditions!";
        // Insert this Element before the weatherDiv
        document.body.insertBefore(prompt, document.getElementById("weatherDiv"));
    }
}

// Function to exeute api calls and change dom elemnts
function loadWeather(city, unit) {
    // make API call using AJAX
    getWeather(city, unit);
    // Remove any results currently inside the weatherDiv
    var weatherDiv = document.getElementById("weatherDiv");
    weatherDiv.removeChild(weatherDiv.firstChild);
        
    //Change Prompt or set prompt
    var promptMsg = "Todays weather forecast for " + city + " is,";
    if (!!document.getElementById("cityPrompt")) {
        document.getElementById("cityPrompt").innerHTML = promptMsg;
    }
    else {
        var prompt = document.createElement("h2");
        prompt.setAttribute("id", "cityPrompt");
        prompt.innerHTML = promptMsg;
        document.body.insertBefore(prompt, document.getElementById("weatherDiv"));
    }
}

/*********************************************************************************
 * EventListener for weather button
 *******************************************************************************/
// On button click execute getCity
document.getElementById('changeCity').addEventListener("click", getCity);

// Get user input for City
function getCity() {
    var newCity = document.getElementById('newCity').value;
    var newUnit = document.getElementById('unitSelect').value;
    console.log(newCity);
    loadWeather(newCity, newUnit);
}


/***********************************************************************************
 * All Ajac fucntions, including setting up
 * Ajax calls, executing the getWeather function,
 * and doing the Ajax Get in that function 
 ***************************************************************************************/

 // Basic Ajax call to consume a JSON source
function ajaxGet(url, city, unit, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Remove error message, if visible
            document.getElementById("invalidCity").style.display = "none"; 
            // Save City & unit to localStorage
            var cityJson = {
                city: city,
                unit: unit
            };
            localStorage.setItem('City', JSON.stringify(cityJson));
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
            // Show error message
            document.getElementById("invalidCity").style.display = "block";                     
        }
    });
    req.send(null);
}

// Get Weather data, save city for future use in LocalStorage, and display to User
function getWeather(city, unit) {
    // API key from Kyle Kadous account on OpenWeatherMap.org
    var key = "&APPID=a00e17c149b83662749c16c65a92a926";
    // Call to get data
    ajaxGet("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + key, city, unit, function (reponse) {
        var data = JSON.parse(reponse);
        console.log(data);

        // Create List to add to weatherDiv
        var weatherList = document.createElement("div");
        weatherList.setAttribute("id", "resultsDiv")

        var temperature = document.createElement("p");

        if (unit == "imperial") {
            temperature.innerHTML = "Temperature: " + data.main.temp + " °F";
            weatherList.appendChild(temperature);
        }
        else {
            temperature.innerHTML = "Temperature: " + data.main.temp + " °C";
            weatherList.appendChild(temperature);
        }
        
        var iconCode = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var icon = document.createElement("img");
        icon.setAttribute("src", iconUrl);
        icon.setAttribute("id", "weatherIcon");
        weatherList.appendChild(icon);

        document.getElementById("weatherDiv").appendChild(weatherList);
    });
}


