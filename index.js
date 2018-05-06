var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  //res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/level1.html');
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
  //user 1 is red, user 2 is blue
  /*if (io.sockets.server.eio.clientsCount > 2) {
    //block all connections... somehow
    //STILL NEED TO WORK ON THIS
    socket.disconnect(0);
  }*/
  if (io.sockets.server.eio.clientsCount == 1) {
    socket.id = 'red';
    var id = socket.id;
  }
  else if (io.sockets.server.eio.clientsCount == 2) {
    socket.id = 'blue';
    var id = socket.id;
    io.emit('start', true);
  }
  else {
    socket.id = 'null';
    socket.emit('full', true);
    socket.disconnect(true);
  }
  console.log(socket.id + " user connected");
  console.log(io.sockets.server.eio.clientsCount + " users connected");

  // send user id (color) to client
  socket.emit('setColor', id);

  socket.on('disconnect', function() {
    console.log(socket.id + " user disconnected");
  });

  //LEVEL SYNCHRONIZATION
  socket.on('level', function(level) {
    io.emit('level', level);
    console.log("Level " + level);
  });

  socket.on('reset', function(x) {
    io.emit('reset', x);
    console.log("Level reset!");
  });

  //POSITION SYNCHRONIZATION
  socket.on('platform_pos', function(pos) {
    io.emit('platform_pos', pos);
  });

  socket.on('square_pos', function(data) {
    io.emit('square_pos', data);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

//server.listen(8090);
