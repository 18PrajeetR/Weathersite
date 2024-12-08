const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityinput");
const Card = document.querySelector(".card");
const apikey = "1f51b092e50b6f6db876a0e8f46201b6";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim(); // Trim whitespace
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayweatherinfo(weatherData);
        } catch (error) {
            console.error(error);
            displayerror("Could not fetch weather data. Please try again.");
        }
    } else {
        displayerror("Please enter a city.");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayweatherinfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }],
    } = data;

    const tempCelsius = temp - 273.15;

    Card.textContent = "";
    Card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${tempCelsius.toFixed(2)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent= getweatheremoji(id);
    

    cityDisplay.classList.add("citydisplay");
    tempDisplay.classList.add("tempdisplay");
    humidityDisplay.classList.add("humiditydisplay");
    descDisplay.classList.add("descdisplay");
    weatherEmoji.classList.add("weatheremoji");

    Card.appendChild(cityDisplay);
    Card.appendChild(tempDisplay);
    Card.appendChild(humidityDisplay);
    Card.appendChild(descDisplay);
    Card.appendChild(weatherEmoji);
}
function getweatheremoji(WeatherID){
    switch(true){
        case (WeatherID>=200 && WeatherID<300):
            return "🌨";
            case (WeatherID>=300 && WeatherID<400):
            return "⛈";
            case (WeatherID>=500 && WeatherID<600):
            return "🌨";
            case (WeatherID>=600 && WeatherID<700):
            return "❄";
            case (WeatherID>=700 && WeatherID<800):
            return "🌫";
            case (WeatherID===800):
            return " ☀ ";
            case (WeatherID>=800&& WeatherID<810):
            return "⛅";
            default:
                return"❓";
    }
}

function displayerror(message) {
    Card.textContent = message;
    Card.style.display = "block";
}
