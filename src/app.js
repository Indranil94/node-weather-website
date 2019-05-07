const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./Utilities/geocode');
const getWeather = require("./Utilities/getWeather");

const dir = path.join(__dirname,'../public');
const viewdir = path.join(__dirname,'../templates/views');
const partialdir = path.join(__dirname,'../templates/partials')

const port = process.env.PORT||3000;

const app = express();

app.use(express.static(dir));

app.set('view engine', 'hbs');
app.set('views',viewdir);
hbs.registerPartials(partialdir);


app.get("",(req,res)=>{
    res.render('index',{
        title: "Weather",
        name:"Indranil",
        age: 27
    });
});

app.get("/about",(req,res)=>{
    res.render('about',{
        title: "About",
        name: "Indranil",
        page: "Site description"
    });
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title: "Help",
        type: "dynamic",
        name: "Indranil",
        topic: "Handlebars"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.status(200).json({
            error: "Please provide an address."
        });
    }
    geocode(req.query.address,(error,resp)=>{
        if(error){
            return res.status(200).json({
                error: error
            })
        }
        else{
            getWeather(resp,(error,data)=>{
                if(error){
                    return res.status(200).json({
                        error: error
                    })
                }
                else{
                    data.location = resp.location;
                    res.json(data);
                }   
            })
        }
    })
    
})

app.get("/help/*",(req,res)=>{
    res.render("error",{
        title: "No Help found",
        name: "Indranil"
    })
})

app.get("*",(req,res)=>{
    res.render("error",{
        title: "Error 404. Page not found",
        name: "Indranil"
    })
})

app.listen(port,()=>{
    console.log("Server up and running");
})
