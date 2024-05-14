fetch('http://193.122.14.71:8085/api/plugins/telemetry/DEVICE/41264160-fb47-11ee-9cc4-f58d0edc07e6/values/timeseries')
    .then(res => res.json())
    .then(data => console.log(data))