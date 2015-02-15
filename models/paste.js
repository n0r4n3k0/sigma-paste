var mongoose = require('mongoose');

var pasteSchema = mongoose.Schema({
  author: String,
  title: String,
  paste: Buffer,
  language: String
});
var Paste = mongoose.model('Paste', pasteSchema);
module.exports = Paste;
