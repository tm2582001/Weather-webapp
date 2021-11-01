require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine','ejs');

const dataRoute = require("./routes/weatherData");
const locationDataroute = require("./routes/locationData");

app.use('/',dataRoute);
app.use('/location',locationDataroute);


app.listen(8080,()=>{
    console.log("server started at 8080");
});