// require Mongoose
var mongoose = require('mongoose');

// Schema set-up using Mongoose
var companySchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{
    //  comments property is an array of Mongo database IDs  
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model('Company', companySchema);