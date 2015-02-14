var fortune = require('../lib/fortune.js');
var languages = require('../lib/languages.js');
var expect = require('chai').expect;

suite('Fortune cookie tests: \t', function(){
  test('getFortune() should return a fortune object', function(){
    expect(typeof fortune.getFortune() === 'object');
  });
  test('fortune object should include an author and quote string', function(){
    expect(typeof fortune.getFortune().author === 'string');
    expect(typeof fortune.getFortune().quote === 'string');
  });
});

suite('Languages tests: \t\t', function(){
  test('languages should export as a list', function(){
    expect(typeof languages === Array);
  });
});
