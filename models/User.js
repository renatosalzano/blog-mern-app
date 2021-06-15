const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    min: 3,
    required: true,
  },
  pic: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    min: 8,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("user", userSchema);
