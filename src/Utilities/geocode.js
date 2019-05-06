const request = require("request");

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1IjoibWFuaTk0IiwiYSI6ImNqdXpscmVlZTBiNjQ0NG9hZnZtYXFzM2wifQ.gZsat9BZ7zfB8W7pKuKfBQ"
    request({url:url, json: true},(error,response)=>{
        if(error){
            callback("Unable to connect to link",undefined);
        }
        else if(response.body.message){
            callback("Invalid data or token",undefined);
        }
        else if(response.body.features.length === 0){
            callback("Location not found. Please enter new location.",undefined);
        }
        else{
            const {features} = response.body;
            callback(undefined,{
                longitute: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports=geocode;