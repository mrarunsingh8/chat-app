var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var AppSocketController = require('./modules/app-socket-controller/app-socket-controller');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('SECRET_KEY_ENETER_HERE'));

const port = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // allow preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(logger('dev'));
app.use(cors());

app.get('/', function(req, res, next){
  return res.end('Api working');
});
app.get('/api', function(req, res, next){
  return res.end('Api working');
});

var io = require("socket.io").listen(app.listen(port));

io.sockets.on('connection', function (socket) {
  /*socket.on("auth", function () {
    AppSocketController.isAuthenticateUser(function (data) {
      io.emit("onAuth", data);
    }, function (error) {
      console.log("Error in Login", error);
    });
  });*/
  socket.on("getUserList", ()=>{
    AppSocketController.getUser((data)=>{
      io.emit('listenUserList', data);
    }, (error)=>{
      console.error("error Goes Here", error);
    });
  });

  socket.on("sendChat", function (data) {
    io.emit("onChatUpdate", data);
  });

});
