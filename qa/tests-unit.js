var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortune cookie tests', function(){
  test('getFortune() should return a fortune object', function(){
    expect(typeof fortune.getFortune() === 'object');
  });
  test('fortune object should include an author and quote string', function(){
    expect(typeof fortune.getFortune().author === 'string');
    expect(typeof fortune.getFortune().quote === 'string');
  });
});
