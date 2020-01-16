const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const location = search.value;

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                document.getElementById('atCity').innerHTML='Could not find the city, try again';
            }
            else{
                document.getElementById('atCity').innerHTML=data.location;
                document.getElementById('atN').innerHTML=data.attitude;
                document.getElementById('atL').innerHTML=data.latitude;
                document.getElementById('summary').innerHTML=data.summary;
                document.getElementById('temperature').innerHTML=data.temperature;
                document.getElementById('tempHigh').innerHTML=data.tempHigh;
                document.getElementById('tempLow').innerHTML=data.tempLow;
            }
        })
    })
})