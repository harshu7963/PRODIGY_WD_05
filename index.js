document.getElementById('btn').addEventListener('click', function() {
    const searchBox = document.getElementById('search-box').value;
    if (!searchBox) {
        alert('Please enter a location!');
        return;
    }

    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block';

    const apiKey = '7d996a557f3e510fdb564a765c7825dc'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the response data for debugging
            loadingSpinner.style.display = 'none';

            const weatherData = {
                temperature: data.main.temp,
                wind: data.wind.speed,
                humidity: data.main.humidity,
                rain: data.rain ? data.rain['1h'] : 0,
                snow: data.snow ? data.snow['1h'] : 0,
                cloud: data.clouds.all
            };

            document.getElementById('temperature').textContent = `${weatherData.temperature}°C`;
            document.getElementById('wind').textContent = `${weatherData.wind} km/h`;
            document.getElementById('humidity').textContent = `${weatherData.humidity} %`;
            document.getElementById('rain').textContent = `${weatherData.rain} mm`;
            document.getElementById('snow').textContent = `${weatherData.snow} inch`;
            document.getElementById('cloud').textContent = `${weatherData.cloud} %`;
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
            alert('Error: ' + error.message);
        });
});
