//Callback abstraction  *********************************** 
const request22 = require('request')
const geoCoding =(address, callback)=>{
    const urlMapBox='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJyYWhhbWFsaSIsImEiOiJja2VmZmM2OWowdXkzMnVtbGg2NXoxY3UwIn0.W5nfDc7wvQXSw7PQgfBzzQ&limit=1'
   // request22({url:urlMapBox, json:true},(error, { body })=>{
        request22({url:urlMapBox, json:true},(error, response)=>{
        if(error){
            callback({connection:'Please check your internet connection: Unable to connect to location services'}, undefined)
        }else if(response.body.features.length===0){
        // }else if(body.features.length===0){
            callback({
                        locationNotFound:'Unable to find location. Try another search'
                    }, undefined)
        }else{
            callback(undefined,{   
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
                // longitude: body.features[0].center[0],
                // latitude: body.features[0].center[1],
                // location: body.features[0].place_name
            })
        }
    })
}
module.exports=geoCoding
