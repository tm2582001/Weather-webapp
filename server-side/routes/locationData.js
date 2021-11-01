const express = require("express");
const router = express.Router();
const https = require('https');

router.get("/", (req, res) => {
    let coords = req.query.coords;
    let key = process.env.LOCATIONAPI;
    let url = "https://api.opencagedata.com/geocode/v1/json?q=" + coords + "&key=" + key;


    https.get(url, (response) => {
        let result = '';
        response.on("data", (data) => {
            result += data;
        });

        // we need end because it is a large json data it requires time
        
        response.on('end', () => {
            let locationData = JSON.parse(result);
            let { city, state_district } = locationData.results[0].components;

            state_district = state_district.replace(" District", '');

            if (city) {
                res.send(city);
            } else if (state_district) {
                res.send(state_district);
            }
        });


    });

});

module.exports = router;