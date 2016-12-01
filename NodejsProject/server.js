/**
 * Created by admin on 2016-11-06.
 */

var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;
var request = require ('request');

app.use(bodyParser.urlencoded({extended : false}));
//app.use(bodyParser.json());

var piIP = "http://218.150.183.144:5000";

var option = {
    //uri : "http://218.150.183.150:3000/error",
    uri : piIP + "/error",
    //port : 5000,
    //path : "/error",
    method : "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    form : {
    }
};


app.get('/', function (req,res) {
    console.log('app.get');
    res.send('abc');
});
app.get('/get', function (req,res) {
    console.log('app.get /get');
    console.log('end of get');
    res.send('get');
});
app.post('/test', function(req,res) {
    var from = req.body.from;
    var myMessage = req.body.myMessage;
    var updateAt = req.body.updateAt;
    console.log('from : ', from );
    console.log('myMessage : ', myMessage );
    console.log('update at : ', updateAt );
    console.log('test post');
    
    //option.path = "/facebook";
    option.uri = piIP + "/facebook";
    
    option.form = {
        postfrom : from,
        postmyMessage : myMessage,
        postupdateAt : updateAt
    };
    
    request.post(option, function (err, res, body) {
        console.log(body);
    });
    
    res.send("Success");
});
/*
app.post('/facebook', function(req,res) {
    console.log('/post');
    var newfrom = req.body.postfrom;
    var newmyMessage = req.body.postmyMessage;
    var newupdateAt = req.body.postupdateAt;
    console.log('from : ', newfrom );
    console.log('myMessage : ', newmyMessage );
    console.log('update at : ', newupdateAt );
    
    res.send("Success from /facebook");
});

app.post('/error', function(req,res) {
    console.log('/error');
    res.send("error from /post");
});
*/

http.createServer(app).listen(port,function () {
    console.log('createServer');
});
