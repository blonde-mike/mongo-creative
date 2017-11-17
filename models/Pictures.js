var mongoose = require("mongoose");
var PictureSchema = new mongoose.Schema({
  title: String,
  tag: String,
  url: String
});

// CommentSchema.methods.upvote = function(cb) {
//   this.upvotes += 1;
//   this.save(cb);
// };

mongoose.model("Picture", PictureSchema);
