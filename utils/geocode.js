const request = require('request')

const geocode=(adresse,callback)=>{
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adresse)+'.json?access_token=pk.eyJ1IjoiamowMzA5IiwiYSI6ImNrNTVxN2N2YzA4enMzbXFyamdjY2cwMHQifQ.jSB48M8sjjsty9xq_o284A'
    let data = []
    request({url:mapBoxUrl,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location service')
        }
        else if(body.error){
            callback('unable to find location');
        }
        else if(body.features.length === 0){
            callback('no result found')
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[0],
                attitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = {
    geocode:geocode
}