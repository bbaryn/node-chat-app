const socket = io();

socket.on('updateRoomList', (rooms) => {
  rooms.forEach((room) => {
    $('#active-rooms').append(`<option value ="${room}">${room}</option>`);
  });
});

const fillField = (e) => {
  document.getElementById('input_text').value = e.target.value
}
