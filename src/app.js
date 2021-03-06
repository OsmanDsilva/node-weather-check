const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Osman'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Osman'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'Hey Google, HELP!',
        title: 'Help',
        name: 'Osman'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send({
            error: 'You must provide address'
        })
    
    geocode(req.query.address,(error,data)=>{
        if(error)
            return res.send({
                error
            })
        forecast(data.latitude,data.longitude,(error, forecastData)=>{
            if(error)
            return res.send({
                error
            })  
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })  
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
        return res.send({
            error: 'You must provide search term'
        })
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Osman',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Osman',
        errorMessage: 'Page not found.'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port 3000.')
})