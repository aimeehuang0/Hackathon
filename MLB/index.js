var path = require('path');
var express = require('express');
var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var dataset = [];

app.use(express.static('img'));
app.use(express.static(path.join(__dirname,'public')));


app.get('/', function(req, res){
  res.sendfile('index.html');
  // res.sendfile('index.js');
});


io.on('connection', function(socket){
  console.log('a user connectd');
  socket.on('sub',function(d){
  	dataset.push(d);
  	fs.writeFileSync('public/dataset.json',JSON.stringify(dataset),'utf8');
	console.log(dataset);
});

socket.on("landing",function(d){
  	console.log(d);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
