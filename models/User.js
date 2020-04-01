const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: String,
    bells: Number,
    fruit: { type: String, default: undefined }
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
