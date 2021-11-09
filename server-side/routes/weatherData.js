const express = require("express");
const router = express.Router();
const https = require("https");


router.get("/", (req, res) => {
    let city = req.query.city;
    let unit = req.query.unit;
    let key = process.env.WEATHERAPI;
    let apiUnits;

    if (unit === "Kelvin") {
        apiUnits = "standard";
    } else if (unit === "Fahrenheit") {
        apiUnits = "imperial";
    } else if (unit === "Celsius") {
        apiUnits = "metric";
    }

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + apiUnits + "&appid=" + key;

    https.get(url, (response) => {

        if (response.statusCode == 200) {
            response.on('data', (d) => {
                let data = JSON.parse(d);

                // geathering important data
                const { weather, main, wind, visibility, sys } = data;

                // colecting data in on variable
                let finalData = {
                    weather: weather,
                    main: main,
                    visibility: visibility,
                    windSpeed: wind.speed,
                    country: sys.country,
                }

                finalData = JSON.stringify(finalData);
                res.send(finalData);

            });
        } else {
            res.status(400).json({ error: "Something went wrong!!!" });
        }
    });

});


module.exports = router
