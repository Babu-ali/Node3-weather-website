//callback abstraction challenge***********
const request = require('request')
const forecast =(latitude,longitude,callback)=>{
    console.log(latitude,longitude)
    const url='http://api.weatherstack.com/current?access_key=2931d7f95489bc3d627df1a4a1eddec6&query='+encodeURIComponent(latitude)+' '+encodeURIComponent(longitude)//+'&units=f'
    request({url, json:true},(error, {body})=>{
        if(error){
            callback('weather==>Unable to connec to location services', undefined)
        }else if(body.error){
            callback('weather==>Unable to find location', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+ '. It is currently '+body.current.temperature +' degrees out. It feels like' +body.current.feelslike+ ' degrees out')
        }
    })
}
module.exports = forecast