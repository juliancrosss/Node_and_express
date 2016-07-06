/*
Serving static resources with Node is suitable for developent and small
projects, but for larger projects, you will probably want to use a proxy
server such as Nginx or a CDN to serve static resources.
*/
var http = require('http');
var fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode){
	if(!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err, data){
		if(err){
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 - Internal Error');
		}else{
			res.writeHead(responseCode, { 'Content-Type': contentType });
			res.end(data);
		}
	});
}

http.createServer(function(req, res){
	// normalize url by removing querystring, optional
	// trailing slash, and making lowercase
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	switch(path){
		case '':
			serveStaticFile(res, '/public/home.html', 'text/html');
			break;
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');
			break;
		case '/img/sprite.png':
			serveStaticFile(res, '/public/img/sprite.png', 'image/png');
			break;
		default:
			serveStaticFile(res, '/public/404.html', 'text/html', 404);
			break;
	}
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
