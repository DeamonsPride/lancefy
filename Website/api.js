// Retrieve the device value from localStorage if available
var device = localStorage.getItem('device') || '';

function station(name) {
    if (name === 'avenijazaggzc01') {
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
fetch('http://193.122.14.71:8085/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "username": "admin@esclone.com", 
        "password": "82aTiLGM&"
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
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=stationName`, {
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
            .catch(error => console.error('Error fetching data:', error));

        //LOCATION FETCH
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=station_location`, {
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
            })
            .catch(error => console.error('Error fetching data:', error));

        //TEMPERATURE FETCH
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=temperature`, {
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
            .catch(error => console.error('Error fetching data:', error));


        //PRESSURE FETCH
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=pressure`, {
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
            .catch(error => console.error('Error fetching data:', error));


        //LUX FETCH
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=luxLevel`, {
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
            .catch(error => console.error('Error fetching data:', error));

        //HISTORICAL LUX FETCH
        fetch(`https://dash.esclone.com:443/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=luxLevel&startTs=${DstartTs}&endTs=${DendTs}&intervalType=MILLISECONDS&interval=3600000&timeZone=GMT%2B02%3A00&limit=100&agg=AVG&orderBy=ASC`, {
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
            .catch(error => console.error('Error fetching data:', error));


        //HUMIDITY FETCH
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=humidity`, {
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
        .catch(error => console.error('Error fetching data:', error));


        //UV INDEX FETCH
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=uvIndex`, {
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
            .catch(error => console.error('Error fetching data:', error));


        //HEAT INDEX FETCH
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=heatIndex`, {
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
            .catch(error => console.error('Error fetching data:', error));


        //ABSOLUTE HUMIDITY FETCH
        fetch(`http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=absHum`, {
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
            .catch(error => console.error('Error fetching data:', error));

        //HISTORICAL ABSOLUTE HUMIDITY FETCH
        fetch(`https://dash.esclone.com:443/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=absHum&startTs=${startTs}&endTs=${endTs}&intervalType=MILLISECONDS&interval=86400000&timeZone=GMT%2B02%3A00&limit=100&agg=AVG&orderBy=ASC`, {
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
            .catch(error => console.error('Error fetching data:', error));


        //HISTORICAL TEMPERATURE/HUMIDITY FETCH
        function processApiResponse(apiResponse, key) {
            return apiResponse[key].map(item => ({
                date: new Date(item.ts).toLocaleDateString(),
                value: item.value
            }));
        }
        const humidityMinFetch = fetch(`https://dash.esclone.com:443/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=humidity&startTs=${startTs}&endTs=${endTs}&interval=86400000&agg=MIN&limit=30&orderBy=ASC`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        });

        const humidityMaxFetch = fetch(`https://dash.esclone.com:443/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=humidity&startTs=${startTs}&endTs=${endTs}&interval=86400000&agg=MAX&limit=30&orderBy=ASC`, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        });

        const temperatureAvgFetch = fetch(`https://dash.esclone.com:443/api/plugins/telemetry/DEVICE/${device}/values/timeseries?keys=temperature&startTs=${startTs}&endTs=${endTs}&interval=86400000&agg=AVG&limit=30&orderBy=ASC`, {
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
            .catch(error => console.error('Error fetching data:', error));
    })
    .catch(error => console.error('Error fetching token:', error));
}

// Initial fetch when the page loads
fetchData();