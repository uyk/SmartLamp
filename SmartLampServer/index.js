
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var fs = require('fs');

var app = express();
var port = 3000;

var isData = false;
var empty = "empty";
var longtext = "";

var client_id = 'fa5RCa6jbNzwl9FnkdKj';
var client_secret = 'Xdfz2Cg1kr';
var optionsTTS = {
    url: "https://openapi.naver.com/v1/voice/tts.bin",
    form: {'speaker':'mijin', 'speed':'0', 'text':''},
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
};

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));

app.get('/', function (req,res) {
    console.log('app.get "/" ');
    res.send("Smart Lamp Server");
});

//파이로부터 1초마다 호출됨
app.get('/smartLamp', function(req,res) {
    if(isData) {
        isData = false;     //한번 데이터 출력한 후 초기화
        res.send(longtext);
    }
    else {
        res.send(empty);
    }
});

app.post('/facebook', function(req,res) {
    var from = req.body.from;
    var myMessage = req.body.myMessage;
    var updateAt = req.body.updateAt;

    longtext = "페이스북에" + req.body.from + "님이" + req.body.myMessage + "라고 게시했습니다.";
    console.log(longtext);

    optionsTTS.form.text = longtext;
    var writeStream = fs.createWriteStream('./public/tts1.mp3');
    var _req = request.post(optionsTTS).on('response', function(response) {
        console.log(response.statusCode) ;// 200
        console.log(response.headers['content-type'])
    });
    _req.pipe(writeStream); // file로 출력

    isData = true;
    res.send("Success");
});

app.listen(port, function () {
    console.log('Smart Lamp Server app listening on port ' + port);
});