var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var AppSocketController = require('./modules/app-socket-controller/app-socket-controller');
var jwt = require("jsonwebtoken");
var basicAuth = require('express-basic-auth');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('SECRET_KEY_ENETER_HERE'));

process.env.SECRET_KEY= "SECRETKEYFORCHATUSER";

const port = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
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
  socket.on("auth", function(data){
    AppSocketController.AuthenticateUser(data, function(resp){
      io.emit("onAuthenticate", resp);
    });
  });


  socket.on("getUserList", ()=>{
    AppSocketController.getUser((data)=>{
      io.emit('listenUserList', data);
    }, (error)=>{
      console.error("error Goes Here", error);
    });
  });

  socket.on("onSearchuser", (data)=>{
    AppSocketController.SearchUserByTerm(data).then((resData)=>{
      io.emit("listenUserSearch", {currentUser: data.token, responce: resData});
    });
  });

  socket.on("openUserChatRoom", (data)=>{
    AppSocketController.OpenUserChatRoom(data).then((respData)=>{
      io.emit("listenOpenChatBox", {token: data.currentUser , otherUser: data.otherUser, chatRoomId: respData});
    });
  });

  socket.on("loadChatRoom", (data)=>{
    AppSocketController.LoadChatRoom(data).then((respData)=>{
      io.emit("onChatUpdate", {chatRoomId: data.chatRoomId, token: data.currentUser, chatData: respData});
    });
  });

  socket.on("sendChat", function (data) {
    AppSocketController.SaveChat(data).then((resp)=>{
      if(resp.affectedRows){
        AppSocketController.LoadChatRoom(data).then((respData)=>{
          io.emit("onChatUpdate", {chatRoomId: data.chatRoomId, token: data.currentUser, chatData: respData});
        });
      }
    });
  });

  socket.on("logoutUser", (data)=>{  
    AppSocketController.logoutUser(data).then((resp)=>{
      io.emit("listenLogOutUser", data);
    });
  });

});
