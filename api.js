// Retrieve the device value from localStorage if available
var device = localStorage.getItem('device') || '';

function station(name) {
    if (name === 'AvenijaZGgzC01') {
        device = '41264160-fb47-11ee-9cc4-f58d0edc07e6';
    } else if (name === 'helenasmbzgc01') {
        device = 'placeholder'; 
    } else {
        device = '41264160-fb47-11ee-9cc4-f58d0edc07e6';
    }
    console.log('Device set to:', device);
    // Store the device value in localStorage
    localStorage.setItem('device', device);
    fetchData();
}

console.log('Device set to:', device);

// Function to fetch data
function fetchData() {
// AUTHENTICATION FETCH
fetch('https://dash.esclone.com/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "username": "jamie.marjanic@gmail.com", 
        "password": "C9p$3iL!"
    }),
    mode: 'cors',
    cache: 'default',
})
    .then(res => res.json())
    .then(data => {
        console.log('Authentication response:', data);
        const token = data.token;
        //month
        const endTs = Date.now();
        const startTs = endTs - (30 * 24 * 60 * 60 * 1000);
        //day
        const DendTs = Date.now();
        const DstartTs = endTs - (24 * 60 * 60 * 1000);

        //NAME FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=stationName`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const nameValue = data.stationName[0].value;
                document.getElementById("stationname").innerHTML = nameValue;
            })
            .catch(error => console.error('Error fetching NAME data:', error));

        //LOCATION FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=station_location`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const locationValue = data.station_location[0].value;
                document.getElementById("location").innerHTML = locationValue;
                document.getElementById("city").innerHTML = locationValue;
            })
            .catch(error => console.error('Error fetching LOCATION data:', error));

        //TEMPERATURE FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=temperature`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const temperatureValue = data.temperature[0].value;
                document.getElementById("temp").innerHTML = temperatureValue;
            })
            .catch(error => console.error('Error fetching TEMPERATURE data:', error));


        //WIND FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=wind`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const windValue = data.wind[0].value;
                document.getElementById("win").innerHTML = windValue;
            })
            .catch(error => console.error('Error fetching WIND data:', error));

        //HISTORICAL WIND FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=wind&startTs=${startTs}&endTs=${endTs}&intervalType=MILLISECONDS&interval=86400000&timeZone=GMT%2B02%3A00&limit=31&agg=AVG&orderBy=ASC`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                updateWindGraph(data.wind);
            })
            .catch(error => console.error('Error fetching HISTORICAL WIND data:', error));

        //PRESSURE FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=pressure`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const pressureValue = data.pressure[0].value;    
                document.getElementById("press").innerHTML = pressureValue;
                updatePressureGraph(pressureValue);
            })
            .catch(error => console.error('Error fetching PRESSURE data:', error));

        //PRESSURE ICONS FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=pressure`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const pressureValue = data.pressure[0].value;
                var img = document.getElementById('imgWeather');
                var weatherValue = "error";
                if (pressureValue <= 960) {
                    var weatherValue = "Storm";
                    img.src = 'Icons/Storm-Icon.png';
                } else if (pressureValue > 960 && pressureValue <= 980) {
                    var weatherValue = "Rain";
                    img.src = 'Icons/Rainy-Icon.png';
                } else if (pressureValue > 980 && pressureValue <= 990) {
                    var weatherValue = "Cloudy";
                    img.src = 'Icons/Cloudy-Icon.png';
                } else if (pressureValue > 980 && pressureValue <= 1040) {
                    var weatherValue = "Sunny";
                    img.src = 'Icons/PartlyCloudy-Icon.png';
                } else if (pressureValue > 1040) {
                    var weatherValue = "Dry";
                    img.src = 'Icons/Sunny-Icon.png';
                }
                document.getElementById("weatherStatus").innerHTML = weatherValue;
            })
            .catch(error => console.error('Error fetching PRESSURE ICONS data:', error));


        //LUX FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=luxLevel`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const luxValue = data.luxLevel[0].value;
                document.getElementById("lux").innerHTML = luxValue;
            })
            .catch(error => console.error('Error fetching LUX data:', error));

        //HISTORICAL LUX FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=luxLevel&startTs=${startTs}&endTs=${endTs}&intervalType=MILLISECONDS&interval=86400000&timeZone=GMT%2B02%3A00&limit=31&agg=AVG&orderBy=ASC`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                updateLuxGraph(data.luxLevel);
            })
            .catch(error => console.error('Error fetching HISTORICAL LUX data:', error));


        //HUMIDITY FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=humidity`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const humidityValue = data.humidity[0].value;
            document.getElementById("hum").innerHTML = humidityValue;
            updateHumidityGraph(humidityValue);
        })
        .catch(error => console.error('Error fetching HUMIDITY data:', error));


        //UV INDEX FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=uvIndex`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const uvValue = data.uvIndex[0].value;
                document.getElementById("uv").innerHTML = uvValue;
                updateUvGraph(uvValue);
            })
            .catch(error => console.error('Error fetching UV INDEX data:', error));


        //HEAT INDEX FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=heatIndex`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const heatValue = data.heatIndex[0].value;
                document.getElementById("heat").innerHTML = heatValue;
            })
            .catch(error => console.error('Error fetching HEAT INDEX data:', error));


        //ABSOLUTE HUMIDITY FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=absHum`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const ahumValue = data.absHum[0].value;
                document.getElementById("abhum").innerHTML = ahumValue;
            })
            .catch(error => console.error('Error fetching ABSOLUTE HUMIDITY data:', error));

        //HISTORICAL ABSOLUTE HUMIDITY FETCH
        fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=absHum&startTs=${startTs}&endTs=${endTs}&intervalType=MILLISECONDS&interval=86400000&timeZone=GMT%2B02%3A00&limit=31&agg=AVG&orderBy=ASC`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                updateAbHumidityGraph(data.absHum);
            })
            .catch(error => console.error('Error fetching HISTORICAL ABSOLUTE HUMIDITY data:', error));


        //HISTORICAL TEMPERATURE/HUMIDITY FETCH
        function processApiResponse(apiResponse, key) {
            return apiResponse[key].map(item => ({
                date: new Date(item.ts).toLocaleDateString(),
                value: item.value
            }));
        }
        const humidityMinFetch = fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=humidity&startTs=${startTs}&endTs=${endTs}&interval=86400000&agg=MIN&limit=31&orderBy=ASC`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        });

        const humidityMaxFetch = fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=humidity&startTs=${startTs}&endTs=${endTs}&interval=86400000&agg=MAX&limit=31&orderBy=ASC`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        });

        const temperatureAvgFetch = fetch(`https://dash.esclone.com/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=temperature&startTs=${startTs}&endTs=${endTs}&interval=86400000&agg=AVG&limit=31&orderBy=ASC`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        });

        Promise.all([humidityMinFetch, humidityMaxFetch, temperatureAvgFetch])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(([minHumidityData, maxHumidityData, avgTemperatureData]) => {
                const minHumidity = processApiResponse(minHumidityData, 'humidity');
                const maxHumidity = processApiResponse(maxHumidityData, 'humidity');
                const medianTemperature = processApiResponse(avgTemperatureData, 'temperature');

                const minHumidityProcessed = { dates: minHumidity.map(d => d.date), values: minHumidity.map(d => d.value) };
                const maxHumidityProcessed = { dates: maxHumidity.map(d => d.date), values: maxHumidity.map(d => d.value) };
                const medianTemperatureProcessed = { dates: medianTemperature.map(d => d.date), values: medianTemperature.map(d => d.value) };

                updateHumidityAndTemperatureGraph(minHumidityProcessed, maxHumidityProcessed, medianTemperatureProcessed);
            })
            .catch(error => console.error('Error fetching HISTORICAL TEMPERATURE/HUMIDITY data:', error));
    })
    .catch(error => console.error('Error fetching token:', error));
}

// Initial fetch when the page loads
fetchData();