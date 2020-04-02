const mongoose = require("mongoose");

const ShellSchema = mongoose.Schema(
  {
    name: String,
    price: Number
  },
  { versionKey: false }
);

module.exports = mongoose.model("Shell", ShellSchema);
