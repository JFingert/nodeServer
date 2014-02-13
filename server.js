var http = require('http');
var url  = require('url');
var fs   = require('fs');
var mime = require('mime');

var server = http.createServer(function (request, response){
	var parsedUrl = url.parse(request.url, true);
	var filePath = parsedUrl.pathname;
	var params = parsedUrl.query;

	if (filePath === '/api') {
		if (params.command === 'add' && params.a && params.b) {
			response.write('' + parseInt(params.a, 10) + parseInt(params.b, 10));
		}
	} else {

		if (filePath === '/'){
			filePath = '/index.html';
		}
		fs.readFile('public_html' + filePath, function(err, data) {
			if (err) {
				response.statusCode = 404;
				response.write(err.toString());
				response.end();
			} else {
			response.setHeader('Content-Type', mime.lookup(filePath));
			response.write(data);
			response.end();
			}
		});
	}
});

server.listen(1357);