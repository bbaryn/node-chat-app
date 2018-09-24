const expect = require('expect');

const {isRealString} =  require('./validation');

describe('isRealString', () => {
  it('should reject non-string value', () => {
    const string = 123;
    const message = isRealString(string);

    expect(message).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    const string = '      ';
    const message = isRealString(string);

    expect(message).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    const string = '  Bart   ';
    const message = isRealString(string);

    expect(message).toBeTruthy();
  });
});
