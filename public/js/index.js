const socket = io();

socket.on('updateRoomList', (rooms) => {
  rooms.forEach((room) => {
    $('#active-rooms').append(`<option value ="${room}">${room}</option>`);
  });
});
