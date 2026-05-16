const apiKey = "b220c65b7f878897de3ca67c6d65c06a";

async function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const result = document.getElementById("weatherResult");

  const city = cityInput.value.trim();

  if (city === "") {
    result.innerHTML = "⚠️ Please enter a city name";
    return;
  }

  result.innerHTML = "⏳ Fetching weather data...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (!response.ok || data.cod !== 200) {
      if (data.cod == "404") {
        result.innerHTML = "❌ City not found";
      } else if (data.cod == 401) {
        result.innerHTML = "🔑 API key not active yet";
      } else {
        result.innerHTML = "❌ Unable to fetch data";
      }
      return;
    }

    // 🌦 Weather Icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // 🎨 Dynamic Background
    const weatherMain = data.weather[0].main;

    if (weatherMain === "Clear") {
      document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
    } else if (weatherMain === "Rain") {
      document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
    } else if (weatherMain === "Clouds") {
      document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    } else {
      document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
    }

    // 💎 Display Data
    result.innerHTML = `
      <div class="weather-card">
        <h2>📍 ${data.name}</h2>
        <img src="${iconUrl}" alt="weather icon">
        <p class="temp">🌡 ${data.main.temp}°C</p>
        <p>🌤 ${data.weather[0].main}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      </div>
    `;

  } catch (error) {
    result.innerHTML = "❌ Network error. Try again.";
  }
}

// Enter key support
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});