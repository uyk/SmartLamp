var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function (req,res) {
    console.log('app.get "/" ');
    res.send("Smart Lamp Server");
});

app.post('/facebook', function(req,res) {
    var from = req.body.from;
    var myMessage = req.body.myMessage;
    var updateAt = req.body.updateAt;

    console.log('from : ', from );
    console.log('myMessage : ', myMessage );
    console.log('update at : ', updateAt );
    console.log('facebook post');

    res.send("Success");
});

app.listen(port, function () {
    console.log('Smart Lamp Server app listening on port 3000!');
});