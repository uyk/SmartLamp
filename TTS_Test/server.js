/**
 * Created by admin on 2017-01-08.
 */
// 네이버 음성합성 Open API 예제
var express = require('express');
var app = express();
var client_id = 'fa5RCa6jbNzwl9FnkdKj';
var client_secret = 'Xdfz2Cg1kr';
var fs = require('fs');
app.get('/tts', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/voice/tts.bin';
    var request = require('request');
    var options = {
        url: api_url,
        form: {'speaker':'mijin', 'speed':'0', 'text':'좋은 하루 되세요'},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    var writeStream = fs.createWriteStream('./tts.mp3');
    var _req = request.post(options).on('response', function(response) {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type'])
    });
    _req.pipe(writeStream); // file로 출력
    _req.pipe(res); // 브라우저로 출력
});
app.listen(3000, function () {
    console.log('http://218.150.183.150:3000/tts app listening on port 3000!');
});