const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public'));

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Routing using hbs
app.get('',(req, res)=>{
    res.render('index',{
        title: "weather app",
        name: "Babu"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: 'Babu'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Weather app help desk',
        name: 'Babu'
    })
})

//================================================================
//Routing Handlers
// app.get('',(req, res)=>{
//     res.send('<h1>You are on Home Page==> Hello Express!!!!</h1>');
// })
// app.get('/help', (req, res)=>{
//     res.send({
//         Name:'Babu',
//         Profession: 'Software Developer and Tester'
//     })
//     })
    
// app.get('/about', (req, res)=>{
//     res.send('<h1>About Page</h1>')
// })
//==================================================================
//Query string in URL
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            Error : 'You must provide an address'
        })
    }

    //ES6 default params and Object destructuring syntax
    geoCode(req.query.address,(error, {latitude,longitude,location} ={})=>{
        if(error){
            return res.send(error)
        }
            forecast(latitude,longitude,(error,dataForecast)=>{
                if(error){
                    return res.send({
                        Error: error
                    })
                }
                res.send({
                    forecast: dataForecast,
                    location,
                    address :req.query.address
                })
    })
})
})
    
// 404 Pages but URL partially matched
app.get('/about/*', (req, res) =>{
    // res.send('<h1>About article not found</h1>')
    res.render('404', {
        title:'404',
        errorMessage:'About article not found',
        name: 'Babu'
    })
})
// 404 Pages
app.get('*', (req, res) => {
    // res.send('<h1>Page not found</h1>')
    res.render('404',{
        title:'404',
        errorMessage: 'Page not found',
        name: 'Babu'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on Port 3000')
})