const expect = require('expect');

const {generateMassage} =  require('./message');

describe('generateMassage', () => {
  it('should generate correct message object', () => {
    const from = 'Ola';
    const text = 'Hey';
    const message = generateMassage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  })
})
