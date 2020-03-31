const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  bells: Number,
  time: String
});

module.exports = mongoose.model("User", UserSchema);
