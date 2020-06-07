var express = require("express");
var fs = require('fs');
var requestAPI = require("request");
var app = express();
var log4js = require("log4js");
const logger=log4js.getLogger();
logger.level="info";
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const moment = require('moment');

app.get("/", function (request, response) {
    response.send("your page works");
});
app.post("/perDetail", function (request, response) {
    console.log("the request param", request.body);
    var newArr = {
        name : request.body.name,
        role : request.body.role
    }

    let options = {
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
        body: null
    }
    getData(options).then((data) => {
     var a = data;
     //var c = a.concat(newArr);
      // console.log(c);
     fs.writeFile('file.txt',a,function(err){
         if(err){
             throw err;
         }
         console.log("file created successfully");
     })       
        response.send(c);
    })
});
app.post("/remArr", function (request, response) {
    console.log("the request param", request.body);

    let options = {
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
        body: null
    }
    getData(options).then((data) => {
        // var x = length.data
        var n = request.body.input;
        // console.log(JSON.parse(body))
       // var a = JSON.parse(body).splice(0,n-1);
       // var b = JSON.parse(body).splice(n,x);
       // var c = a.concat(b)
          //  console.log("the result is",c);
         data.splice(n,1);
       response.send(data);
    })
});
function getData (options) {
    return new Promise(function (resolve, reject) {
        requestAPI(options, function (error, response,body) {
            console.log(typeof JSON.parse(body))
            var data = JSON.parse(body);
           resolve(data);

        });
    });
}
app.post("/changeName", function (request, response) {
    console.log("the request param", request.body);
    var element = request.body.name;
    var modifiedname = element.replace(/^\s+|\s+$/g, "");
    console.log("Output:", modifiedname);
    var data = {
        result: modifiedname
    }
    response.send(data);
});
var final
var searchHistory=[];
var cardResponse=[];
app.post("/fulfillment",function(request, response){
    const intent = request.body.queryResult.intent.displayName;
    logger.info("the request param", JSON.stringify(intent));
    if(intent == 'Default Welcome Intent'){
        var today = new Date(); 
        var hours = today.getHours(); 
        var greeting = "";  
        if(hours>=1 && hours<=12){
            greeting = "Good Morning";
        } else if(hours>=12 && hours<=16){
            greeting = "Good Afternoon";
        } else if(hours>=16 && hours<=21){
            greeting = "Good Evening";
        } else if(hours>=21 && hours<=24){
            greeting = "Good Night";
        }
    
    var responseJson ={

    }
    var txt_1 = "Alex!! What can I do for You"
    var txt = greeting.concat(' '+txt_1);
    responseJson.fulfillmentText= txt;
    
    response.send(responseJson)

//} else if(intent =='RoomBooking'){
  // var responseJson4={

   //} 
   //responseJson4.fulfillmentMessages=[
    //{
      //"quickReplies": {
        //"title": "do you want me to show some rooms?",
        //"quickReplies": [
          //"yes",
          //"no"
        //]
      //},
      //"platform": "FACEBOOK"
    //},
    //{
      //"text": {
        //"text": [
          //""
        //]
      //}
    //}
  //]
  //response.send(responseJson4);
}
else if(intent == 'pincode validation')
 { 
    logger.info( JSON.stringify((request.body)));


    var zipcode =request.body.queryResult.parameters["zipcode"];
    var zipcode1=90210
    //zipcode1 == ( /(^\d{5}$)|(^\d{5}-\d{4}$)/.test("90210"))
    if (zipcode == zipcode1)
    {
      var res ="Zipcode is valid. Press yes to continue"
    }
    else
    {
      var res ="Zipcode invalid. PLEASE ENTER PROPER ZIPCODE!!"
    }
    var date = request.body.date
    var formattedDate=moment(date).format('DD-MM-YYYY');
    searchHistory.push({
      Zipcode : zipcode,
      date:formattedDate,
      class : "searched",
      formattedtext:"map",
      accessibilitytext:"mapimage"
  })

    
    var responseJson1 ={

    }
    responseJson1.fulfillmentText=res; 
    response.send(responseJson1);
 }
    
else if(intent =='shopdisplay'){
    var responseJson3 ={

    }
    responseJson3.fulfillmentMessages= [
      {
        "platform": "ACTIONS_ON_GOOGLE",
        "simpleResponses": {
          "simpleResponses": [
            {
              "textToSpeech": "You can search for shops near you location here"
            }
          ]
        }
      },
      {
        "platform": "ACTIONS_ON_GOOGLE",
        "basicCard": {
          "title": "90210",
          "subtitle": "08-06-2020",
          "formattedText": "map",
          "image": {
            "imageUri": "https://images.news18.com/ibnlive/uploads/2019/05/Google-Maps.jpg?impolicy=website&width=536&height=356",
            "accessibilityText": "map image"
          },
          "buttons": [
            {
              "title": "searched",
              "openUriAction": {
                "uri": "http://maps.google.co.in"
              }
            }
          ]
        }
      },
    ]
      response.send(responseJson3);
  

}
else if(intent == 'searchhistory') {
    var responseJson4 ={

    }
    logger.info(searchHistory)
    searchHistory.forEach(element => { 
        var singleCard={
   "platform": "ACTIONS_ON_GOOGLE",
          
          "basicCard": {
            "title": "",
            "subtitle": "",
            "formattedText": "",
            "image": {
              "imageUri": "",
              "accessibilityText": ""
            },
            "buttons": [
              {
                "title": "",
                "openUriAction": {
                  "uri": ""
                }
              }
            ]
          }
        }
      
        singleCard.basicCard.title = element.Zipcode ;
        singleCard.basicCard.subtitle = element.date;
        singleCard.basicCard.formattedText = element.formattedtext;
        singleCard.basicCard.image.imageUri = "https://images.news18.com/ibnlive/uploads/2019/05/Google-Maps.jpg?impolicy=website&width=536&height=356";
        singleCard.basicCard.image.accessibilityText = element.accessibilitytext;
        singleCard.basicCard.buttons[0].title= element.class;
        singleCard.basicCard.buttons[0].openUriAction.uri= "http://maps.google.co.in"
        
        cardResponse.push(singleCard);
         //final = "searchedzipcode:"+element.Zipcode+"\n"+"searcheddate:"+element.date+"\n"
    
    
        })
        responseJson4.fulfillmentMessages = cardResponse;
        console.log("Response to User", JSON.stringify(responseJson4));
         response.send(responseJson4);
   }
else if(intent =='Default Fallback Intent')
{
    var responseJson5={

    } 
    responseJson5.fulfillmentMessages= [
      {
        "platform": "ACTIONS_ON_GOOGLE",
        "simpleResponses": {
          "simpleResponses": [
            {
              "textToSpeech": "Enter proper zipcode!"
            }
          ]
        }
      }
    ]
}
    
}); 
app.listen(process.env.PORT || 8080, function () {
    console.log("server is listening to port 8080");
});