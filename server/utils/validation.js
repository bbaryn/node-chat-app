const isRealString = (string) => {
  return typeof string === 'string' && string.trim().length > 0;
};

const isActive = (name, userArray) => {
    const activeUser = userArray.filter((user) => user.name === name)[0];
    return activeUser !== undefined ? true : false;
};



module.exports = {isRealString, isActive};
