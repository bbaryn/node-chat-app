var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  const time = moment(message.createdAt).format('HH:mm');
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: time
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
  const time = moment(message.createdAt).format('HH:mm');
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: time
  });

  $('#messages').append(html);
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
