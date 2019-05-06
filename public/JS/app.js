const searched = document.getElementById('searchbar');
const button = document.querySelector('button');
const result = document.querySelector('#result');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    const url = "http://localhost:3000/weather?address="+searched.value;
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{
        console.log(data);
        if(data.temperature){
            result.textContent = "The current temperature is "+data.temperature+" 'F. The probability of precipitation is "+data.precipProbability+".";
            result.style.fontSize = "2em";
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



