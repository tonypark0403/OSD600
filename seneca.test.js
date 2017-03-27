// First require (e.g., load) our seneca.js module
var seneca = require('./seneca');

/**
 * Tests for seneca.isValidEmail()
 */
describe('seneca.isValidEmail()', function() {
  
  test('returns true for simple myseneca address', function() {
    var simpleEmail = 'someone@myseneca.ca';
    expect(seneca.isValidEmail(simpleEmail)).toBe(true);
  });

  test('returns true for professor address', function() {
    var simpleEmail = 'someone@senecacollege.ca';
    expect(seneca.isValidEmail(simpleEmail)).toBe(true);
  });

  test('returns true for old style address', function() {
    var simpleEmail = 'someone@senecac.on.ca';
    expect(seneca.isValidEmail(simpleEmail)).toBe(true);
  });

  test('returns false for a non-myseneca address', function() {
    var gmailAddress = 'someone@gmail.com';
    expect(seneca.isValidEmail(gmailAddress)).toBe(false);
  });

  test('returns false for a non-string type of variable', function() {
    var intData = 100;
    expect(seneca.isValidEmail(intData)).toBe(false);
  });

  test('returns false for null data', function() {
    var nullData = null;
    expect(seneca.isValidEmail(nullData)).toBe(false);
  });
  
  test('returns false for leading whitespace', function() {
    var whitespaceData = ' someone@myseneca.ca';
    expect(seneca.isValidEmail(whitespaceData)).toBe(false);
  });
});

/**
 * Tests for seneca.formatSenecaEmail()
 */
describe('seneca.formatSenecaEmail()', function() {

  test('adds @myseneca.ca to the end of name', function() {
    var name = "mshaw";
    expect(seneca.formatSenecaEmail(name)).toBe('mshaw@myseneca.ca');
  });

  // facebook.github.io/jest/docs/expect.html#tothrowerror
  test('adds @myseneca.ca to the end of name when no whitespace', function() {
    expect(() => {
        seneca.formatSenecaEmail(" mshaw");
    }).toThrow();
  });

  test('null is not acceptable', function() {
    expect(() => {
        seneca.formatSenecaEmail(null);
    }).toThrow();
  });
});
