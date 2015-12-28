var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = (process.env.PORT || 5000);

server.listen(port);
app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

console.log("http server listening on %d", port);

app.get('/', function(request, response) {
	response.render('pages/index');
	console.log("You submit a get request ?");
});

app.post('/', function(request, response) {
	response.render('pages/index');
	console.log("You submit a post request ? : \n");
});

io.on('connection', function (socket) {
  socket.emit('response', "ping ?");
  socket.on('message', function (data) {
    io.sockets.emit('response', data);
  });
});