const request = require('request') //postman-request can also be used. 

const forecast = (latitude, longitude, callback)=>{
    // www.weatherstack.com
const url = 'http://api.weatherstack.com/current?access_key=6e424db23a620d72fe1ca41e818a5d2b&query='+latitude+','+longitude+'&units=m'

request( {url, json : true}, (error, {body})=>{
    if(error)
    {
        callback('Unable to connect to weather service!', undefined)
    }
    else if(body.error)
    {
        callback('Unable to find location',undefined)
    }
    else {
        //console.log(response.body.current)
        callback(undefined, { output : "Today's weather is prediction is  "+ body.current.weather_descriptions[0] + ". The temperature is "+body.current.temperature+ " degrees. It Feels like " +body.current.feelslike+ " degrees outside."
            
            // weather_descriptions : body.current.weather_descriptions[0],
            // temperature: body.current.temperature,
            // feelslike : body.current.feelslike 

            
        })
    }
} )
}

module.exports = forecast