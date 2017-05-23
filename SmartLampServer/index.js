
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var fs = require('fs');

var app = express();
var port = 3000;

var isData_pi2 = false;
var isData_pi3 = false;
var empty = "empty";
var longtext = "";


var client_id = 'fa5RCa6jbNzwl9FnkdKj';
var client_secret = 'Xdfz2Cg1kr';
var optionsTTS = {
    url: "https://openapi.naver.com/v1/voice/tts.bin",
    form: {'speaker':'mijin', 'speed':'0', 'text':''},
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
};
/*
var options = {
    uri : "http://218.150.183.150:3000/tts1.mp3"
};
*/
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));

app.get('/', function (req,res) {
    console.log('app.get "/" ');
    fs.readFile('hello.html', function (err, data) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(data);
    });
    //res.send("Smart Lamp Server");
});

//파이2로부터 1초마다 호출됨
app.get('/pi2', function(req,res) {
    if(isData_pi2) {
        isData_pi2 = false;     //한번 데이터 출력한 후 초기화
        res.send(longtext);
    }
    else {
        res.send(empty);
    }
});

//파이3로부터 1초마다 호출됨
app.get('/pi3', function(req,res) {
    if(isData_pi3) {
        res.send(isData_pi3);
        isData_pi3 = false;     //한번 데이터 출력한 후 초기화
    }
    else {
        res.send(empty);
    }
});

app.post('/ifttt', function(req,res) {
    console.log(req.body);
    console.log(req.body.content);

    longtext =  req.body.content;
    optionsTTS.form.text = req.body.content;
    var writeStream = fs.createWriteStream('./public/tts1.mp3');
    var _req = request.post(optionsTTS).on('response', function(response) {
        console.log(response.statusCode) ;// 200
        console.log(response.headers['content-type'])
    });
    _req.pipe(writeStream); // file로 출력

    isData_pi2 = true;
    isData_pi3 = req.body.color;
    res.send("Success");
});

app.post('/voice', function (req, res) {
    console.log(req.body);
    switch (req.body.type) {
        case 'time' :
            var date = new Date();
            longtext = "현재 시간은 " + date.getHours() + "시 " + date.getMinutes() + "분 입니다.";
            //var writeStream = fs.createWriteStream('./public/time.mp3');
            break;
        case 'day' :
            var date = new Date();
            longtext = "오늘은 " + date.getMonth() + "월 " + date.getDate() + "일 입니다.";
            //var writeStream = fs.createWriteStream('./public/time.mp3');
            break;
        case 'facebook' :
            longtext = "페이스북에 게시하였습니다.";
            break;
    }
    optionsTTS.form.text = longtext;
    var writeStream = fs.createWriteStream('./public/tts1.mp3');
    var _req = request.post(optionsTTS).on('response', function(response) {
        console.log(response.statusCode) ;// 200
        console.log(response.headers['content-type'])
    });
    _req.pipe(writeStream); // file로 출력

    res.send("Success");
});

app.listen(port, function () {
    console.log('Smart Lamp Server app listening on port ' + port);
});


/*
 app.post('/facebook', function(req,res) {
 longtext = "페이스북에" + req.body.from + "님이" + req.body.myMessage + "라고 게시했습니다.";
 console.log(longtext);

 optionsTTS.form.text = longtext;
 var writeStream = fs.createWriteStream('./public/tts1.mp3');
 var _req = request.post(optionsTTS).on('response', function(response) {
 console.log(response.statusCode) ;// 200
 console.log(response.headers['content-type'])
 });
 _req.pipe(writeStream); // file로 출력

 isData_pi2 = true;
 isData_pi3 = "facebook";
 res.send("Success");
 });

 app.get("/aa", function (req,res) {
 var writeStream = fs.createWriteStream('./public/tts2.mp3');
 var _req = request.get(options).on('response', function(response) {
 console.log(response.statusCode) ;// 200
 console.log(response.headers['content-type'])
 });
 _req.pipe(writeStream); // file로 출력
 })
 */
