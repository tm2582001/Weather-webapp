window.addEventListener('load', ()=>{
    const params = (new URL(document.location)).searchParams;
    const city = params.get('city');
    const unit = params.get('unit');

    console.log(city);
    console.log(unit);
});