const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  bells: Number
});

module.exports = mongoose.model("User", UserSchema);
