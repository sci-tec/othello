var http = require('http');
// var fs = require('fs');
// var querystring = require('querystring');
var url = require('url');
var Pusher = require('pusher');
 
var server = http.createServer(function(req, res) {
	if (req.url.indexOf('/sender?') == 0 && req.method === 'GET') {
	    var data = url.parse(req.url,true).query;
        send(data)
	} else {
	    res.statusCode = 404;
	    res.end('NotFound');
	}
});

function send(data) {
    console.log(data);
    var pusher = new Pusher({
        appId: '906718',
        key: 'ac2b1faa8b9a8094de41',
        secret: 'd078b9ab01a564abf58f',
        cluster: 'ap3',
        encrypted: true
    });
    
    pusher.trigger(data["tableId"], data["type"], data);
}

// ポート指定でlocalhostを起動
server.listen(28887);
