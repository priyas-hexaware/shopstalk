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
//var bookingHistory=[];
//var cardResponse=[];
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
    var txt_1 = "Dear alex!! What can I do for You"
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
    var zipcode1;

    var zipcode =request.body.queryResult.parameters["zipcode"];
    zipcode1 == ( /(^\d{5}$)|(^\d{5}-\d{4}$)/.test("90210"))
    if (zipcode1 == true)
    {
      var res ="zipcode is valid.press yes to continue"
    }
    else
    {
      var res ="zipcode invalid"
    }
    var responseJson1 ={

    }
    responseJson1.fulfillmentText=res; 
    response.send(responseJson1);
  }
    
else if(intent =='shopdisplay'){
    var responseJson3 ={

    }
    responseJson3.fulfillmentMessages=[{
          "platform": "ACTIONS_ON_GOOGLE",
          "basicCard": {
            "title": "test1",
            "subtitle": "test2",
            "formattedText": "map",
            "image": {
              "imageUri": "https://images.news18.com/ibnlive/uploads/2019/05/Google-Maps.jpg?impolicy=website&width=536&height=356",
              "accessibilityText": "map image"
            },
            "buttons": [
              {
                "title": "click here",
                "openUriAction": {
                  "uri": "http://maps.google.co.in"
                }
              }
            ]
          }
        },
        {
          "text": {
            "text": [
              ""
            ]
          }
        }
      ]
      response.send(responseJson3);
    }

    //var rt=request.body.queryResult.parameters["roomtype"];
    //var date =request.body.queryResult.parameters["date"];
    //var formattedDate = moment(date).format('DD-MM-YYYY');
    //var final = "bookingId:"+random_num+"\n"+"roomaccomdation:"+ra+"\n"+"roomtype:"+rt+"\n"+"bookingdate:"+formattedDate+"\n"
 
    //bookingHistory.push({
       // bookingId : random_num,
        //roomaccomdation : ra,
        //roomtype: rt,
        //bookingdate : date,
        //class : "Booked"
    //})

    
    // bookingHistory.push(final);
    //logger.info(bookingHistory);
  //responseJson1.fulfillmentMessages=[{
    //"card": {
      //  "title": result,
        //"subtitle": rt,
        //"imageUri": "https://lumiere-a.akamaihd.net/v1/images/rich_mobile_thejunglebook_header_poststreet_46b1223f.jpeg?region=0,0,640,600",
        //"buttons": [
         // {
         //   "text": "book"
         // }
        //]
     // },
      //"platform": "FACEBOOK"

//}]

//}
//else if(intent == 'orderHistory') {
   // var responseJson2 ={

    //}
    //logger.info(bookingHistory)
    //bookingHistory.forEach(element => { 
    
       // var singleCard={
            // "card": {
              //   "title": "",
                // "subtitle": "",
                // "imageUri": "",
                 //"buttons": [
                  // {
                     //"text": ""
                   //}
                 //]
               //},
               //"platform": "FACEBOOK"
         //} 
     //singleCard.card.title = element.bookingId;
     //singleCard.card.subtitle = element.roomtype;
     //singleCard.card.buttons[0].text = element.class;
     //singleCard.card.imageUri = "https://setupmyhotel.com/images/Room-Type-Single-Room.jpg";
     //cardResponse.push(singleCard);
 
 
     //})
     //responseJson2.fulfillmentMessages = cardResponse;
     //console.log("Response to User", JSON.stringify(responseJson2));
      //response.send(responseJson2);
//}
//else if(intent =='Default Fallback Intent')
//{
   // var responseJson4={

    //} 
    //responseJson4.fulfillmentMessages=  [
      //  {
        //  "quickReplies": {
          //  "title": "sorry!!!i din't get you",
            //"quickReplies": [
              //"wanna book a room?",
              //"book a room?",
              //"need a room?"
            //]
          //},
          //"platform": "FACEBOOK"
        //}
      //]
//}
    
}); 
app.listen(process.env.PORT || 8080, function () {
    console.log("server is listening to port 8080");
});