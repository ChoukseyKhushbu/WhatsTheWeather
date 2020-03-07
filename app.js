const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  // console.log("post request is received.");
  const query = req.body.cityName;
  const apiKey ="7c661b9b49651345635bea2aae88b8ff";
  const unit=req.body.unitName;
  
  let unitShown;
  if(unit=="imperial"){
    unitShown="Fahrenheit";
  }else if(unit=="metric"){
    unitShown="Celsius";
  }
  // console.log(unit);
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
  https.get(url,function(response){
      response.on("data",function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

          res.write("<h1>The temperature in "+ query+" is "+ temp + " degrees "+unitShown+"</h1>");
          res.write("<h3>The weather is currently "+ weatherDescription +"</h3>");
          res.write("<img src="+imageURL+">");
          // res.write()
          res.send();
        })
      })
})

app.listen(3000,function(){
  console.log("Started listening at port 3000.");
})
