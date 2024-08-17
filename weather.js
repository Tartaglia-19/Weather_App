document.getElementById('search-button').addEventListener('click', function() {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block';

    const apiKey = '5f7dbb8d609c4a3c80772830241508';
    const city = document.getElementById('city-input').value;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&hours=12`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none';
            if (data.error) {
                alert('City not found. Please try again.');
            } else {
                displayWeather(data);
                updateBackground(data.current.condition.text.toLowerCase());
            }
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
            console.error('Error:', error);
        });
});

document.getElementById('location-button').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = '5f7dbb8d609c4a3c80772830241508';
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&hours=12`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                    updateBackground(data.current.condition.text.toLowerCase());
                })
                .catch(error => console.error('Error:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function displayWeather(data) {
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.style.display = 'block';

    document.getElementById('city-name').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;
    document.getElementById('weather-icon').src = `https:${data.current.condition.icon}`;
    document.getElementById('description').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} km/h`;

    const hourlyContainer = document.getElementById('hourly-container');
    hourlyContainer.innerHTML = ''; // Clear previous forecast

    data.forecast.forecastday[0].hour.forEach(hour => {
        const hourDiv = document.createElement('div');
        hourDiv.classList.add('hour');

        const time = new Date(hour.time).getHours();
        const hourLabel = document.createElement('p');
        hourLabel.textContent = `${time}:00`;

        const icon = document.createElement('img');
        icon.src = `https:${hour.condition.icon}`;
        icon.alt = hour.condition.text;

        const temp = document.createElement('p');
        temp.textContent = `${hour.temp_c}°C`;

        hourDiv.appendChild(hourLabel);
        hourDiv.appendChild(icon);
        hourDiv.appendChild(temp);
        hourlyContainer.appendChild(hourDiv);
    });
}

function updateBackground(condition) {
    const body = document.body;
    let backgroundImage = '';

    if (condition.includes('mist') || condition.includes('fog')) {
        backgroundImage = 'url(https://media.giphy.com/media/7sixb5g8SajtI3vKa2/giphy.gif?cid=790b7611rdmpbd5lmeyqr44aqiydbkd9vjg1hkshbh48al3g&ep=v1_gifs_search&rid=giphy.gif&ct=g)';
    } else if (condition.includes('clear')) {
        backgroundImage = 'url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3hibjhwMHRncHJhd3F5ZWRhaHBxaGxydjRkZzN1ODFwOWM3NWZqbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0Styincf6K2tvfjb5Q/giphy.gif)';
    } else if (condition.includes('cloud')) {
        backgroundImage = 'url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2o5d3JpYXEyN3kzOGV2N2x6dzQza2RmZjEzeGNzZmY1cXoxcmc2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h2U7mw5FtSqDenaGwJ/giphy.gif)';
    } else if (condition.includes('rain')) {
        backgroundImage = 'url(https://media.giphy.com/media/Mgq7EMQUrhcvC/giphy.gif?cid=790b7611pmfzssi97xeas50wfkjwo5bb6sx17egs9cdsx2pd&ep=v1_gifs_search&rid=giphy.gif&ct=g)';
    } else if (condition.includes('snow')) {
        backgroundImage = 'url(https://media.giphy.com/media/BDucPOizdZ5AI/giphy.gif?cid=790b7611c83jfqz7pvmlcx4c38c0u0uh0iu9cul0xceot67o&ep=v1_gifs_search&rid=giphy.gif&ct=g)';
    } else if (condition.includes('sunny')) {
        backgroundImage = 'url(https://media.giphy.com/media/26BRq3yxyHFAt9AYw/giphy.gif?cid=ecf05e47a2uqnhr6tm5cyou8l4n9elaa2nynhzxz0arkeiz8&ep=v1_gifs_search&rid=giphy.gif&ct=g)';
    } else {
        backgroundImage = 'url(https:\/\/media.giphy.com\/media\/PU9ae3tuWoJCU\/giphy.gif?cid=790b76117it3xb4ce1rjn7oppu2cjafbmnuxxp151c3p89fo&ep=v1_gifs_search&rid=giphy.gif&ct=g)'; // Default background
    }

    if (backgroundImage) {
        body.style.backgroundImage = backgroundImage;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundColor = '#444'; // Fallback color
    }
}


