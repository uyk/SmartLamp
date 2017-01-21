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
var isData = false;
var color = "0,0,0";
var empty = "empty";

var optionsTTS = {
    url: "https://openapi.naver.com/v1/voice/tts.bin",
    form: {'speaker':'mijin', 'speed':'0', 'text':''},
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
};

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req,res) {
    console.log('app.get "/" ');
});

//파이로부터 1초마다 호출됨
app.get('/smartLamp', function(req,res) {
    if(isData) {
        isData = false;     //한번 데이터 출력한 후 초기화
        res.send(color);
    }
    else {
        res.send(empty);
    }
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

    var writeStream = fs.createWriteStream('./public/tts1.mp3');
    var _req = request.post(optionsTTS).on('response', function(response) {
        console.log(response.statusCode) ;// 200
        console.log(response.headers['content-type'])
    });
    _req.pipe(writeStream); // file로 출력

    isData = true;
    color = "155,155,155";
    res.send("Success");
});

var count = 1000;
app.get('/newfacebook',function(req,res) {
    var makerurl = "https://maker.ifttt.com/trigger/facebook/with/key/cS6GymDOL8f4QZM80nqejw?value1=";
    makerurl += count++;
    request(makerurl, function(error, response, body) {
       console.log(body);
    });
    res.send("newfacebook");
});
app.listen(port, function () {
    console.log('http://218.150.183.150:3000/tts app listening on port 3000!');
});