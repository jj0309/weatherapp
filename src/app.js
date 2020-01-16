const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

const pubDir =path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(pubDir));

app.get('',(req,res)=>{
    res.render('index',{title:'Just another weather app',
                        creatorName: 'Kakau',
                        forecast:'Forecast',
                        location:'Location'});
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'Jj Specter',
                        creatorName: 'Kakau',
                        info: 'My first app in nodejs, a weather app.If you find any bug, send an email to PeterSuce@gmail.com. You can send me suggestions on how to improve the app at the very same email.'
                    });
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Another help page',
                        creatorName: 'Kakau'});
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'no city provided'
        });
    }
    let geoObj = {};
    geocode.geocode(req.query.address,(error,{attitude,latitude,location}={})=>{
        if(error === undefined){
            geoReturn={
                attitude:attitude,
                latitude:latitude,
                location:location
            }
            geoObj = geoReturn;
            let forecastObj={};
            forecast.forecast(geoObj.latitude,geoObj.attitude,(errorF,{summary,temperature,tempLow,tempHigh}={})=>{
                if(errorF === undefined){
                    forecastReturn={
                        summary:'Forecast: '+summary,
                        temperature:'Temperature in celcius: '+temperature,
                        tempHigh:'Temperature high today: '+tempHigh,
                        tempLow:'Temperature low today: '+tempLow,
                        attitude:'N: '+geoObj.attitude,
                        latitude:'L: '+geoObj.latitude,
                        location:'At: '+geoObj.location
                    };
                    forecastObj = forecastReturn;
                    return res.send(forecastObj);
                }
                else{
                    return res.send({errorF});
                }
            })
        }
        else{
            return res.send({error});
        }
    });
})

app.get('*',(req,res)=>{
    res.render('notFound',{title:'Error 404',
                            info:'The page you are looking for is in another castle.',
                            creatorName:'Kakau'});
})

app.listen(3000,()=>{
    console.log('server started on port 3k');
});