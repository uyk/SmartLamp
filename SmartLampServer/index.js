var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/', function (req,res) {
    console.log('app.get "/" ');
    res.send("Smart Lamp Server");
});

app.post('/facebook', function(req,res) {
    var from = req.body.from;
    var myMessage = req.body.myMessage;
    var updateAt = req.body.updateAt;

    longtext = "페이스북에" + req.body.from + "님이 " + req.body.myMessage + "라고 게시했습니다.";

    console.log('from : ', from );
    console.log('myMessage : ', myMessage );
    console.log('update at : ', updateAt );
    console.log('facebook post');

    res.send("Success");
});

app.listen(port, function () {
    console.log('Smart Lamp Server app listening on port 3000!');
});