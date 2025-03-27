const { uppg1 } = require('../uppg1.js');

describe('uppg1', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    if (consoleSpy) {
      consoleSpy.mockRestore();
      }
  });
 
  test('should print "Hello World!" exactly once', () => {
    uppg1();
    expect(consoleSpy).toHaveBeenCalledWith('Hello World!');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
}); 