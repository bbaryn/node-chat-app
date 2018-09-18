var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'bart@example.com',
  //   text: 'Hey. I will.'
  // });

  socket.emit('createMessage', {
    from: 'bart',
    text: 'Hey. I\'m fine.'
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// socket.on('newEmail', (email) => {
//   console.log('New email', email);
// });

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
});
