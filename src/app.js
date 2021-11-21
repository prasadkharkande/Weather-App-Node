const path = require('path')
// const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name:'Prasad K'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Us',
        name:'Prasad K'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'Help! This is some helpful text.',
        title: 'Help',
        name : 'Prasad K'
    })
})

// app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req, res)=>{
//     res.send([{
//         name: 'Prasad',
//         age:23
//     }])
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About Us</h1>')
// })




app.get('/weather', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.search, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast (latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


//     res.send({
//         forecast: 'It is snowing',
//         location: 'India',
//         address : req.query.search
//     })
 })


app.get('/products',(req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})




app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404 help',
        name : 'Prasad K',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Prasad k',
        errorMessage : 'Page not found'
    })
})

//app.com
//app.com/help
//app.com/about
app.listen(3000, ()=>{
    console.log('server isup on port 3000')
})