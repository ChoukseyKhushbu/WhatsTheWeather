const express = require('express');
const https = require('https');
const app = express();

app.get("/",function(req,res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=7c661b9b49651345635bea2aae88b8ff";
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<h1>The temperature in London is "+ temp + " degrees celsius</h1>");
      res.write("<p>"+ weatherDescription +"</p>");
      res.write("<img src="+imageURL+">");
      // res.write()
      res.send();
    })
  })
})

app.listen(3000,function(){
  console.log("Started listening at port 3000.");
})
