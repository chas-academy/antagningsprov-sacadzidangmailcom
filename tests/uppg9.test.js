const { uppg9 } = require('../uppg9.js');
const fs = require('fs');
const path = require('path');

describe('uppg9', () => {
  let consoleSpy;
  let uppg9Source;

  beforeEach(() => {
    // Read the source file as a string to later check for the if-statement
    uppg9Source = fs.readFileSync(path.join(__dirname, '../uppg9.js'), 'utf8');
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('logs messages indicating if each number is even or odd', () => {
    uppg9();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mock.calls.forEach(call => {
      const loggedValue = call[0];
      // Destructure both arguments: the number and its label
      expect(typeof loggedValue).toBe('string');
      expect(loggedValue.toLowerCase()).toMatch(/(\d+)\s+är\s+(jämn|udda)/);
    });
  });

  test('source code contains an if-statement to check for even numbers', () => {
    expect(uppg9Source).toMatch(/if\s*\(\s*.*%\s*2\s*===\s*0\s*\)/);
  });

  test('source code contains an else clause', () => {
    expect(uppg9Source).toMatch(/else\s*{/);
  });
});
