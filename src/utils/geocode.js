const request = require('request')
//GeoCoding - Changing location in longitude and latitude values
//www.mapbox.com

const geocode = (address, callback)=>{
    const Geo_url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicHJhc2Fka2hhcmthbmRlIiwiYSI6ImNrdzRsODFvYTBpcHQyeG1leWk1cDZzbjgifQ.L2yU1OqvjiQHehY0ro_J7Q&limit=1'

    request({url: Geo_url, json : true}, (error, {body})=>{

        if (error){
            callback('Unable to connect to mapbox service!', undefined)
        }
        else if(body.message || body.features.length == 0){
            callback('Unable to find the longitude and latitude for mentioned location', undefined)
        }
        else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
                //console.log(latitude, longitude)
            })
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            //console.log(latitude, longitude)
        }
    })   
}


module.exports = geocode