const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.emit('updateRoomList', users.getRoomsList());

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    params.room = params.room.toLowerCase();
    socket.join(params.room);
    const roomList = users.getUserList(params.room);
    users.removeUser(socket.id);

    if (params.room.includes(params.name)) {
      return callback('That name is already taken. Try another one.');
    }

    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMsg', (coords) => {
    const user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left room :(`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
