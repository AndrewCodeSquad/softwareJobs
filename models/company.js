var mongoose = require('mongoose');

// Schema set-up using Mongoose
var companySchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model('Company', companySchema);