let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes); 

function GetCoordinate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(GetLocation);
      
    }
}

const GetLocation = (location) =>{
  id("city-load").style.display = "initial";
  const {latitude,longitude} = location.coords;

  fetch("http://localhost:8080/location?coords="+latitude+"+"+longitude)
  .catch( (err) => {id("city-load").style.display = "none";})
  .then((res)=>res.text())
  .then(cityName);
}

const cityName = (cityName) =>{
  id("text-area").setAttribute("value",cityName);
  id("city-load").style.display = "none";
}

window.addEventListener('load',()=>{
  GetCoordinate();
});

classes("input-button")[0].addEventListener('click', ()=>{
  id("submit-load").style.display = "initial";

  // test code
  id("form-section").style.display = "none";
  id("Weather-data-section").style.display = "block"
});