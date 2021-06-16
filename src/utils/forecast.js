const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=2080c73340432b5a4197978591c28df1&query='+lat+','+long
    request({url:url,json:true},(error,response)=>{
        if(error)
            callback('Unable to connect to weather service!',undefined)
        else if(response.body.error)
            callback(response.body.error.info,undefined)
        else
            callback(undefined,response.body.current.weather_descriptions[0]+'. It is currently '+response.body.current.temperature+'°C but it feels like '+response.body.current.feelslike+'°C. The humidity is '+response.body.current.humidity+'%.'
            )
        })
}

module.exports = forecast