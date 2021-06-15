const imgbbUploader = require("imgbb-uploader");
const Joi = require("joi");
const User = require("../../models/User");

exports.UPDATE_user = async (req, res, next) => {
  try {
    const verified = res.locals.verified;

    const { bio, pic } = req.body;

    const schema = Joi.object({
      bio: Joi.string()
        .max(200)
        .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
        .allow(""),
      pic: Joi.string().allow(""),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    }
    // update user info
    let user_update = { bio: bio, pic: pic };
    if (!bio) user_update = { pic: pic };
    if (!pic) user_update = { bio: bio };
    await User.updateOne({ _id: verified.user }, user_update, (err) => {
      if (err) return res.status(401).send(err);
    });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// user info

exports.UPDATE_email = async (req, res, next) => {
  try {
    const user_id = res.locals.verified.user;
    const { email, user_name } = req.body;
    if (!email) {
      res.locals.user_name = user_name;
      return next();
    }

    const existing_email = await User.findOne({ email: email });
    if (existing_email)
      return res
        .status(409)
        .json({ error_message: "An account with this email already exists." });

    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate({ email: email });
    if (error)
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    const updated_email = { email: email };
    await User.findByIdAndUpdate(user_id, updated_email, (err) => {
      if (err) return res.status(500).send();
    });

    if (user_name) {
      res.locals.user_name = user_name;
    }
    next();
  } catch (err) {
    res.status(500).send();
  }
};

exports.UPDATE_user_name = async (req, res, next) => {
  try {
    const user_id = res.locals.verified.user;
    const user_name = res.locals.user_name;
    if (!user_name) {
      return next();
    }

    const existing_user_name = await User.findOne({ user_name: user_name });
    if (existing_user_name)
      return res.status(409).json({
        error_message: "An account with this user name already exists.",
      });

    const schema = Joi.object({
      user_name: Joi.string().alphanum().min(3).trim().required(),
    });

    const { error } = schema.validate({ user_name: user_name });
    if (error)
      return res.status(400).json({
        error_message: error.details[0].message,
      });
    const updated_user_name = { user_name: user_name };
    await User.findByIdAndUpdate(user_id, updated_user_name, (err) => {
      if (err) return res.status(401).send();
    });
    next();
  } catch (err) {
    res.status(500).send();
  }
};

exports.GET_user = async (req, res) => {
  try {
    const verified = res.locals.verified;
    // get user info
    const get_user_info = await User.findOne({ _id: verified.user });
    const { user_name, pic, email, bio, date } = get_user_info;
    // send user info to client
    const user_info = { id: verified.user, user_name, pic, email, bio, date };
    res.json({ user_info });
  } catch (err) {
    console.error(err);
    res.status(401).json({ server_message: "Unauthorized" });
  }
};

exports.UPLOAD_pic = async (req, res, next) => {
  try {
    console.log("upload...");

    const option = {
      apiKey: process.env.IMGBB_KEY,
      base64string: req.body.image,
    };
    const response = await imgbbUploader(option);

    return res.status(200).json({ pic: response.display_url });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
