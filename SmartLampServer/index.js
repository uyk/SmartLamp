
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

var isData = false;
var empty = "empty";
var longtext = "";

app.use(bodyParser.urlencoded({extended : false}));

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

    isData = true;
    res.send("Success");
});

app.listen(port, function () {
    console.log('Smart Lamp Server app listening on port ' + port);
});