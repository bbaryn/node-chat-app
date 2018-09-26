var socket = io();

function scrollBottom () {
  const messages = $('#messages');
  const newMessage = messages.children('li:last-child');

  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', () => {
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  })
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  const time = moment(message.createdAt).format('HH:mm');
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: time
  });

  $('#messages').append(html);
  scrollBottom();
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
  scrollBottom();
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
