var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  const li = $('<li></li>');
  const a = $('<a target="_blank">Current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
  e.preventDefault();
  const messageTxt = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTxt.val()
  }, () => {//callback from socket.on createMessage
    messageTxt.val('');
  });
});

const locationBtn = $('#location');
locationBtn.on('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition((position) => {
    locationBtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMsg', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationBtn.removeAttr('disabled').text('Send location');
    alert('Unable to featch you location');
  });
});
