const { uppg9 } = require('../uppg9.js');
const fs = require('fs');
const path = require('path');

describe('uppg9', () => {
  let consoleSpy;
  let uppg9Source;

  beforeEach(() => {
    // Read the source file as a string to later check for the if-statement
    uppg9Source = fs.readFileSync(path.join(__dirname, '../uppg9.js'), 'utf8');
  });
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('logs messages indicating if each number is even or odd', () => {
    uppg9();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mock.calls.forEach(call => {
      const [num, msg] = call;
      // Destructure both arguments: the number and its label
      expect(typeof num).toBe('number');
      expect(typeof msg).toBe('string');
      expect(msg.toLowerCase()).toMatch(/(jämn|udda)/);
    });
  });

  test('source code contains an if-statement to check for even numbers', () => {
    // Check that there is an if-statement checking "arr[i] % 2 === 0"
    expect(uppg9Source).toMatch(/if\s*\(.*%.*2\s*===\s*0\)/);
  });

  test('source code contains an else clause', () => {
    // Check that there is an else clause present in the code
    const code = fs.readFileSync(path.join(__dirname, '../uppg9.js'), 'utf8');
    expect(uppg9Source).toMatch(/else\s*{/);
  });
});
