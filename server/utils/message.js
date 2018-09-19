const generateMessage = (from, text) => {
  const date = new Date();
  return {
    from,
    text,
    createdAt: "" + date.getHours() + ":" + date.getMinutes()
    // createdAt: new Date().getTime()
  }
};

const generateLocationMessage = (from, latitude, longitude) => {
  const date = new Date();
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude}, ${longitude}`,
    createdAt: "" + date.getHours() + ":" + date.getMinutes()
    // createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage, generateLocationMessage};
