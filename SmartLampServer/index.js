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

app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function (req,res) {
    console.log('app.get "/" ');
    res.send('main');
});

app.get('/get', function (req,res) {
    console.log('app.get /get');
    res.send('get');
});

app.post('/facebook', function(req,res) {
    var from = req.body.from;
    var myMessage = req.body.myMessage;
    var updateAt = req.body.updateAt;

    longtext = "페이스북에" + req.body.from + "님이 " + req.body.myMessage + "라고 게시했습니다.";
    optionsTTS.form.text = longtext;

    console.log('from : ', from );
    console.log('myMessage : ', myMessage );
    console.log('update at : ', updateAt );
    console.log('facebook post');

    var writeStream = fs.createWriteStream('./tts1.mp3');
    var _req = request.post(optionsTTS).on('response', function(response) {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type'])
    });
    _req.pipe(writeStream); // file로 출력

   fs.readFile("tts1.mp3");

    res.send("Success");
});

app.listen(port, function () {
    console.log('http://218.150.183.150:3000/tts app listening on port 3000!');
});