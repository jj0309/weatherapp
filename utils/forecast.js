const request = require('request')
const forecast=(lattitude,attitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/23377eace3094c586f1d3a08661cb4f8/'+encodeURIComponent(attitude)+','+encodeURIComponent(lattitude)+'?units=si';
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location service')
        }
        else if(body.error){
            callback('unable to find location');
        }else{
            callback(undefined,{
                temperature: body.currently.temperature,
                summary: body.currently.summary,
                tempLow: body.daily.data[0].temperatureLow,
                tempHigh: body.daily.data[0].temperatureHigh,
            })
        }
    })
}

module.exports = {
    forecast:forecast
}