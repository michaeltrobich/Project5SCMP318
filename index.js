var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

/*var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
  var url = req.url;
  // If no path, get the index.html
  if (url == "/") url = "/index.html";
  // get the file extension (needed for Content-Type)
  var ext = url.split('.').pop();
  console.log(url + "  :  " + ext);
  // convert file type to correct Content-Type
  var memeType = 'html'; // default
  switch (ext) {
    case 'css':
      memeType = 'css';
      break;
    case 'png':
      memeType = 'png';
      break;
    case 'jpg':
      memeType = 'jpeg';
      break;
  }
  // Send the requested file
  fs.readFile('.' + url, 'utf-8', function(error, content) {
    res.writeHead(200, {
      "Content-Type": "text/" + memeType
    });
    res.end(content);
  });
});

console.log("Loaded index file");

// Loading socket.io
var io = require('socket.io').listen(server);*/

io.on('connection', function(socket) {
  console.log("A user connected");
  socket.on('disconnect', function() {
    console.log("A user disconnected");
  });
  /*socket.on('position', function(pos) {
    console.log("Platform position: " + pos.top +
                pos.left + pos.right + pos.bottom);
  });*/

  socket.on('test', function(d) {
    //console.log("Test clicked at: " + d);
    io.emit('test', d);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//server.listen(8090);
