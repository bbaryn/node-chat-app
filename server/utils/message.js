const generateMassage = (from, text) => {
  let date = new Date();
  return {
    from,
    text,
    createdAt: "" + date.getHours() + ":" + date.getMinutes()
  }
};

module.exports = {generateMassage};
