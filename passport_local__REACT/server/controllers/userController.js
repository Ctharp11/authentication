const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.getThings = (req, res) => {
  res.json({ message: 'Hello, World!' });
};

exports.login = (req, res) => {
  console.log(req.body)
  // const user = User.
}
