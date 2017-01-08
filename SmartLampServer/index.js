/**
 * Created by admin on 2017-01-08.
 */
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var request = require ('request');
var fs = require('fs');

var app = express();
var port = 3000;
var client_id = 'fa5RCa6jbNzwl9FnkdKj';
var client_secret = 'Xdfz2Cg1kr';

var longtext = "";

var optionsTTS = {
    url: "https://openapi.naver.com/v1/voice/tts.bin",
    form: {'speaker':'mijin', 'speed':'0', 'text':''},
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
};

var piIP = "http://218.150.183.144:5000";
var optionsPi = {
    uri : piIP + "/error",
    method : "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    form : {
    }
};

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));

app.get('/', function (req,res) {
    console.log('app.get "/" ');
});

//파이로부터 1초마다 호출
app.get('/smartLamp', function(req,res) {
    res.body = {
        flag : 1,
        colorR : 255,
        colorG : 255,
        colorB : 255
    }
    res.send("Test");
});

app.post('/facebook', function(req,res) {
    var from = req.body.from;
    var myMessage = req.body.myMessage;
    var updateAt = req.body.updateAt;

    optionsPi.uri = piIP + "/facebook";
    longtext = "페이스북에" + req.body.from + "님이 " + req.body.myMessage + "라고 게시했습니다.";
    optionsTTS.form.text = longtext;

    console.log('from : ', from );
    console.log('myMessage : ', myMessage );
    console.log('update at : ', updateAt );
    console.log('facebook post');

    var writeStream = fs.createWriteStream('./public/tts1.mp3');
    var _req = request.post(optionsTTS).on('response', function(response) {
        console.log(response.statusCode) ;// 200
        console.log(response.headers['content-type'])
    });
    _req.pipe(writeStream); // file로 출력

    res.send("Success");
});
app.listen(port, function () {
    console.log('http://218.150.183.150:3000/tts app listening on port 3000!');
});