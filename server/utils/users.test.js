const expect = require('expect');

const {Users} =  require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Blue'
    }, {
      id: '2',
      name: 'John',
      room: 'Red'
    }, {
      id: '3',
      name: 'Monica',
      room: 'Blue'
    }]
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Bartek',
      room: 'test'
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const userId = '1'
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const userId = '9'
    const user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const userId = '1'
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    const userId = '11'
    const user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  it('should return names for Blue room', () => {
    const userList = users.getUserList('Blue');

    expect(userList).toEqual(['Mike', 'Monica']);
  });

  it('should return names for Red room', () => {
    const userList = users.getUserList('Red');

    expect(userList).toEqual(['John']);
  });
});
