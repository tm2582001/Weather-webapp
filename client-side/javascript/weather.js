let id = (id)=> document.getElementById(id);
let classes = (classes)=> document.getElementsByClassName(classes);

let displayData = (weather)=>{
    console.log(weather);
}


window.addEventListener('load', ()=>{
    const params = (new URL(document.location)).searchParams;
    const city = params.get('city');
    const unit = params.get('unit');
    
    let time = new Date().toLocaleTimeString();

    if(city && unit){
        id("lastUpdated").innerHTML = "Last updated "+time;
        fetch("http://localhost:8080/weather?city="+city+"&unit="+unit)
        .then((res)=>res.json())
        .then(displayData)
        .catch(err=>{id("lastUpdated").innerHTML = "Something Went Wrong";});

    }else{
        console.log("here");
        id("lastUpdated").innerHTML = "Something Went Wrong";
    }
});