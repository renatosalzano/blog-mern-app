const Joi = require("joi");
const User = require("../../models/User");

exports.GET_user = async (req, res) => {
  try {
    const get_user_info = await User.findOne({
      user_name: req.params.user_name,
    });
    if (!get_user_info) return res.status(404).send();
    const { user_name, pic, email, bio, date } = get_user_info;
    // send user info to client
    const user = { user_name, pic, email, bio, date };
    res.status(200).json({ user });
  } catch (err) {
    return res.status(500);
  }
};
