const express = require("express");
const ejs = require("ejs");
const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');


const dataRoute = require("./routes/weatherData");


app.use('/',dataRoute);

app.listen(8080,()=>{
    console.log("server started at 8080");
});