const { response } = require("express");
const express = require("express");
const router = express.Router();
const https = require("https");


router.get("/",(req,res)=>{
    let city = req.query.city;
    let unit = req.query.unit;
    let key = process.env.WEATHERAPI;
    let apiUnits;

    if(unit === "Kelvin"){
        apiUnits = "standard";
    }else if(unit === "Fahrenheit"){
        apiUnits = "imperial";
    }else if(unit === "Celsius"){
        apiUnits = "metric";
    }

    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+apiUnits+"&appid="+key;

    https.get(url,(response)=>{
        response.on('data',(d)=>{
            res.write(d);

            let data = JSON.parse(d)

            const {lat,lon} = data.coord;


            let newUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units="+apiUnits+"&exclude=current,minutely,hourly,alerts&appid="+key;
            
            https.get(newUrl,(newResponse)=>{
                
                newResponse.on('data',(newd)=>{
                    console.log(data);
                    res.write(newd);
                    res.send();
                });


            });

        });
        
    });

    

});


module.exports = router
