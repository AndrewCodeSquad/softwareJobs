// require Mongoose
var mongoose = require('mongoose');

// set up database structure for comments
var commentSchema = mongoose.Schema({
  text: String,
  author: String
});

// Export the comment model to app.js
module.exports = mongoose.model('Comment', commentSchema);