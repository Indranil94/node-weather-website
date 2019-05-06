const request = require("request");

getWeather=({latitude,longitute}={},callback)=>{
    const url = "https://api.darksky.net/forecast/4221f72bdb4e739162c94978d04da026/"+latitude+","+longitute;
    request({url:url, json: true},(error,response)=>{
        
        if(error){
            callback("Unable to connect to link",undefined);
        }
        else if(response.body.error){
            callback("Invalid coordiantes",undefined);
        }
        else{
            const {temperature,precipProbability} = response.body.currently;
            callback(undefined,{
                temperature,
                precipProbability
            });
        }
    })
}

module.exports=getWeather;
