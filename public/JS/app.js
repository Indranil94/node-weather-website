const searched = document.getElementById('searchbar');
const button = document.querySelector('button');
const result = document.querySelector('#result');
const location_text = document.querySelector('#location');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    const url = "/weather?address="+searched.value;
    location_text.textContent = "Loading..."
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{

        if(data.temperature){
            location_text.textContent = "Location: "+data.location;
            result.textContent = "The current temperature is "+data.temperature+" 'F. The probability of precipitation is "+data.precipProbability+".";
            result.style.fontSize = "1.5em";
            result.style.color = "Blue";
            
        }
        else{
            throw data.error;
        }
        
    })
    .catch(err=>{
        result.textContent = err;
        result.style.fontSize = "2em";
        result.style.color = "Red";
    })
})



